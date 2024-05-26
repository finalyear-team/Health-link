import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const AppointmentDetail = ({
  params,
}: {
  params: { appointmentId: string };
}) => {
  return (
    <div>
      This is appointment {params.appointmentId}
      <div>
        <Button variant={"outline"}>
          <Link href="/dashboard/patient/appointment" className="flex">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Appointment page{" "}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default AppointmentDetail;
