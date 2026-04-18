import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  DarkHero,
  SectionLabel,
  Select,
  Tag,
  TextArea,
} from "../components/Ui";
import { useAppState } from "../state/AppState";

export function ExplorePage() {
  const { requests } = useAppState();
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");

  const filtered = useMemo(
    () =>
      requests.filter((item) => {
        const matchesCategory = !category || item.category === category;
        const matchesUrgency = !urgency || item.urgency === urgency;
        const matchesSkills =
          !skills ||
          (item.tags || [])
            .join(" ")
            .toLowerCase()
            .includes(skills.toLowerCase());
        const matchesLocation =
          !location ||
          item.location.toLowerCase().includes(location.toLowerCase());
        return (
          matchesCategory && matchesUrgency && matchesSkills && matchesLocation
        );
      }),
    [requests, category, urgency, skills, location],
  );

  return (
    <div className="space-y-6">
      <DarkHero
        eyebrow="Explore / Feed"
        title="Browse help requests with filterable community context."
        description="Filter by category, urgency, skills, and location to surface the best matches."
      />
      <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
        <Card className="space-y-4">
          <SectionLabel>Filters</SectionLabel>
          <h2 className="text-5xl font-extrabold md:text-6xl">
            Refine the feed
          </h2>
          <Select
            label="Category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">All categories</option>
            <option>Web Development</option>
            <option>Design</option>
            <option>Career</option>
            <option>Community</option>
          </Select>
          <Select
            label="Urgency"
            value={urgency}
            onChange={(event) => setUrgency(event.target.value)}
          >
            <option value="">All urgency levels</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </Select>
          <TextArea
            label="Skills"
            rows={3}
            value={skills}
            onChange={(event) => setSkills(event.target.value)}
          />
          <TextArea
            label="Location"
            rows={3}
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </Card>
        <div className="space-y-4">
          {filtered.map((item) => (
            <Card key={item.id} className="p-5">
              <div className="flex flex-wrap items-center gap-2">
                <Tag>{item.category}</Tag>
                <Tag tone={item.urgency === "High" ? "danger" : "muted"}>
                  {item.urgency}
                </Tag>
                <Tag tone={item.status === "Solved" ? "success" : "muted"}>
                  {item.status}
                </Tag>
              </div>
              <h3 className="mt-2 text-3xl font-extrabold md:text-4xl">
                {item.title}
              </h3>
              <p className="mt-2 text-lg text-inkSoft md:text-xl">
                {item.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(item.tags || []).map((tag) => (
                  <Tag key={`${item.id}-${tag}`} tone="muted">
                    {tag}
                  </Tag>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold md:text-3xl">
                    {item.requesterName}
                  </p>
                  <p className="text-lg text-inkSoft md:text-xl">
                    {item.location} • {item.helpersInterested} helper interested
                  </p>
                </div>
                <Link
                  to={`/requests/${item.id}`}
                  className="rounded-full border border-line bg-surface px-6 py-3 text-lg font-semibold text-ink transition hover:bg-surfaceMuted md:text-xl"
                >
                  Open details
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
