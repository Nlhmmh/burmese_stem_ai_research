import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { connectMongoDB } from '@/data/mongodb';
import { SessionModel, ProfileModel } from '@/data/schema';
import { createSession, findSession, appendFollowUp, recordSessionResponse, type NewSession } from '@/data/dao/session.dao';
import { getOrCreateProfile, updatePreferences } from '@/data/dao/profile.dao';
import { createLearningSession } from '@/services/session.service';
import { respondToLearningSession } from '@/services/adaptation.service';
import { askSessionFollowUp } from '@/services/followup.service';
import { completeLearningSession, getLearningSession } from '@/services/session-lifecycle.service';
import { makeSessionRecord } from '@/tests/fixtures/session';
const evidenceDirectory = process.env.TEST_EVIDENCE_DIRECTORY;
const json = (value: unknown) => JSON.parse(JSON.stringify(value));
const exportState = async (caseId: string) => {
  if (!evidenceDirectory) return;
  fs.mkdirSync(evidenceDirectory, { recursive: true });
  fs.appendFileSync(path.join(evidenceDirectory, 'database-observations.jsonl'), JSON.stringify({ caseId, capturedAt: new Date().toISOString(), sessions: await SessionModel.find({}).lean(), profiles: await ProfileModel.find({}).lean() }) + String.fromCharCode(10));
};
const newSession = (owner: string): NewSession => { const base = makeSessionRecord(); return { sessionId: randomUUID(), learnerId: owner, originalQuestion: base.originalQuestion, concept: base.concept, explanations: base.explanations, reflectivePrompt: base.reflectivePrompt, hint: base.hint, preferencesSnapshot: base.preferencesSnapshot }; };
const providerOutput = (output: unknown) => ({ ok: true, json: async () => ({ output: [{ content: [{ type: 'output_text', text: JSON.stringify(output) }] }] }) });
const fetchMock = vi.fn();

