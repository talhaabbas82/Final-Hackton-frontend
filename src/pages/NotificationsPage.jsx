import { Card, DarkHero, SectionLabel } from "../components/Ui";
import { useAppState } from "../state/AppState";

export function NotificationsPage() {
  const { notifications, markNotification } = useAppState();
  return (
    <div className="space-y-6">
      <DarkHero
        eyebrow="Notifications"
        title="Stay updated on requests, helpers, and trust signals."
        description="Live feed for new requests, status changes, helper matches, and platform insights."
      />
      <Card>
        <SectionLabel>Live updates</SectionLabel>
        <h2 className="text-5xl font-extrabold md:text-6xl">
          Notification feed
        </h2>
        <div className="mt-4 space-y-3">
          {!notifications.length ? (
            <article className="rounded-3xl border border-dashed border-line bg-surfaceMuted p-6">
              <p className="text-2xl font-semibold md:text-3xl">
                No notifications yet
              </p>
              <p className="mt-2 text-lg text-inkSoft md:text-xl">
                New request matches, solved updates, and AI insights will appear
                here.
              </p>
            </article>
          ) : (
            notifications.map((item) => (
              <article
                key={item.id}
                className={`flex items-center justify-between gap-4 rounded-3xl border p-4 ${
                  item.read
                    ? "border-line bg-surface"
                    : "border-primary/30 bg-mint/40"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {!item.read ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                    ) : null}
                    <p className="truncate text-2xl font-semibold md:text-3xl">
                      {item.title}
                    </p>
                  </div>
                  <p className="mt-1 text-lg text-inkSoft md:text-xl">
                    {item.meta}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => markNotification(item.id)}
                  aria-label={item.read ? "Notification marked as read" : "Mark notification as read"}
                  className="rounded-full border border-line bg-surface px-5 py-2 text-sm font-semibold text-ink transition hover:bg-surfaceMuted md:text-base"
                >
                  {item.read ? "Read" : "Mark as read"}
                </button>
              </article>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
