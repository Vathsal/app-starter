import { Suspense } from "react";
import { APP } from "@/app.config";
import { LoginForm } from "./login-form";

export const metadata = { title: `Sign in · ${APP.name}` };

export default function LoginPage() {
  return (
    <main className="wrap login">
      <span className="brand">
        {APP.brand}
        <b aria-hidden />
      </span>
      <p className="lede">{APP.tagline}</p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
