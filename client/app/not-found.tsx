"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RotateCcw, LayoutGrid, Frown } from "lucide-react";

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Redirect to the home page after 5 seconds
      router.push("/");
    }, 5000);

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen space-y-3">
      <div className="text-cente flex flex-col items-center space-y-3">
        <Frown className="w-16 h-16" />
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white">
          404
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Page Not Found
        </p>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Redirecting to{" "}
          <span className="text-primary-600 dark:text-primary-700">
            home page
          </span>{" "}
          in 5 seconds...
        </p>
        <Button onClick={() => location.reload()} variant={"ghost"}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Refresh Page
        </Button>
        <Button onClick={() => router.push("/")}>
          {" "}
          <LayoutGrid className="w-4 h-4 mr-2" />
          Go to Home Page Now
        </Button>
      </div>
    </div>
  );
};

export default Custom404;
