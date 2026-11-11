import Link from "next/link";
import { Suspense } from "react";
import { APP } from "@/app.config";
import { AccountMenu } from "@/components/account-menu";
import { TabBar } from "@/components/tab-bar";
import { getProfile } from "@/lib/user";

// Standard shell: brand left; icon buttons (optional) then the avatar on the right; bottom tabs.
export default function TabsLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="wrap">
      <header className="app-header">
        <Link href="/" className="brand">
          {APP.brand}
          <b aria-hidden />
        </Link>
        <div className="header-actions">
          {/* Optional 44px icon buttons go here, e.g. <Link className="icon-button" ...><Icon name="search" /></Link> */}
          <Suspense fallback={<span className="avatar" aria-hidden><span className="avatar-circle avatar-placeholder" /></span>}>
            <Account />
          </Suspense>
        </div>
      </header>
      <main className="page">{children}</main>
      <TabBar />
    </div>
  );
}

async function Account() {
  const profile = await getProfile();
  return profile ? <AccountMenu profile={profile} /> : null;
}
