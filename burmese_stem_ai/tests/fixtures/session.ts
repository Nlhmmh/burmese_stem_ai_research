import type { SessionRecord } from "@/data/dao/session.dao";

export function makeSessionRecord(overrides: Partial<SessionRecord> = {}): SessionRecord {
  const timestamp = new Date("2026-01-15T10:00:00.000Z");
  const session: SessionRecord = {
    sessionId: "2fba6e7a-1225-4d1f-971f-5ae58704e3d5",
    learnerId: "learner-a",
    originalQuestion: "What is gradient descent?",
    concept: {
      name: "Gradient descent",
      domain: "Machine learning"
    },
    explanations: {
      simple: { en: "Simple explanation", my: "ရိုးရှင်းသော ရှင်းလင်းချက်" },
      realWorldExample: { en: "Real-world example", my: "လက်တွေ့ ဥပမာ" },
      technical: { en: "Technical explanation", my: "နည်းပညာ ရှင်းလင်းချက်" }
    },
    reflectivePrompt: { en: "What changes next?", my: "နောက်တစ်ဆင့် ဘာပြောင်းမလဲ။" },
    hint: { en: "Think about the slope.", my: "လျှောစောက်ကို စဉ်းစားပါ။" },
    preferencesSnapshot: {
      uiLanguage: "en",
      supportLanguage: "bilingual",
      explanationLevel: "beginner",
      learningStyle: "guided",
      theme: "light"
    },
    understanding: null,
    status: "in_progress",
    adaptationRound: 0,
    adaptations: [],
    followUps: [],
    createdAt: timestamp,
    updatedAt: timestamp
  };

  return { ...session, ...overrides };
}
