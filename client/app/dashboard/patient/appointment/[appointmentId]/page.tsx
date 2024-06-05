"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AppointmentDetail = ({
  params,
}: {
  params: { appointmentId: string };
}) => {
  const router = useRouter();
  return (
    <div>
      This is appointment {params.appointmentId}
      <div>
        <Button variant={"outline"} onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
      </div>
    </div>
  );
};

export default AppointmentDetail;
