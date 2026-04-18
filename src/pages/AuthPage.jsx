import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  DarkHero,
  Input,
  PrimaryButton,
  SectionLabel,
  Select,
} from "../components/Ui";
import { useAppState } from "../state/AppState";

export function AuthPage() {
  const { users, setActiveUser } = useAppState();
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id || "");
  const [role, setRole] = useState("Both");

  const selectedUser = useMemo(
    () => users.find((item) => item.id === selectedUserId) || users[0],
    [users, selectedUserId],
  );

  const onSubmit = (event) => {
    event.preventDefault();
    setActiveUser({ ...selectedUser, role });
    navigate("/dashboard");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DarkHero
        eyebrow="Community access"
        title="Enter the support network."
        description="Choose a demo identity, set your role, and jump into a multi-page product flow designed for asking, offering, and tracking help with a premium interface."
      />
      <Card className="p-9">
        <SectionLabel>Login / Signup</SectionLabel>
        <h2 className="text-5xl font-extrabold leading-[1.05] md:text-6xl">
          Authenticate your community profile
        </h2>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <Select
            label="Select demo user"
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(event.target.value)}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
          <Select
            label="Role selection"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          >
            <option>Need Help</option>
            <option>Can Help</option>
            <option>Both</option>
          </Select>
          <div className="grid gap-3 md:grid-cols-2">
            <Input label="Email" value={selectedUser.email} readOnly />
            <Input label="Password" value="••••••••" readOnly />
          </div>
          <PrimaryButton type="submit" full>
            Continue to dashboard
          </PrimaryButton>
        </form>
      </Card>
    </div>
  );
}
