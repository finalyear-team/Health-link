import type { Metadata } from "next";
import {Sidebar} from "@/components/dashboard/SideBar";
import Header from "@/components/dashboard/Header";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Start your way with HealthLink",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <div className="flex space-x-2 h-screen">
        <Sidebar />
        <div className="pt-14 flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
