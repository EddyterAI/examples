import type { Metadata } from "next";
import "eddyter/style.css";

export const metadata: Metadata = {
  title: "Eddyter + Next.js",
  description: "Simple Eddyter integration in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>{children}</body>
    </html>
  );
}
