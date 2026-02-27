import type { Metadata } from "next";
import "./globals.css";
import TopNav from "@/components/TopNav";

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
    <html lang="en">
      <body className="bg-white text-slate-900 font-sans antialiased flex flex-col h-screen overflow-hidden">
        <TopNav />
        <div className="flex-1 min-h-0 overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
