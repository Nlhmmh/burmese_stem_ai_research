import LearningSession from "@/components/learn/LearningSession";

type SessionPageProps = {
  params: Promise<{ sessionId: string }>;
};

export default async function SessionPage({ params }: SessionPageProps) {
  const { sessionId } = await params;
  return <LearningSession sessionId={sessionId} />;
}
