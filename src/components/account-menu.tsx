"use client";

import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/lib/user";

/**
 * Round avatar at the right of the header; tapping it opens a small menu.
 * Order: "Hi, {first name}", email, app-specific switch rows (add them above Log out), Log out.
 */
export function AccountMenu({ profile }: { profile: Profile }) {
  const [open, setOpen] = useState(false);
  const [broken, setBroken] = useState(false); // Google photo failed: fall back to the initial
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  const name = profile.name?.split(" ")[0] ?? profile.email;

  return (
    <div className="account" ref={ref}>
      {/* 44px tap target around a 36px circle. */}
      <button className="avatar" onClick={() => setOpen((o) => !o)} aria-label="Account" aria-expanded={open}>
        <span className="avatar-circle">
          {profile.avatarUrl && !broken ? (
            // Google photo; next/image adds nothing for a 36px avatar.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={profile.avatarUrl} alt="" referrerPolicy="no-referrer" onError={() => setBroken(true)} />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </span>
      </button>
      {open && (
        <div className="account-menu" role="menu">
          <div className="account-who">
            <p>Hi, {name}</p>
            <span>{profile.email}</span>
          </div>
          {/* Sign out also drops cached pages so the login screen never shows stale data. */}
          <form
            action="/auth/signout"
            method="post"
            onSubmit={() => navigator.serviceWorker?.controller?.postMessage("clear-pages")}
          >
            <button className="account-item" role="menuitem">
              Log out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
