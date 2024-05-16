import type { Metadata } from "next";
import "./globals.css";
// import { Header, Footer } from "@/component";
import Layout from "@/component/Layout";
import { ClerkProvider } from "@clerk/nextjs";
// import { Inter as FontSans } from "next/font/google"
// import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "HealthLink",
  description: "Your health center!",
};

 
// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })
 

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
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
          </Layout>
        </body>
      </html>
    </ClerkProvider>
  );
}
