import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { makeSessionRecord } from '@/tests/fixtures/session';
const dao = vi.hoisted(() => ({ findSession: vi.fn(), recordSessionResponse: vi.fn(), createSession: vi.fn(), appendFollowUp: vi.fn(), completeSession: vi.fn() }));
vi.mock('@/data/dao/session.dao', () => dao);
import { respondToLearningSession, validateLearnerResponseRequest, AdaptationGenerationError } from '@/services/adaptation.service';
import { createLearningSession, validateCreateSessionRequest, SessionGenerationError } from '@/services/session.service';
import { askSessionFollowUp, validateFollowUpRequest, FollowUpGenerationError } from '@/services/followup.service';
import { completeLearningSession, validateSessionId, validateSessionUpdate } from '@/services/session-lifecycle.service';
import { validatePreferences } from '@/services/profile.service';
import { requestStructuredOutput, LLM_TIMEOUT_MS } from '@/services/llm-provider';

const fetchMock = vi.fn();
const session = () => makeSessionRecord();
const ready = () => ({ outcome: 'ready', message: '', concept: session().concept, explanations: session().explanations, reflectivePrompt: session().reflectivePrompt, hint: session().hint });
const response = (text: string) => ({ ok: true, json: async () => ({ output: [{ content: [{ type: 'output_text', text }] }] }) });
beforeEach(() => { vi.stubGlobal('fetch', fetchMock); vi.stubEnv('OPENAI_API_KEY', 'test-key'); dao.findSession.mockResolvedValue(session()); vi.spyOn(console, 'log').mockImplementation(() => {}); });
afterEach(() => vi.useRealTimers());

const operations = [
  { name: 'initial', call: () => createLearningSession('owner', 'Explain current.', session().preferencesSnapshot), error: SessionGenerationError },
  { name: 'standard adaptation', call: () => respondToLearningSession('owner', session().sessionId, 'medium'), error: AdaptationGenerationError },
  { name: 'reinterpretation', call: () => respondToLearningSession('owner', session().sessionId, 'medium', 'concept_mismatch', 'I meant an ocean current.'), error: AdaptationGenerationError },
  { name: 'follow-up', call: () => askSessionFollowUp('owner', session().sessionId, 'Why?'), error: FollowUpGenerationError }
];
const faults = ['missing key', 'non-2xx', 'network', 'invalid envelope', 'missing output', 'invalid JSON', 'timer timeout', 'provider abort'] as const;
describe('WB01/WB03/WB04 provider failure propagation', () => {
  it.each(operations.flatMap(op => faults.map(fault => ({ ...op, fault }))))('$name / $fault -> domain error, no save/retry', async ({ call, error, fault }) => {
    if (fault === 'missing key') vi.stubEnv('OPENAI_API_KEY', '');
    if (fault === 'non-2xx') fetchMock.mockResolvedValue({ ok: false, status: 503 });
    if (fault === 'network') fetchMock.mockRejectedValue(new Error('secret socket detail'));
    if (fault === 'invalid envelope') fetchMock.mockResolvedValue({ ok: true, json: async () => { throw new SyntaxError('secret provider envelope'); } });
    if (fault === 'missing output') fetchMock.mockResolvedValue({ ok: true, json: async () => ({ output: [] }) });
    if (fault === 'invalid JSON') fetchMock.mockResolvedValue(response('not-json'));
    if (fault === 'provider abort') fetchMock.mockRejectedValue(Object.assign(new Error('secret abort detail'), { name: 'AbortError' }));
    if (fault === 'timer timeout') {
      vi.useFakeTimers();
      fetchMock.mockImplementation((_url: string, init: RequestInit) => new Promise((_resolve, reject) => init.signal?.addEventListener('abort', () => reject(Object.assign(new Error('secret timer detail'), { name: 'AbortError' })))));
    }
    const pending = call();
    const assertion = expect(pending).rejects.toBeInstanceOf(error);
    if (fault === 'timer timeout') await vi.advanceTimersByTimeAsync(LLM_TIMEOUT_MS);
    await assertion;
    await expect(pending).rejects.not.toThrow('secret');
    expect(fetchMock).toHaveBeenCalledTimes(fault === 'missing key' ? 0 : 1);
    expect(dao.createSession).not.toHaveBeenCalled(); expect(dao.recordSessionResponse).not.toHaveBeenCalled(); expect(dao.appendFollowUp).not.toHaveBeenCalled();
  });
});

