import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/theme/Layout";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body>
          <Layout>
            {children}
          </Layout>
        </body>
      </html>
    </ClerkProvider>
  );
}
