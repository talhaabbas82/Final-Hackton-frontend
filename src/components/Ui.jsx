import { Link } from "react-router-dom";

export function DarkHero({ eyebrow, title, description, actions }) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-heroStart via-heroMid to-heroEnd p-7 text-white shadow-card md:p-9">
      {eyebrow ? (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-mint/90">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="max-w-4xl text-3xl font-extrabold leading-[1.08] md:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-4xl text-base text-white/75 md:text-lg">
          {description}
        </p>
      ) : null}
      {actions ? (
        <div className="mt-6 flex flex-wrap items-center gap-3">{actions}</div>
      ) : null}
    </section>
  );
}

export function Card({ children, className = "" }) {
  return (
    <article
      className={`rounded-[1.5rem] border border-line/90 bg-card p-6 shadow-card ${className}`}
    >
      {children}
    </article>
  );
}

export function SectionLabel({ children }) {
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-primaryDeep">
      {children}
    </p>
  );
}

export function Tag({ children, tone = "default" }) {
  const toneClass =
    tone === "danger"
      ? "bg-dangerBg text-dangerText"
      : tone === "success"
        ? "bg-successBg text-successText"
        : tone === "muted"
          ? "bg-mint text-primaryDeep"
          : "bg-surfaceMuted text-primaryDeep";
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold md:text-sm ${toneClass}`}
    >
      {children}
    </span>
  );
}

export function PrimaryButton({
  to,
  children,
  type = "button",
  onClick,
  full = false,
}) {
  const classes = `inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primaryDeep to-primary px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:brightness-105 md:text-base ${
    full ? "w-full" : ""
  }`;
  if (to)
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function GhostButton({ to, children, type = "button", onClick }) {
  const classes =
    "inline-flex items-center justify-center rounded-full border border-line bg-surface px-6 py-2.5 text-sm font-semibold text-ink transition hover:bg-surfaceMuted md:text-base";
  if (to)
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-lg font-semibold text-inkSoft">
        {label}
      </span>
      <input
        {...props}
        className="h-12 w-full rounded-xl border border-line bg-surface px-4 text-base text-ink outline-none transition focus:border-primary"
      />
    </label>
  );
}

export function Select({ label, children, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-lg font-semibold text-inkSoft">
        {label}
      </span>
      <select
        {...props}
        className="h-12 w-full rounded-xl border border-line bg-surface px-4 text-base text-ink outline-none transition focus:border-primary"
      >
        {children}
      </select>
    </label>
  );
}

export function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-lg font-semibold text-inkSoft">
        {label}
      </span>
      <textarea
        {...props}
        className="w-full rounded-xl border border-line bg-surface p-4 text-base text-ink outline-none transition focus:border-primary"
      />
    </label>
  );
}
