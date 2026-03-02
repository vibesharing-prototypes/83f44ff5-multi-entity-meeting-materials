import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/TopNav";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Governance Dashboard",
  description: "Corporate Secretary Workspace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="bg-white text-slate-900 font-sans antialiased flex flex-col h-screen overflow-hidden">
        <TopNav />
        <div className="flex-1 min-h-0 overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