describe('WB02/WB03/WB05/WB06 real MongoDB additional invariants', () => {
  beforeAll(async () => { await connectMongoDB(); await Promise.all([SessionModel.syncIndexes(), ProfileModel.syncIndexes()]); });
  beforeEach(async () => { await Promise.all([SessionModel.deleteMany({}), ProfileModel.deleteMany({})]); vi.stubGlobal('fetch', fetchMock); vi.stubEnv('OPENAI_API_KEY', 'test-key'); vi.spyOn(console, 'log').mockImplementation(() => {}); });

  it('WB06 preserves existing snapshots after profile update and uses new preferences for new generation', async () => {
    const owner = 'whitebox-preferences'; const profile = await getOrCreateProfile(owner);
    const generated = { outcome: 'ready', message: '', ...newSession(owner) };
    const output = { outcome: generated.outcome, message: generated.message, concept: generated.concept, explanations: generated.explanations, reflectivePrompt: generated.reflectivePrompt, hint: generated.hint };
    fetchMock.mockResolvedValue(providerOutput(output));
    const oldSession = await createLearningSession(owner, 'Explain gradient descent.', json(profile.preferences));
    const originalSnapshot = json((await findSession(owner, oldSession.sessionId))?.preferencesSnapshot);
    const updated = await updatePreferences(owner, { supportLanguage: 'english', explanationLevel: 'advanced' });
    expect(updated?.preferences.learningStyle).toBe('guided');
    const fresh = await createLearningSession(owner, 'Explain gradient descent.', updated!.preferences);
    expect(json((await findSession(owner, oldSession.sessionId))?.preferencesSnapshot)).toEqual(originalSnapshot);
    expect((await findSession(owner, fresh.sessionId))?.preferencesSnapshot).toMatchObject({ supportLanguage: 'english', explanationLevel: 'advanced', learningStyle: 'guided' });
    expect(JSON.parse(JSON.parse(fetchMock.mock.calls[1][1].body).input).preferences).toMatchObject({ supportLanguage: 'english', explanationLevel: 'advanced' });
    fetchMock.mockResolvedValue(providerOutput({ content: { en: 'A revised bilingual explanation.', my: 'ပြန်လည် ရှင်းပြထားသော အကြောင်းအရာ။' } }));
    await respondToLearningSession(owner, fresh.sessionId, 'medium', 'language_terms');
    const saved = await findSession(owner, fresh.sessionId);
    expect(saved?.adaptations[0].presentationOverride).toBe('bilingual');
    expect(saved?.preferencesSnapshot.supportLanguage).toBe('english');
    expect((await getOrCreateProfile(owner)).preferences.supportLanguage).toBe('english');
    expect(fetchMock).toHaveBeenCalledTimes(3); await exportState('WB06-snapshot-and-language-override');
  });

  it('WB05 atomically persists corrected concept, adaptation and event then reconstructs exact projection', async () => {
    const base = await createSession(newSession('whitebox-correction'));
    const corrected = { name: 'Ocean current', domain: 'Oceanography' };
    const content = { en: 'Ocean water moves in a directed flow.', my: 'သမုဒ္ဒရာရေသည် ဦးတည်ရာတစ်ခုအတိုင်း စီးဆင်းသည်။' };
    fetchMock.mockResolvedValue(providerOutput({ outcome: 'corrected', message: { en: '', my: '' }, concept: corrected, content }));
    await respondToLearningSession(base.learnerId, base.sessionId, 'needs_support', 'concept_mismatch', 'I meant an ocean current.');
    const saved = await findSession(base.learnerId, base.sessionId);
    expect(saved).toMatchObject({ concept: corrected, adaptationRound: 1 });
    expect(saved?.responseEvents).toHaveLength(1); expect(saved?.adaptations).toHaveLength(1);
    expect(saved?.adaptations[0]).toMatchObject({ supportType: 'concept_correction', content, conceptCorrection: { previous: base.concept, corrected } });
    expect(saved?.responseEvents?.[0].conceptReinterpretation).toMatchObject({ previous: base.concept, current: corrected, clarification: 'I meant an ocean current.', outcome: 'corrected' });
    const projection = await getLearningSession(base.learnerId, base.sessionId);
    for (const key of ['concept', 'adaptations', 'responseEvents', 'followUps', 'preferencesSnapshot', 'adaptationRound'] as const) expect(json(projection[key])).toEqual(json(saved?.[key]));
    expect(await findSession('foreign-owner', base.sessionId)).toBeNull(); await exportState('WB05-corrected-projection');
  });

  it('WB03 successful scoped follow-up changes no Stage 7 fields', async () => {
    const base = await createSession(newSession('whitebox-followup'));
    fetchMock.mockResolvedValueOnce(providerOutput({ content: { en: 'A new scaffold.', my: 'အသစ်သော အထောက်အကူ။' } }));
    await respondToLearningSession(base.learnerId, base.sessionId, 'medium', 'another_example');
    const before = await findSession(base.learnerId, base.sessionId);
    fetchMock.mockResolvedValue(providerOutput({ relatedToCurrentConcept: true, message: '', answer: { en: 'The slope determines the update.', my: 'လျှောစောက်က ပြောင်းလဲမှုကို သတ်မှတ်သည်။' } }));
    await askSessionFollowUp(base.learnerId, base.sessionId, 'Why does the slope matter?');
    const after = await findSession(base.learnerId, base.sessionId);
    for (const key of ['concept', 'understanding', 'status', 'adaptationRound', 'adaptations', 'responseEvents', 'preferencesSnapshot'] as const) expect(json(after?.[key])).toEqual(json(before?.[key]));
    expect(after?.followUps).toHaveLength(1); expect(fetchMock).toHaveBeenCalledTimes(2);
    const input = JSON.parse(JSON.parse(fetchMock.mock.calls[1][1].body).input);
    expect(input.previousFollowUps).toEqual([]); expect(input.latestResponseRoute).toBe('stage_5_scaffold'); expect(input.latestRelevantScaffold).toEqual(json(before?.adaptations.at(-1)));
    await exportState('WB03-followup-state-invariance');
  });

  it('WB05 serialises two round-1 responses to one round-2 winner without round 3', async () => {
    const base = await createSession(newSession('whitebox-near-cap'));
    const content = { en: 'First support', my: 'ပထမ အကူအညီ' };
    await recordSessionResponse({ learnerId: base.learnerId, sessionId: base.sessionId, expectedRound: 0, expectedResponseEventCount: 0, understanding: 'medium', status: 'in_progress', adaptation: { learnerResponse: 'medium', supportType: 'another_example', content, round: 1, createdAt: new Date() }, responseEvent: { overallSupportNeed: 'medium', difficultyType: null, route: 'stage_5_scaffold', roundBefore: 0, roundAfter: 1, createdAt: new Date() } });
    const input = { learnerId: base.learnerId, sessionId: base.sessionId, expectedRound: 1, expectedResponseEventCount: 1, understanding: 'needs_support' as const, status: 'review_recommended' as const, adaptation: { learnerResponse: 'needs_support' as const, supportType: 'simpler_explanation' as const, content: { en: 'Second support', my: 'ဒုတိယ အကူအညီ' }, round: 2, createdAt: new Date() }, responseEvent: { overallSupportNeed: 'needs_support' as const, difficultyType: null, route: 'stage_5_scaffold' as const, roundBefore: 1, roundAfter: 2, createdAt: new Date() } };
    const results = await Promise.all([recordSessionResponse(input), recordSessionResponse(input)]);
    expect(results.filter(Boolean)).toHaveLength(1); expect(results.filter(value => value === null)).toHaveLength(1);
    const saved = await findSession(base.learnerId, base.sessionId);
    expect(saved?.adaptationRound).toBe(2); expect(saved?.adaptations).toHaveLength(2); expect(saved?.responseEvents).toHaveLength(2);
    await exportState('WB05-round1-concurrency');
  });

  it('WB05 serialises two contenders for the last follow-up slot and excludes foreign writes', async () => {
    const base = await createSession(newSession('whitebox-followup-race'));
    const follow = { question: 'Why?', answer: { en: 'Answer', my: 'အဖြေ' }, createdAt: new Date() };
    await appendFollowUp(base.learnerId, base.sessionId, follow);
    expect(await appendFollowUp('foreign', base.sessionId, follow)).toBeNull();
    const results = await Promise.all([appendFollowUp(base.learnerId, base.sessionId, follow), appendFollowUp(base.learnerId, base.sessionId, follow)]);
    expect(results.filter(Boolean)).toHaveLength(1); expect((await findSession(base.learnerId, base.sessionId))?.followUps).toHaveLength(2);
    expect(fetchMock).not.toHaveBeenCalled(); await exportState('WB05-followup-concurrency');
  });

  it.each(['in_progress', 'review_recommended'] as const)('WB02 persists completion from %s and rejects subsequent response writes', async status => {
    const base = await createSession(newSession('whitebox-complete'));
    await SessionModel.updateOne({ sessionId: base.sessionId }, { $set: { status } });
    await expect(completeLearningSession('foreign', base.sessionId)).rejects.toThrow('not found');
    const completed = await completeLearningSession(base.learnerId, base.sessionId);
    expect(completed.status).toBe('completed');
    const repeated = await completeLearningSession(base.learnerId, base.sessionId); expect(json(repeated.updatedAt)).toEqual(json(completed.updatedAt));
    await expect(respondToLearningSession(base.learnerId, base.sessionId, 'high')).rejects.toThrow('Completed sessions');
    expect(fetchMock).not.toHaveBeenCalled(); expect((await findSession(base.learnerId, base.sessionId))?.responseEvents).toHaveLength(0);
    await exportState('WB02-completion-' + status);
  });
});
