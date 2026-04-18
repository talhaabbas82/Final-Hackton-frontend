import { useMemo, useState } from "react";
import {
  Card,
  DarkHero,
  Input,
  PrimaryButton,
  SectionLabel,
  TextArea,
} from "../components/Ui";
import { suggestCategory, suggestTags } from "../support/ai";
import { useAppState } from "../state/AppState";

export function OnboardingPage() {
  const { currentUser } = useAppState();
  const [name, setName] = useState(currentUser.name);
  const [skills, setSkills] = useState(currentUser.skills.join(", "));
  const [interests, setInterests] = useState(currentUser.interests.join(", "));
  const [location, setLocation] = useState(currentUser.location);

  const ai = useMemo(() => {
    const text = `${skills} ${interests}`;
    return {
      helpWith: suggestTags(text, text).join(", "),
      needHelpIn: suggestCategory(interests, skills),
    };
  }, [skills, interests]);

  return (
    <div className="space-y-6">
      <DarkHero
        eyebrow="Onboarding"
        title="Shape your support identity."
        description="Add profile details so the platform can route high-quality matches and AI suggestions."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <Card className="space-y-4">
          <SectionLabel>Identity setup</SectionLabel>
          <h2 className="text-5xl font-extrabold md:text-6xl">
            Tell the platform who you are
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
          <PrimaryButton full>Save onboarding</PrimaryButton>
        </Card>
        <Card>
          <SectionLabel>AI suggestion</SectionLabel>
          <h2 className="text-5xl font-extrabold md:text-6xl">
            Smart onboarding hints
          </h2>
          <div className="mt-6 space-y-3">
            <article className="rounded-3xl border border-line bg-surface p-5">
              <p className="text-lg font-semibold text-inkSoft">
                You can help with
              </p>
              <p className="mt-1 text-3xl font-bold md:text-4xl">
                {ai.helpWith}
              </p>
            </article>
            <article className="rounded-3xl border border-line bg-surface p-5">
              <p className="text-lg font-semibold text-inkSoft">
                You may need support in
              </p>
              <p className="mt-1 text-3xl font-bold md:text-4xl">
                {ai.needHelpIn}
              </p>
            </article>
          </div>
        </Card>
      </div>
    </div>
  );
}
