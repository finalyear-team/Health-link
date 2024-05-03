import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/component";
import Layout from "@/component/Layout";

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
        <Layout>
          <Header />
          {children}
          <Footer />
        </Layout>
      </body>
    </html>
  );
}
