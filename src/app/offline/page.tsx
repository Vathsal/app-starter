import { APP } from "@/app.config";

export const metadata = { title: `Offline · ${APP.name}` };

// Served by the service worker when a page isn't cached and there's no signal.
export default function OfflinePage() {
  return (
    <main className="wrap login">
      <span className="brand">
        {APP.brand}
        <b aria-hidden />
      </span>
      <p className="lede">You&rsquo;re offline. This page will load once you&rsquo;re back online.</p>
    </main>
  );
}
