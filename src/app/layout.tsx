import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { APP } from "@/app.config";
import { ServiceWorker } from "@/components/service-worker";
import "./globals.css";

const geist = Geist({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP.name,
  description: APP.description,
  appleWebApp: { capable: true, title: APP.name, statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: APP.themeColor,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        {children}
        <ServiceWorker />
      </body>
    </html>
  );
}
