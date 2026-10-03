import { beforeEach, describe, expect, it, vi } from 'vitest';
import { makeSessionRecord } from '@/tests/fixtures/session';
import type { DifficultyType, OverallSupportNeed } from '@/lib/session-domain';
const dao = vi.hoisted(() => ({ findSession: vi.fn(), recordSessionResponse: vi.fn() }));
vi.mock('@/data/dao/session.dao', () => dao);
import { respondToLearningSession, SessionResponseConflictError, ResponseValidationError } from '@/services/adaptation.service';

const choices: (DifficultyType | null)[] = [null, 'simpler_explanation', 'another_example', 'language_terms', 'concept_unclear', 'concept_mismatch'];
const matrix = ([0, 1, 2] as const).flatMap(round => [
  { need: 'high' as OverallSupportNeed, difficulty: null, round },
  ...(['medium', 'needs_support'] as const).flatMap(need => choices.map(difficulty => ({ need, difficulty, round })))
]);
const corrected = { name: 'Ocean current', domain: 'Oceanography' };
const content = { en: 'A different bounded scaffold.', my: 'ကွဲပြားသော အထောက်အကူ။' };
describe('WB01 complete 39 route/round combinations', () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    vi.stubEnv('OPENAI_API_KEY', 'test-key'); vi.stubGlobal('fetch', fetchMock);
    dao.recordSessionResponse.mockImplementation(async input => ({
      ...makeSessionRecord(), understanding: input.understanding, status: input.status,
      concept: input.activeConcept ?? makeSessionRecord().concept,
      adaptationRound: input.responseEvent.roundAfter
    }));
  });
  it.each(matrix)('$need / $difficulty / round $round', async ({ need, difficulty, round }) => {
    const previousEvent = { overallSupportNeed: 'high' as const, difficultyType: null, route: 'fade' as const, roundBefore: round, roundAfter: round, createdAt: new Date() };
    const session = makeSessionRecord({ adaptationRound: round, responseEvents: [previousEvent] });
    dao.findSession.mockResolvedValue(session);
    const output = difficulty === 'concept_mismatch'
      ? { outcome: 'corrected', message: { en: '', my: '' }, concept: corrected, content }
      : { content };
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ output: [{ content: [{ type: 'output_text', text: JSON.stringify(output) }] }] }) });
    const route = need === 'high' ? 'fade' : difficulty === 'language_terms' ? 'language_support' : difficulty === 'concept_unclear' ? 'concept_clarification' : difficulty === 'concept_mismatch' ? 'context_reinterpretation' : 'stage_5_scaffold';
    const support = route === 'language_support' ? 'clarification' : route === 'concept_clarification' ? 'concept_clarification' : route === 'context_reinterpretation' ? 'concept_correction' : difficulty ?? (need === 'medium' ? 'another_example' : 'simpler_explanation');
    const generate = need !== 'high' && round < 2;
    const next = generate ? round + 1 : round;
    const status = need !== 'high' && next === 2 ? 'review_recommended' : 'in_progress';
    const result = await respondToLearningSession(session.learnerId, session.sessionId, need, difficulty, difficulty === 'concept_mismatch' ? 'I meant an ocean current.' : null);
    expect(dao.findSession).toHaveBeenCalledExactlyOnceWith(session.learnerId, session.sessionId);
    expect(fetchMock).toHaveBeenCalledTimes(generate ? 1 : 0);
    expect(dao.recordSessionResponse).toHaveBeenCalledOnce();
    expect(result).toMatchObject({ route, adaptationRound: next, status, responseEvent: { overallSupportNeed: need, difficultyType: difficulty, route, roundBefore: round, roundAfter: next } });
    const save = dao.recordSessionResponse.mock.calls[0][0];
    expect(save).toMatchObject({ learnerId: session.learnerId, sessionId: session.sessionId, expectedRound: round, expectedResponseEventCount: 1, understanding: need, status, responseEvent: result.responseEvent });
    if (generate) {
      expect(save.adaptation).toMatchObject({ learnerResponse: need, supportType: support, round: next, content });
      const body = JSON.parse(String(fetchMock.mock.calls[0][1].body));
      const input = JSON.parse(body.input);
      expect(body.store).toBe(false); expect(body.text.format.strict).toBe(true);
      expect(input.adaptationRoute).toBe(route);
      expect(input.preferences).toEqual(session.preferencesSnapshot);
      expect(input.supportType).toBe(support);
      if (route === 'language_support') expect(save.adaptation.presentationOverride).toBe('bilingual');
      if (route === 'context_reinterpretation') {
        expect(save.activeConcept).toEqual(corrected);
        expect(result.responseEvent.conceptReinterpretation).toMatchObject({ outcome: 'corrected', previous: session.concept, current: corrected });
      }
    } else {
      expect(save.adaptation).toBeNull(); expect(save).not.toHaveProperty('activeConcept');
      if (route === 'context_reinterpretation') expect(result.correctionOutcome).toBe('limit_reached');
    }
    expect(session.adaptationRound).toBe(round); expect(session.responseEvents).toHaveLength(1);
  });
  it.each([-1, 0.5, 3, NaN, Infinity])('rejects invalid stored round %s without provider/save', async round => {
    dao.findSession.mockResolvedValue(makeSessionRecord({ adaptationRound: round }));
    await expect(respondToLearningSession('owner', makeSessionRecord().sessionId, 'medium')).rejects.toBeInstanceOf(SessionResponseConflictError);
    expect(fetchMock).not.toHaveBeenCalled(); expect(dao.recordSessionResponse).not.toHaveBeenCalled();
  });
  it('WB02 rejects completed response before provider/save', async () => {
    dao.findSession.mockResolvedValue(makeSessionRecord({ status: 'completed' }));
    await expect(respondToLearningSession('owner', makeSessionRecord().sessionId, 'medium')).rejects.toBeInstanceOf(SessionResponseConflictError);
    expect(fetchMock).not.toHaveBeenCalled(); expect(dao.recordSessionResponse).not.toHaveBeenCalled();
  });
  it('rejects direct mismatch call without clarification', async () => {
    dao.findSession.mockResolvedValue(makeSessionRecord());
    await expect(respondToLearningSession('owner', makeSessionRecord().sessionId, 'medium', 'concept_mismatch')).rejects.toBeInstanceOf(ResponseValidationError);
    expect(fetchMock).not.toHaveBeenCalled(); expect(dao.recordSessionResponse).not.toHaveBeenCalled();
  });
  it('maps an optimistic generated-response save loser to conflict', async () => {
    dao.findSession.mockResolvedValue(makeSessionRecord()); dao.recordSessionResponse.mockResolvedValue(null);
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ output: [{ content: [{ type: 'output_text', text: JSON.stringify({ content }) }] }] }) });
    await expect(respondToLearningSession('owner', makeSessionRecord().sessionId, 'medium')).rejects.toBeInstanceOf(SessionResponseConflictError);
    expect(fetchMock).toHaveBeenCalledOnce(); expect(dao.recordSessionResponse).toHaveBeenCalledOnce();
  });
});
