import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  DarkHero,
  GhostButton,
  Input,
  PrimaryButton,
  SectionLabel,
  Select,
  TextArea,
} from "../components/Ui";
import {
  detectUrgency,
  suggestCategory,
  suggestRewrite,
  suggestTags,
} from "../support/ai";
import { useAppState } from "../state/AppState";

const toTags = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export function CreateRequestPage() {
  const { createRequest } = useAppState();
  const navigate = useNavigate();
  const [title, setTitle] = useState(
    "Need review on my JavaScript quiz app before submission",
  );
  const [description, setDescription] = useState(
    "Explain the challenge, your current progress, deadline, and what kind of help would be useful.",
  );
  const [tags, setTags] = useState("JavaScript, Debugging, Review");
  const [category, setCategory] = useState("Web Development");
  const [urgency, setUrgency] = useState("High");

  const ai = useMemo(
    () => ({
      suggestedCategory: suggestCategory(title, description),
      detectedUrgency: detectUrgency(description),
      suggestedTags: suggestTags(title, description).join(", "),
      rewrite: suggestRewrite(description),
    }),
    [title, description],
  );

  const applyAi = () => {
    setCategory(ai.suggestedCategory);
    setUrgency(ai.detectedUrgency);
    setTags(ai.suggestedTags);
    setDescription(ai.rewrite);
  };

  const publish = () => {
    const request = createRequest({
      title,
      description,
      tags: toTags(tags),
      category,
      urgency,
    });
    navigate(`/requests/${request.id}`);
  };

  return (
    <div className="space-y-6">
      <DarkHero
        eyebrow="Create Request"
        title="Turn a rough problem into a clear help request."
        description="Use built-in AI suggestions for category, urgency, tags, and a stronger description rewrite."
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-4">
          <Input
            label="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextArea
            label="Description"
            rows={5}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              label="Tags"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
            />
            <Select
              label="Category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>Web Development</option>
              <option>Design</option>
              <option>Career</option>
              <option>Community</option>
            </Select>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <Select
              label="Urgency"
              value={urgency}
              onChange={(event) => setUrgency(event.target.value)}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </Select>
          </div>
          <div className="flex flex-wrap gap-3">
            <GhostButton onClick={applyAi}>Apply AI suggestions</GhostButton>
            <PrimaryButton onClick={publish}>Publish request</PrimaryButton>
          </div>
        </Card>
        <Card>
          <SectionLabel>AI Assistant</SectionLabel>
          <h2 className="text-5xl font-extrabold md:text-6xl">
            Smart request guidance
          </h2>
          <dl className="mt-5 space-y-4 text-xl md:text-2xl">
            <div className="rounded-2xl border border-line bg-surface p-4">
              <dt className="text-inkSoft">Suggested category</dt>
              <dd className="font-bold">{ai.suggestedCategory}</dd>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-4">
              <dt className="text-inkSoft">Detected urgency</dt>
              <dd className="font-bold">{ai.detectedUrgency}</dd>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-4">
              <dt className="text-inkSoft">Suggested tags</dt>
              <dd className="font-bold">{ai.suggestedTags}</dd>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-4">
              <dt className="text-inkSoft">Rewrite suggestion</dt>
              <dd className="font-bold">{ai.rewrite}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
