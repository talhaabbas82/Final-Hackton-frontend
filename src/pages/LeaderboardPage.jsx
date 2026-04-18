import { Card, DarkHero, SectionLabel } from "../components/Ui";
import { useAppState } from "../state/AppState";

export function LeaderboardPage() {
  const { leaderboardData } = useAppState();
  return (
    <div className="space-y-6">
      <DarkHero
        eyebrow="Leaderboard"
        title="Recognize the people who keep the community moving."
        description="Trust score, contribution count, and badges create visible momentum for reliable helpers."
      />
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <SectionLabel>Top helpers</SectionLabel>
          <h2 className="text-5xl font-extrabold md:text-6xl">Rankings</h2>
          <div className="mt-4 space-y-3">
            {leaderboardData.map((item) => (
              <article
                key={item.rank}
                className="rounded-3xl border border-line bg-surface p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-3xl font-bold md:text-4xl">
                      #{item.rank} {item.name}
                    </p>
                    <p className="mt-1 text-lg text-inkSoft md:text-xl">
                      {item.skills}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold md:text-4xl">
                      {item.trustScore}%
                    </p>
                    <p className="text-lg text-inkSoft md:text-xl">
                      {item.contributions} contributions
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Card>
        <Card>
          <SectionLabel>Badge system</SectionLabel>
          <h2 className="text-5xl font-extrabold md:text-6xl">
            Trust and achievement
          </h2>
          <div className="mt-4 space-y-4">
            {leaderboardData.map((item) => (
              <article
                key={`bar-${item.rank}`}
                className="rounded-3xl border border-line bg-surface p-4"
              >
                <p className="text-3xl font-bold md:text-4xl">{item.name}</p>
                <p className="mt-1 text-lg text-inkSoft md:text-xl">
                  {item.rank === 1
                    ? "Top Mentor"
                    : item.rank === 2
                      ? "Code Rescuer • Bug Hunter"
                      : "Community Voice"}
                </p>
                <div className="mt-3 h-4 overflow-hidden rounded-full bg-surfaceMuted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#f3ae2a] via-[#5a9d53] to-[#0f8f95]"
                    style={{ width: `${item.trustScore}%` }}
                  />
                </div>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
