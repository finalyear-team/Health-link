import React from "react";
import Image from "next/image";

const DashboardCard = () => {
  return (
    <div className="flex flex-col justify-between rounded border border-slate-200 dark:border-slate-600 p-3 max-w-md shadow-md">
      <h2 className="text-xl font-bold mb-2">Total Doctor Consulted</h2>
      <div className="flex justify-between">
        <span className="text-4xl font-bold"># 4 </span>
        <Image
          src={"/image/product/doctor-consulted (121x116).svg"}
          width={121}
          height={116}
          alt="user"
        />
      </div>
    </div>
  );
};

export default DashboardCard;
