import { createContext, useContext, useMemo, useState } from "react";
import {
  defaultMessages,
  defaultNotifications,
  defaultRequests,
  demoUsers,
  leaderboardData,
} from "../support/demoData";
import {
  detectUrgency,
  suggestCategory,
  suggestTags,
  suggestRewrite,
} from "../support/ai";

const AppStateContext = createContext(null);

const readStorage = (key, fallback) => {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error(`Failed to parse localStorage key "${key}"`, error);
    return fallback;
  }
};

const readCollection = (key, fallback) => {
  const parsed = readStorage(key, fallback);
  if (!Array.isArray(parsed)) return fallback;
  return parsed.length ? parsed : fallback;
};

export function AppStateProvider({ children }) {
  const [users] = useState(() => readCollection("helplytics_users", demoUsers));
  const [currentUser, setCurrentUser] = useState(() => {
    const persisted = readStorage("helplytics_current_user", demoUsers[0]);
    if (!persisted) return demoUsers[0];
    const exists = users.find((user) => user.id === persisted.id);
    return exists || users[0];
  });
  const [requests, setRequests] = useState(() =>
    readCollection("helplytics_requests", defaultRequests),
  );
  const [messages, setMessages] = useState(() =>
    readCollection("helplytics_messages", defaultMessages),
  );
  const [notifications, setNotifications] = useState(() =>
    readCollection("helplytics_notifications", defaultNotifications),
  );

  const persist = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));

  const setActiveUser = (user) => {
    setCurrentUser(user);
    persist("helplytics_current_user", user);
  };

  const createRequest = (payload) => {
    const ai = {
      suggestedCategory: suggestCategory(payload.title, payload.description),
      detectedUrgency: detectUrgency(payload.description),
      suggestedTags: suggestTags(payload.title, payload.description),
      rewriteSuggestion: suggestRewrite(payload.description),
    };
    const record = {
      id: String(Date.now()),
      requesterName: currentUser.name,
      location: currentUser.location,
      status: "Open",
      helpersInterested: 0,
      helperNames: [],
      ...payload,
      urgency: payload.urgency || ai.detectedUrgency,
      category: payload.category || ai.suggestedCategory,
      tags: payload.tags?.length ? payload.tags : ai.suggestedTags,
      aiSummary: `AI summary: ${ai.rewriteSuggestion}`,
      aiMeta: ai,
    };
    const next = [record, ...requests];
    setRequests(next);
    persist("helplytics_requests", next);
    const nextNotif = [
      {
        id: `n-${Date.now()}`,
        title: `Your request "${record.title}" is now live in the community feed`,
        meta: "Request • Just now",
        read: false,
      },
      ...notifications,
    ];
    setNotifications(nextNotif);
    persist("helplytics_notifications", nextNotif);
    return record;
  };

  const markAsSolved = (requestId) => {
    const next = requests.map((request) =>
      request.id === requestId ? { ...request, status: "Solved" } : request,
    );
    setRequests(next);
    persist("helplytics_requests", next);
  };

  const addHelper = (requestId) => {
    const next = requests.map((request) =>
      request.id === requestId
        ? {
            ...request,
            helpersInterested: request.helpersInterested + 1,
            helperNames: [
              ...new Set([...(request.helperNames || []), currentUser.name]),
            ],
          }
        : request,
    );
    setRequests(next);
    persist("helplytics_requests", next);
  };

  const addMessage = (to, body) => {
    const next = [
      {
        id: `m-${Date.now()}`,
        from: currentUser.name,
        to,
        body,
        time: "Just now",
      },
      ...messages,
    ];
    setMessages(next);
    persist("helplytics_messages", next);
  };

  const markNotification = (id) => {
    const next = notifications.map((item) =>
      item.id === id ? { ...item, read: true } : item,
    );
    setNotifications(next);
    persist("helplytics_notifications", next);
  };

  const value = useMemo(
    () => ({
      users,
      currentUser,
      requests,
      messages,
      notifications,
      leaderboardData,
      setActiveUser,
      createRequest,
      markAsSolved,
      addHelper,
      addMessage,
      markNotification,
    }),
    [users, currentUser, requests, messages, notifications],
  );

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  const value = useContext(AppStateContext);
  if (!value) {
    throw new Error("useAppState must be used inside AppStateProvider");
  }
  return value;
};
