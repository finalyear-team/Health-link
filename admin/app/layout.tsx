import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import ApolloWrappper from "./providers/ApolloWrappper";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

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
            <ProtectedRoute>{children}</ProtectedRoute>
            <Toaster />
          </ThemeProvider>
        </ApolloWrappper>
      </body>
    </html>
  );
}
