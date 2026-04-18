import {
  Card,
  DarkHero,
  GhostButton,
  PrimaryButton,
  SectionLabel,
  Tag,
} from "../components/Ui";
import { useAppState } from "../state/AppState";

export function LandingPage() {
  const { requests } = useAppState();

  return (
    <div className="space-y-9 pb-10">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.8fr]">
        <Card className="p-9">
          <SectionLabel>SMIT GRAND CODING NIGHT 2026</SectionLabel>
          <h1 className="text-5xl font-extrabold leading-[1.05] text-ink md:text-7xl">
            Find help faster.
            <br />
            Become help that matters.
          </h1>
          <p className="mt-5 max-w-3xl text-xl text-inkSoft md:text-[27px]">
            HelpHub AI is a community-powered support network for students,
            mentors, creators, and builders. Ask for help, offer help, track
            impact, and let AI surface smarter matches across the platform.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton to="/dashboard">Open product demo</PrimaryButton>
            <GhostButton to="/create-request">Post a request</GhostButton>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <Card className="p-5">
              <SectionLabel>Members</SectionLabel>
              <p className="text-4xl font-extrabold md:text-5xl">384+</p>
              <p className="mt-2 text-lg text-inkSoft md:text-xl">
                Students, mentors, and helpers in the loop.
              </p>
            </Card>
            <Card className="p-5">
              <SectionLabel>Requests</SectionLabel>
              <p className="text-4xl font-extrabold md:text-5xl">72+</p>
              <p className="mt-2 text-lg text-inkSoft md:text-xl">
                Support posts shared across learning journeys.
              </p>
            </Card>
            <Card className="p-5">
              <SectionLabel>Solved</SectionLabel>
              <p className="text-4xl font-extrabold md:text-5xl">69+</p>
              <p className="mt-2 text-lg text-inkSoft md:text-xl">
                Problems resolved through fast community action.
              </p>
            </Card>
          </div>
        </Card>
        <DarkHero
          eyebrow="Live product feel"
          title="More than a form. More like an ecosystem."
          description="A polished multi-page experience inspired by product platforms, with AI summaries, trust scores, contribution signals, notifications, and leaderboard momentum."
          actions={
            <div className="grid w-full gap-3">
              <Card className="bg-surface/95 p-5">
                <h3 className="text-[27px] font-bold text-ink">
                  AI request intelligence
                </h3>
                <p className="mt-2 text-lg text-inkSoft md:text-xl">
                  Auto-categorization, urgency detection, tags, rewrite
                  suggestions, and trend snapshots.
                </p>
              </Card>
              <Card className="bg-surface/95 p-5">
                <h3 className="text-[27px] font-bold text-ink">
                  Community trust graph
                </h3>
                <p className="mt-2 text-lg text-inkSoft md:text-xl">
                  Badges, helper rankings, trust score boosts, and visible
                  contribution history.
                </p>
              </Card>
            </div>
          }
        />
      </div>

      <section>
        <SectionLabel>Core flow</SectionLabel>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-4xl font-extrabold md:text-6xl">
            From struggling alone to solving together
          </h2>
          <GhostButton to="/onboarding">Try onboarding AI</GhostButton>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Card>
            <h3 className="text-3xl font-bold md:text-4xl">
              Ask for help clearly
            </h3>
            <p className="mt-3 text-lg text-inkSoft md:text-[25px]">
              Create structured requests with category, urgency, AI suggestions,
              and tags.
            </p>
          </Card>
          <Card>
            <h3 className="text-3xl font-bold md:text-4xl">
              Discover the right people
            </h3>
            <p className="mt-3 text-lg text-inkSoft md:text-[25px]">
              Use explore feed, helper lists, notifications, and messaging to
              move quickly.
            </p>
          </Card>
          <Card>
            <h3 className="text-3xl font-bold md:text-4xl">
              Track real contribution
            </h3>
            <p className="mt-3 text-lg text-inkSoft md:text-[25px]">
              Trust scores, badges, solved requests, and rankings recognize
              support.
            </p>
          </Card>
        </div>
      </section>

      <section>
        <SectionLabel>Featured requests</SectionLabel>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-4xl font-extrabold md:text-6xl">
            Community problems currently in motion
          </h2>
          <GhostButton to="/explore">View full feed</GhostButton>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {requests.slice(0, 3).map((item) => (
            <Card key={item.id}>
              <div className="flex flex-wrap gap-2">
                <Tag>{item.category}</Tag>
                <Tag tone={item.urgency === "High" ? "danger" : "muted"}>
                  {item.urgency}
                </Tag>
                <Tag tone={item.status === "Solved" ? "success" : "muted"}>
                  {item.status}
                </Tag>
              </div>
              <h3 className="mt-3 text-3xl font-bold md:text-4xl">
                {item.title}
              </h3>
              <p className="mt-2 text-lg text-inkSoft md:text-[24px]">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(item.tags || []).map((tag) => (
                  <Tag key={`${item.id}-${tag}`} tone="muted">
                    {tag}
                  </Tag>
                ))}
              </div>
              <p className="mt-4 text-xl font-semibold md:text-[27px]">
                {item.requesterName}
              </p>
              <p className="text-lg text-inkSoft md:text-xl">{item.location}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