describe('WB02/WB03/WB06 missing validation boundaries', () => {
  it.each([null, [], 'text', {}, { question: 123 }, { question: '   ' }])('rejects malformed initial/follow-up request %j', input => {
    expect(() => validateCreateSessionRequest(input)).toThrow(); expect(() => validateFollowUpRequest(input)).toThrow(); expect(fetchMock).not.toHaveBeenCalled();
  });
  it('accepts exact 1000/500/200-character boundaries', () => {
    expect(validateCreateSessionRequest({ question: 'x'.repeat(1000) })).toHaveLength(1000);
    expect(validateFollowUpRequest({ question: 'x'.repeat(500) })).toHaveLength(500);
    expect(validateLearnerResponseRequest({ overallSupportNeed: 'medium', difficultyType: 'concept_mismatch', conceptClarification: 'x'.repeat(200) }).conceptClarification).toHaveLength(200);
  });
  it.each([null, [], 'text', {}, { overallSupportNeed: 42 }, { overallSupportNeed: 'medium', difficultyType: 42 }, { overallSupportNeed: 'medium', difficultyType: 'concept_mismatch', conceptClarification: 42 }])('rejects malformed response request %j', input => {
    expect(() => validateLearnerResponseRequest(input)).toThrow(); expect(dao.recordSessionResponse).not.toHaveBeenCalled();
  });
  it.each([null, [], 'text', {}, { theme: 42 }, { theme: 'blue' }, { extra: 'key' }])('rejects invalid preference request %j', input => expect(() => validatePreferences(input)).toThrow());
  it('accepts UUID-v4 but rejects non-v4, malformed and non-string identifiers', () => {
    expect(validateSessionId(session().sessionId)).toBe(session().sessionId);
    for (const input of [null, 123, 'invalid', '2fba6e7a-1225-1d1f-971f-5ae58704e3d5']) expect(() => validateSessionId(input)).toThrow();
  });
  it.each([null, [], {}, { status: 'in_progress' }, { status: 'completed', extra: true }])('rejects unsupported completion payload %j', input => expect(() => validateSessionUpdate(input)).toThrow());
  it.each(['in_progress', 'review_recommended'] as const)('completes legal %s state with scoped write', async status => {
    dao.findSession.mockResolvedValue(sessionWith(status)); dao.completeSession.mockResolvedValue(sessionWith('completed'));
    expect(validateSessionUpdate({ status: 'completed' })).toBe('completed');
    const result = await completeLearningSession('owner', session().sessionId);
    expect(result.status).toBe('completed'); expect(dao.completeSession).toHaveBeenCalledExactlyOnceWith('owner', session().sessionId);
  });
});
function sessionWith(status: 'in_progress' | 'review_recommended' | 'completed') { return makeSessionRecord({ status }); }

describe('WB04 malformed generated structures', () => {
  const invalidInitial = [
    { label: 'missing hint', value: () => { const output = ready(); Reflect.deleteProperty(output, 'hint'); return output; } },
    { label: 'wrong outcome type', value: () => ({ ...ready(), outcome: 12 }) },
    { label: 'wrong concept type', value: () => ({ ...ready(), concept: { name: 12, domain: 'Physics' } }) },
    { label: 'blank required Burmese', value: () => ({ ...ready(), hint: { en: 'Hint', my: ' ' } }) },
    { label: 'array instead of object', value: () => [] },
    { label: 'missing explanation', value: () => ({ ...ready(), explanations: { simple: session().explanations.simple } }) }
  ];
  it.each(invalidInitial)('rejects initial $label without save', async ({ value }) => {
    fetchMock.mockResolvedValue(response(JSON.stringify(value())));
    await expect(operations[0].call()).rejects.toBeInstanceOf(SessionGenerationError); expect(dao.createSession).not.toHaveBeenCalled();
  });
  const invalidFollowUp = [null, [], {}, { relatedToCurrentConcept: 'yes', message: '', answer: { en: 'Answer', my: 'အဖြေ' } }, { relatedToCurrentConcept: true, message: '', answer: { en: 42, my: 'အဖြေ' } }, { relatedToCurrentConcept: true, message: '', answer: { en: ' ', my: 'အဖြေ' } }, { relatedToCurrentConcept: true, message: 'not empty', answer: { en: 'Answer', my: 'အဖြေ' } }, { relatedToCurrentConcept: false, message: '', answer: { en: '', my: '' } }, { relatedToCurrentConcept: false, message: 'Unrelated', answer: { en: 'Answer', my: '' } }, { relatedToCurrentConcept: true, message: '', answer: { en: 'Answer', my: 'အဖြေ' }, route: 'fade' }];
  it.each(invalidFollowUp)('rejects follow-up structure %j without save', async value => {
    fetchMock.mockResolvedValue(response(JSON.stringify(value)));
    await expect(operations[3].call()).rejects.toBeInstanceOf(FollowUpGenerationError); expect(dao.appendFollowUp).not.toHaveBeenCalled();
  });
  const previous = () => session().concept;
  const correction = () => ({ outcome: 'corrected', message: { en: '', my: '' }, concept: { name: 'Ocean current', domain: 'Oceanography' }, content: { en: 'New support', my: 'အသစ်သော အကူအညီ' } });
  const invalidCorrection = [
    { label: 'unknown outcome', value: () => ({ ...correction(), outcome: 'unchanged' }) },
    { label: 'invalid concept shape', value: () => ({ ...correction(), concept: { name: 'New' } }) },
    { label: 'blank concept', value: () => ({ ...correction(), concept: { name: ' ', domain: 'Physics' } }) },
    { label: 'corrected with message', value: () => ({ ...correction(), message: { en: 'Extra', my: 'ပိုသောစာ' } }) },
    { label: 'corrected with empty content', value: () => ({ ...correction(), content: { en: '', my: '' } }) },
    { label: 'ambiguous changes concept', value: () => ({ ...correction(), outcome: 'ambiguous', message: { en: 'Clarify', my: 'ရှင်းပြပါ' }, content: { en: '', my: '' } }) },
    { label: 'ambiguous includes support', value: () => ({ ...correction(), outcome: 'ambiguous', concept: previous(), message: { en: 'Clarify', my: 'ရှင်းပြပါ' } }) },
    { label: 'ambiguous blank clarification', value: () => ({ ...correction(), outcome: 'ambiguous', concept: previous(), content: { en: '', my: '' } }) },
    { label: 'repeated corrected content', value: () => ({ ...correction(), content: session().explanations.simple }) }
  ];
  it.each(invalidCorrection)('rejects reinterpretation $label without save', async ({ value }) => {
    fetchMock.mockResolvedValue(response(JSON.stringify(value())));
    await expect(operations[2].call()).rejects.toBeInstanceOf(AdaptationGenerationError); expect(dao.recordSessionResponse).not.toHaveBeenCalled();
  });
  it.each([null, [], {}, { content: { en: 42, my: 'အကူအညီ' } }, { content: { en: ' ', my: 'အကူအညီ' } }, { content: { en: 'New', my: ' ' } }])('rejects standard adaptation structure %j without save', async value => {
    fetchMock.mockResolvedValue(response(JSON.stringify(value)));
    await expect(operations[1].call()).rejects.toBeInstanceOf(AdaptationGenerationError); expect(dao.recordSessionResponse).not.toHaveBeenCalled();
  });
});

