import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
const profiles = vi.hoisted(() => ({ getOrCreateProfile: vi.fn(), updatePreferences: vi.fn() }));
vi.mock('@/data/dao/profile.dao', () => profiles);
import { GET, PATCH } from '@/app/api/preferences/route';
import { DEFAULT_PREFERENCES } from '@/lib/constants';
describe('WB06 preference API write guards', () => {
  beforeEach(() => vi.spyOn(console, 'error').mockImplementation(() => {}));
  it('rejects a null DAO update without exposing internal details', async () => {
    profiles.updatePreferences.mockResolvedValue(null);
    const result = await PATCH(new NextRequest('http://localhost/api/preferences', { method: 'PATCH', headers: { 'x-learner-id': 'owner', 'Content-Type': 'application/json' }, body: '{"supportLanguage":"english"}' }));
    expect(result.status).toBe(500);
    expect(await result.json()).toEqual({ error: { code: 'PREFERENCE_UPDATE_FAILED', message: 'Unable to update preferences' } });
    expect(profiles.updatePreferences).toHaveBeenCalledExactlyOnceWith('owner', { supportLanguage: 'english' });
  });
  it.each(['GET', 'PATCH'])('guards %s missing identity before database access', async method => {
    const req = new NextRequest('http://localhost/api/preferences', { method, ...(method === 'PATCH' ? { body: '{"supportLanguage":"english"}' } : {}) });
    const result = await (method === 'GET' ? GET(req) : PATCH(req));
    expect(result.status).toBe(400); expect((await result.json()).error.code).toBe('LEARNER_IDENTITY_UNAVAILABLE');
    expect(profiles.getOrCreateProfile).not.toHaveBeenCalled(); expect(profiles.updatePreferences).not.toHaveBeenCalled();
  });
  it.each([{ unknown: 'value' }, { supportLanguage: 'spanish' }, { explanationLevel: 42 }, {}])('rejects invalid %j without write', async input => {
    const result = await PATCH(new NextRequest('http://localhost/api/preferences', { method: 'PATCH', headers: { 'x-learner-id': 'owner', 'Content-Type': 'application/json' }, body: JSON.stringify(input) }));
    expect(result.status).toBe(400); expect((await result.json()).error.code).toBe('INVALID_PREFERENCE_REQUEST');
    expect(profiles.updatePreferences).not.toHaveBeenCalled();
  });
  it('accepts supported partial update and passes only scoped validated fields to DAO', async () => {
    profiles.updatePreferences.mockResolvedValue({ preferences: { ...DEFAULT_PREFERENCES, supportLanguage: 'english' } });
    const result = await PATCH(new NextRequest('http://localhost/api/preferences', { method: 'PATCH', headers: { 'x-learner-id': 'owner', 'Content-Type': 'application/json' }, body: '{"supportLanguage":"english"}' }));
    expect(result.status).toBe(200); expect(profiles.updatePreferences).toHaveBeenCalledExactlyOnceWith('owner', { supportLanguage: 'english' });
    expect((await result.json()).preferences).toEqual({ ...DEFAULT_PREFERENCES, supportLanguage: 'english' });
  });
});
