import { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  DarkHero,
  GhostButton,
  PrimaryButton,
  SectionLabel,
  Tag,
} from "../components/Ui";
import { useAppState } from "../state/AppState";

export function RequestDetailPage() {
  const { id } = useParams();
  const { requests, addHelper, markAsSolved, users } = useAppState();
  const request = useMemo(
    () => requests.find((item) => item.id === id) || requests[0],
    [requests, id],
  );

  return (
    <div className="space-y-6">
      <DarkHero
        eyebrow="Request Detail"
        title={request.title}
        description={request.description}
        actions={
          <div className="flex flex-wrap gap-2">
            <Tag>{request.category}</Tag>
            <Tag tone={request.urgency === "High" ? "danger" : "muted"}>
              {request.urgency}
            </Tag>
            <Tag tone={request.status === "Solved" ? "success" : "muted"}>
              {request.status}
            </Tag>
          </div>
        }
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <Card>
            <SectionLabel>AI Summary</SectionLabel>
            <p className="text-2xl text-inkSoft md:text-3xl">
              {request.aiSummary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(request.tags || []).map((tag) => (
                <Tag key={`tag-${tag}`} tone="muted">
                  {tag}
                </Tag>
              ))}
            </div>
          </Card>
          <Card>
            <SectionLabel>Actions</SectionLabel>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton onClick={() => addHelper(request.id)}>
                I can help
              </PrimaryButton>
              <GhostButton onClick={() => markAsSolved(request.id)}>
                Mark as solved
              </GhostButton>
            </div>
          </Card>
        </div>
        <div className="space-y-5">
          <Card>
            <SectionLabel>Requester</SectionLabel>
            <p className="text-4xl font-bold md:text-5xl">
              {request.requesterName}
            </p>
            <p className="mt-2 text-xl text-inkSoft md:text-2xl">
              {request.location}
            </p>
          </Card>
          <Card>
            <SectionLabel>Helpers</SectionLabel>
            <h3 className="text-4xl font-bold md:text-5xl">
              People ready to support
            </h3>
            <div className="mt-4 space-y-3">
              {users.slice(0, 2).map((helper) => (
                <article
                  key={helper.id}
                  className="rounded-3xl border border-line bg-surface p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-2xl font-bold md:text-3xl">
                        {helper.name}
                      </p>
                      <p className="mt-1 text-lg text-inkSoft md:text-xl">
                        {helper.skills.join(", ")}
                      </p>
                    </div>
                    <Tag tone="muted">Trust {helper.trustScore}%</Tag>
                  </div>
                </article>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
