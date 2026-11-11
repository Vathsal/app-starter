"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import { APP } from "@/app.config";
import { Icon } from "./icons";


// Bottom tabs from APP.tabs: icon + label, accent pill behind the active icon.
// The pathname is request data on dynamic routes, so the bar streams in; the fallback is the
// same bar with nothing highlighted, so the layout never shifts.
export function TabBar() {
  return (
    <Suspense fallback={<Bar current={null} />}>
      <LiveBar />
    </Suspense>
  );
}

function LiveBar() {
  const path = usePathname();
  // Highlight the tapped tab right away instead of after the next page loads.
  const [tapped, setTapped] = useState<{ from: string; to: string } | null>(null);
  const current = tapped && tapped.from === path ? tapped.to : path;
  return <Bar current={current} onTap={(to) => setTapped({ from: path, to })} />;
}

function Bar({ current, onTap }: { current: string | null; onTap?: (to: string) => void }) {
  return (
    <nav className="tab-bar" aria-label="Main">
      {APP.tabs.map((t) => {
        const active = current != null && (t.href === "/" ? current === "/" : current.startsWith(t.href));
        return (
          <Link
            key={t.href}
            href={t.href}
            onClick={() => onTap?.(t.href)}
            className={`tab${active ? " is-active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <i>
              <Icon name={t.icon} />
            </i>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
