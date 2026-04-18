import { useState } from "react";
import {
  Card,
  DarkHero,
  PrimaryButton,
  SectionLabel,
  Select,
  TextArea,
} from "../components/Ui";
import { useAppState } from "../state/AppState";

export function MessagesPage() {
  const { messages, users, addMessage } = useAppState();
  const [to, setTo] = useState(users[0]?.name || "");
  const [body, setBody] = useState("");

  const onSend = () => {
    if (!body.trim()) return;
    addMessage(to, body.trim());
    setBody("");
  };

  return (
    <div className="space-y-6">
      <DarkHero
        eyebrow="Interaction / Messaging"
        title="Keep support moving through direct communication."
        description="Basic messaging gives helpers and requesters a clear follow-up path once a match happens."
      />
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
        <Card>
          <SectionLabel>Conversation stream</SectionLabel>
          <h2 className="text-5xl font-extrabold md:text-6xl">
            Recent messages
          </h2>
          <div className="mt-4 space-y-3">
            {messages.map((message) => (
              <article
                key={message.id}
                className="rounded-3xl border border-line bg-surface p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-2xl font-bold md:text-3xl">
                      {message.from} → {message.to}
                    </p>
                    <p className="mt-2 text-lg text-inkSoft md:text-xl">
                      {message.body}
                    </p>
                  </div>
                  <p className="rounded-full bg-mint px-3 py-2 text-sm font-bold text-primaryDeep md:text-base">
                    {message.time}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Card>
        <Card className="space-y-4">
          <SectionLabel>Send message</SectionLabel>
          <h2 className="text-5xl font-extrabold md:text-6xl">
            Start a conversation
          </h2>
          <Select
            label="To"
            value={to}
            onChange={(event) => setTo(event.target.value)}
          >
            {users.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </Select>
          <TextArea
            label="Message"
            rows={5}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            placeholder="Share support details, ask for files, or suggest next steps."
          />
          <PrimaryButton onClick={onSend} full>
            Send
          </PrimaryButton>
        </Card>
      </div>
    </div>
  );
}
