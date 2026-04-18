import { useState } from "react";
import {
  Card,
  DarkHero,
  Input,
  PrimaryButton,
  SectionLabel,
  Tag,
  TextArea,
} from "../components/Ui";
import { useAppState } from "../state/AppState";

export function ProfilePage() {
  const { currentUser } = useAppState();
  const [name, setName] = useState(currentUser.name);
  const [location, setLocation] = useState(currentUser.location);
  const [skills, setSkills] = useState(currentUser.skills.join(", "));
  const [interests, setInterests] = useState(currentUser.interests.join(", "));

  return (
    <div className="space-y-6">
      <DarkHero
        eyebrow="Profile"
        title={name}
        description={`${currentUser.role} • ${location}`}
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <SectionLabel>Public profile</SectionLabel>
          <h2 className="text-5xl font-extrabold md:text-6xl">
            Skills and reputation
          </h2>
          <dl className="mt-4 border-y border-line py-4 text-2xl md:text-3xl">
            <div className="flex items-center justify-between">
              <dt className="text-inkSoft">Trust score</dt>
              <dd className="font-bold">{currentUser.trustScore}%</dd>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <dt className="text-inkSoft">Contributions</dt>
              <dd className="font-bold">{currentUser.contributions}</dd>
            </div>
          </dl>
          <div className="mt-4">
            <p className="text-xl font-semibold text-inkSoft md:text-2xl">
              Skills
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {currentUser.skills.map((item) => (
                <Tag key={item} tone="muted">
                  {item}
                </Tag>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xl font-semibold text-inkSoft md:text-2xl">
              Badges
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {currentUser.badges.map((item) => (
                <Tag key={item} tone="muted">
                  {item}
                </Tag>
              ))}
            </div>
          </div>
        </Card>
        <Card className="space-y-3">
          <SectionLabel>Edit profile</SectionLabel>
          <h2 className="text-5xl font-extrabold md:text-6xl">
            Update your identity
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <Input
              label="Location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
          <TextArea
            label="Skills"
            rows={3}
            value={skills}
            onChange={(event) => setSkills(event.target.value)}
          />
          <TextArea
            label="Interests"
            rows={3}
            value={interests}
            onChange={(event) => setInterests(event.target.value)}
          />
          <PrimaryButton full>Save profile</PrimaryButton>
        </Card>
      </div>
    </div>
  );
}
