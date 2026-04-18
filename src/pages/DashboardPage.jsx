import { Link } from "react-router-dom";
import {
  Card,
  DarkHero,
  GhostButton,
  SectionLabel,
  Tag,
} from "../components/Ui";
import { useAppState } from "../state/AppState";

export function DashboardPage() {
  const { currentUser, requests, notifications } = useAppState();
  const openCount = requests.filter((item) => item.status !== "Solved").length;
  const solvedCount = requests.filter(
    (item) => item.status === "Solved",
  ).length;

  return (
    <div className="space-y-6">
      <DarkHero
        eyebrow="Dashboard"
        title={`Welcome back, ${currentUser.name}.`}
        description="Manage requests, review insights, and act quickly with your support workflow."
      />
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <SectionLabel>Open requests</SectionLabel>
          <p className="text-5xl font-extrabold">{openCount}</p>
        </Card>
        <Card className="p-6">
          <SectionLabel>Solved requests</SectionLabel>
          <p className="text-5xl font-extrabold">{solvedCount}</p>
        </Card>
        <Card className="p-6">
          <SectionLabel>Trust score</SectionLabel>
          <p className="text-5xl font-extrabold">{currentUser.trustScore}%</p>
        </Card>
        <Card className="p-6">
          <SectionLabel>Unread updates</SectionLabel>
          <p className="text-5xl font-extrabold">
            {notifications.filter((item) => !item.read).length}
          </p>
        </Card>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <SectionLabel>Recent requests</SectionLabel>
          <h2 className="text-5xl font-extrabold md:text-6xl">
            Live support activity
          </h2>
          <div className="mt-5 space-y-3">
            {requests.slice(0, 4).map((request) => (
                <article
                  key={request.id}
                  className="rounded-3xl border border-line bg-surface p-5"
                >
                <div className="mb-2 flex flex-wrap gap-2">
                  <Tag>{request.category}</Tag>
                  <Tag tone={request.urgency === "High" ? "danger" : "muted"}>
                    {request.urgency}
                  </Tag>
                  <Tag tone={request.status === "Solved" ? "success" : "muted"}>
                    {request.status}
                  </Tag>
                </div>
                <h3 className="text-3xl font-bold md:text-4xl">
                  {request.title}
                </h3>
                <p className="mt-2 text-lg text-inkSoft md:text-xl">
                  {request.description}
                </p>
              </article>
            ))}
          </div>
        </Card>
        <Card>
          <SectionLabel>Quick actions</SectionLabel>
          <h2 className="text-5xl font-extrabold md:text-6xl">
            Jump into flow
          </h2>
          <div className="mt-5 space-y-3">
              <Link
                className="block rounded-3xl border border-line bg-surface p-5 text-2xl font-semibold md:text-3xl"
                to="/create-request"
              >
              Create request
            </Link>
              <Link
                className="block rounded-3xl border border-line bg-surface p-5 text-2xl font-semibold md:text-3xl"
                to="/explore"
              >
              Explore feed
            </Link>
              <Link
                className="block rounded-3xl border border-line bg-surface p-5 text-2xl font-semibold md:text-3xl"
                to="/ai-center"
              >
              Open AI Center
            </Link>
              <Link
                className="block rounded-3xl border border-line bg-surface p-5 text-2xl font-semibold md:text-3xl"
                to="/messages"
              >
              Continue messaging
            </Link>
          </div>
          <div className="mt-4">
            <GhostButton to="/onboarding">Go to onboarding</GhostButton>
          </div>
        </Card>
      </div>
    </div>
  );
}
