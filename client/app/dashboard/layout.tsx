import type { Metadata } from "next";
import {Sidebar} from "@/components/dashboard/SideBar";
import Header from "@/components/dashboard/Header";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import VideoChatProvider from "../providers/HmsProvider";

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
      <VideoChatProvider>
      <Header />
      <div className="flex space-x-2 h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        <Sidebar />
        <div className="pt-16 flex-1 overflow-y-auto pr-2">{children}</div>
      </div>
    </VideoChatProvider>
    </div>
  );
}
