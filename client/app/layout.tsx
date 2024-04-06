import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/component";

export const metadata: Metadata = {
  title: "HealthLink",
  description: "Your health center!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
