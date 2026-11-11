// Everything that makes this app this app. Change these first (wiki/setup/app-stack.md "New app checklist").
import type { IconName } from "@/components/icons";

export const APP = {
  name: "App Starter", // home screen + page titles
  shortName: "Starter", // under the launcher icon
  brand: "starter", // lowercase wordmark in the header
  tagline: "One line on what this app is for.",
  description: "Personal app",
  // Supabase schema in project "personal". Must match supabase/migrations. Never "public" for a new app.
  schema: "starter",
  themeColor: "#ffffff",
  tabs: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/second", label: "Second", icon: "heart" },
  ] satisfies { href: string; label: string; icon: IconName }[],
} as const;
