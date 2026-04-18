import { Card, DarkHero, SectionLabel, Tag } from "../components/Ui";
import { useAppState } from "../state/AppState";

export function AICenterPage() {
  const { requests } = useAppState();
  const highUrgency = requests.filter((item) => item.urgency === "High").length;
  return (
    <div className="space-y-6">
      <DarkHero
        eyebrow="AI Center"
        title="See what the platform intelligence is noticing."
        description="AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <SectionLabel>Trend pulse</SectionLabel>
          <p className="text-5xl font-extrabold md:text-6xl">Web Development</p>
          <p className="mt-2 text-lg text-inkSoft md:text-xl">
            Most common support area based on active community requests.
          </p>
        </Card>
        <Card className="p-5">
          <SectionLabel>Urgency watch</SectionLabel>
          <p className="text-5xl font-extrabold md:text-6xl">{highUrgency}</p>
          <p className="mt-2 text-lg text-inkSoft md:text-xl">
            Requests currently flagged high priority by the urgency detector.
          </p>
        </Card>
        <Card className="p-5">
          <SectionLabel>Mentor pool</SectionLabel>
          <p className="text-5xl font-extrabold md:text-6xl">2</p>
          <p className="mt-2 text-lg text-inkSoft md:text-xl">
            Trusted helpers with strong response history and contribution
            signals.
          </p>
        </Card>
      </div>
      <Card>
        <SectionLabel>AI recommendations</SectionLabel>
        <h2 className="text-5xl font-extrabold md:text-6xl">
          Requests needing attention
        </h2>
        <div className="mt-4 space-y-3">
          {requests.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-line bg-surface p-4"
            >
              <h3 className="text-3xl font-bold md:text-4xl">{item.title}</h3>
              <p className="mt-2 text-lg text-inkSoft md:text-xl">
                {item.aiSummary}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Tag>{item.category}</Tag>
                <Tag tone={item.urgency === "High" ? "danger" : "muted"}>
                  {item.urgency}
                </Tag>
              </div>
            </article>
          ))}
        </div>
      </Card>
    </div>
  );
}
