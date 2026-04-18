export const demoUsers = [
  {
    id: "u1",
    name: "Ayesha Khan",
    email: "community@helphub.ai",
    role: "Both",
    location: "Karachi",
    skills: ["Figma", "UI/UX", "HTML/CSS", "Career Guidance"],
    interests: ["Hackathons", "UI/UX", "Community Building"],
    trustScore: 100,
    contributions: 35,
    badges: ["Design Ally", "Fast Responder", "Top Mentor"],
  },
  {
    id: "u2",
    name: "Hassan Ali",
    email: "hassan@helphub.ai",
    role: "Can Help",
    location: "Karachi",
    skills: ["JavaScript", "React", "Git/GitHub"],
    interests: ["Mentoring", "Frontend"],
    trustScore: 88,
    contributions: 24,
    badges: ["Code Rescuer", "Bug Hunter"],
  },
];

export const defaultRequests = [
  {
    id: "r1",
    title: "Need help",
    description: "help needed",
    category: "Web Development",
    urgency: "High",
    status: "Solved",
    tags: [],
    requesterName: "Ayesha Khan",
    location: "Karachi",
    helpersInterested: 1,
    helperNames: ["Hassan Ali"],
    aiSummary:
      "AI summary: Basic support request. Adding more challenge context and deadline will increase match quality.",
  },
  {
    id: "r2",
    title: "Need help making my portfolio responsive before demo day",
    description:
      "My HTML/CSS portfolio breaks on tablets and I need layout guidance before tomorrow evening.",
    category: "Web Development",
    urgency: "High",
    status: "Solved",
    tags: ["HTML/CSS", "Responsive", "Portfolio"],
    requesterName: "Sara Noor",
    location: "Karachi",
    helpersInterested: 1,
    helperNames: ["Ayesha Khan"],
    aiSummary:
      "AI summary: Responsive layout issue with short deadline. Best helpers are frontend mentors comfortable with CSS grids and media queries.",
  },
  {
    id: "r3",
    title: "Looking for Figma feedback on a volunteer event poster",
    description:
      "I have a draft poster for a campus community event and want sharper hierarchy, spacing, and CTA copy.",
    category: "Design",
    urgency: "Medium",
    status: "Open",
    tags: ["Figma", "Poster", "Design Review"],
    requesterName: "Ayesha Khan",
    location: "Lahore",
    helpersInterested: 1,
    helperNames: ["Hassan Ali"],
    aiSummary:
      "AI summary: Visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.",
  },
  {
    id: "r4",
    title: "Need mock interview support for internship applications",
    description:
      "Applying to frontend internships and need someone to practice behavioral and technical interview questions with me.",
    category: "Career",
    urgency: "Low",
    status: "Solved",
    tags: ["Interview Prep", "Career", "Frontend"],
    requesterName: "Sara Noor",
    location: "Remote",
    helpersInterested: 2,
    helperNames: ["Ayesha Khan", "Hassan Ali"],
    aiSummary:
      "AI summary: Candidate needs structured interview practice focused on confidence-building and entry-level frontend interviews.",
  },
];

export const defaultMessages = [
  {
    id: "m1",
    from: "Ayesha Khan",
    to: "Sara Noor",
    body: "I checked your portfolio request. Share the breakpoint screenshots and I can suggest fixes.",
    time: "09:45 AM",
  },
  {
    id: "m2",
    from: "Hassan Ali",
    to: "Ayesha Khan",
    body: "Your event poster concept is solid. I would tighten the CTA and reduce the background texture.",
    time: "11:10 AM",
  },
];

export const defaultNotifications = [
  {
    id: "n1",
    title: '"Need help" was marked as solved',
    meta: "Status • Just now",
    read: false,
  },
  {
    id: "n2",
    title: 'Ayesha Khan offered help on "Need help"',
    meta: "Match • Just now",
    read: false,
  },
  {
    id: "n3",
    title: "Your trust score increased after a solved request",
    meta: "Reputation • 1 hr ago",
    read: false,
  },
  {
    id: "n4",
    title: "AI Center detected rising demand for interview prep",
    meta: "Insight • Today",
    read: true,
  },
];

export const leaderboardData = [
  {
    rank: 1,
    name: "Ayesha Khan",
    trustScore: 100,
    contributions: 35,
    skills: "Figma, UI/UX, HTML/CSS",
  },
  {
    rank: 2,
    name: "Hassan Ali",
    trustScore: 88,
    contributions: 24,
    skills: "JavaScript, React, Git/GitHub",
  },
  {
    rank: 3,
    name: "Sara Noor",
    trustScore: 74,
    contributions: 11,
    skills: "Python, Data Analysis",
  },
];
