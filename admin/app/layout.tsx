import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import ApolloWrappper from "./providers/ApolloWrappper";

export const metadata: Metadata = {
  title: "Admin Dashboard | Healthlink",
  description: "Start your way with HealthLink",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ApolloWrappper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}

            <Toaster />
          </ThemeProvider>
        </ApolloWrappper>
      </body>
    </html>
  );
}
