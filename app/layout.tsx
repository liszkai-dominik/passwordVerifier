import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Password verify",
  description: "Password verifying",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}