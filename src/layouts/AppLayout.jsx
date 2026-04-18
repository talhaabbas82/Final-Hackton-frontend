import { NavLink, Outlet, useLocation } from "react-router-dom";

const landingNav = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/ai-center", label: "AI Center" },
  { to: "/notifications", label: "Notifications" },
];

const authNav = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/notifications", label: "Notifications" },
];

const appNav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/explore", label: "Explore" },
  { to: "/create-request", label: "Create" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/ai-center", label: "AI Center" },
  { to: "/notifications", label: "Notifications" },
  { to: "/messages", label: "Messages" },
  { to: "/profile", label: "Profile" },
];

const requestDetailNav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/explore", label: "Explore" },
  { to: "/messages", label: "Messages" },
  { to: "/notifications", label: "Notifications" },
];

function getNavConfig(pathname) {
  if (pathname === "/") {
    return {
      items: landingNav,
      cta: { to: "/auth", label: "Join the platform" },
    };
  }
  if (pathname === "/auth" || pathname === "/onboarding") {
    return {
      items: authNav,
      cta: { to: "/dashboard", label: "Open dashboard" },
    };
  }
  if (pathname.startsWith("/requests/")) {
    return {
      items: requestDetailNav,
      cta: { to: "/create-request", label: "Create request" },
    };
  }
  return {
    items: appNav,
    cta: { to: "/create-request", label: "Create request" },
  };
}

export function AppLayout() {
  const { pathname } = useLocation();
  const navConfig = getNavConfig(pathname);

  const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-mint text-primaryDeep"
        : "text-inkSoft hover:bg-surfaceMuted hover:text-ink"
    }`;

  return (
    <div className="app-shell px-4 pb-10 sm:px-6 md:px-8">
      <header className="sticky top-3 z-40">
        <div className="mx-auto max-w-[1240px] rounded-[1.15rem] border border-white/60 bg-canvas/70 px-4 py-3 shadow-card backdrop-blur-xl supports-[backdrop-filter]:bg-canvas/60 md:px-5">
          <div className="flex items-center justify-between gap-4">
            <NavLink to="/" className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-white">
                H
              </div>
              <span className="truncate text-xl font-semibold tracking-tight text-ink">
                HelpHub AI
              </span>
            </NavLink>
            <nav className="hidden items-center gap-1 lg:flex">
              {navConfig.items.map((item) => (
                <NavLink key={item.to} to={item.to} className={navLinkClass}>
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to={navConfig.cta.to}
                className="ml-2 rounded-full bg-gradient-to-r from-primaryDeep to-primary px-5 py-2 text-sm font-semibold text-white shadow-glow transition hover:brightness-105"
              >
                {navConfig.cta.label}
              </NavLink>
            </nav>
          </div>

          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {navConfig.items.map((item) => (
              <NavLink
                key={`mobile-${item.to}`}
                to={item.to}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to={navConfig.cta.to}
              className="rounded-full bg-gradient-to-r from-primaryDeep to-primary px-4 py-2 text-sm font-semibold text-white"
            >
              {navConfig.cta.label}
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto mt-6 max-w-[1240px]">
        <Outlet />
      </main>
    </div>
  );
}