describe('WB04 provider output extraction paths', () => {
  it('uses configured model and skips non-text malformed blocks', async () => {
    vi.stubEnv('OPENAI_MODEL', 'explicit-test-model');
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ output: [null, {}, { content: [null, { type: 'other' }, { type: 'output_text', text: '' }, { type: 'output_text', text: '{"ok":true}' }, { type: 'output_text', text: 'not-json' }] }] }) });
    const result = await requestStructuredOutput({ instructions: 'Bounded', input: {}, schemaName: 'test', schema: {} });
    expect(result).toEqual({ ok: true }); expect(fetchMock).toHaveBeenCalledOnce(); expect(JSON.parse(fetchMock.mock.calls[0][1].body).model).toBe('explicit-test-model');
  });
  it.each([null, [], {}, { output: 1 }, { output: [null, { content: 'bad' }] }])('rejects missing text envelope %j', async output => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => output });
    await expect(requestStructuredOutput({ instructions: 'Bounded', input: {}, schemaName: 'test', schema: {} })).rejects.toMatchObject({ code: 'MISSING_OUTPUT' });
  });
});

describe('WB03 legacy and previous follow-up provider context', () => {
  it('accepts legacy missing history collections and sends previous follow-ups for modern sessions', async () => {
    const legacy = session();
    for (const field of ['followUps', 'responseEvents', 'preferencesSnapshot']) Reflect.deleteProperty(legacy, field);
    dao.findSession.mockResolvedValueOnce(legacy); dao.appendFollowUp.mockResolvedValue(legacy);
    fetchMock.mockResolvedValue(response(JSON.stringify({ relatedToCurrentConcept: true, message: '', answer: { en: 'Answer', my: 'အဖြေ' } })));
    await askSessionFollowUp('owner', legacy.sessionId, 'Why?');
    const legacyInput = JSON.parse(JSON.parse(fetchMock.mock.calls[0][1].body).input);
    expect(legacyInput.previousFollowUps).toEqual([]); expect(legacyInput.latestResponseRoute).toBeNull(); expect(legacyInput).not.toHaveProperty('preferences');
    const previous = { question: 'Earlier?', answer: { en: 'Earlier answer', my: 'ယခင် အဖြေ' }, createdAt: new Date('2026-10-01T00:00:00Z') };
    const modern = makeSessionRecord({ followUps: [previous] }); dao.findSession.mockResolvedValueOnce(modern);
    await askSessionFollowUp('owner', modern.sessionId, 'What next?');
    const modernInput = JSON.parse(JSON.parse(fetchMock.mock.calls[1][1].body).input);
    expect(modernInput.previousFollowUps).toEqual([{ ...previous, createdAt: previous.createdAt.toISOString() }]); expect(modernInput.preferences).toEqual(modern.preferencesSnapshot);
  });
});
