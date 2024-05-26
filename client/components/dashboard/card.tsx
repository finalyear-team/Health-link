import React from "react";
import Image from "next/image";

const DashboardCard = ({
  title,
  link,
  number,
  width,
  height,
}: {
  title: string;
  link: string;
  number: number;
  width: number;
  height: number;
}) => {
  return (
    <div className="flex flex-col justify-between rounded border border-slate-200 dark:border-slate-600 p-3 max-w-md shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex justify-between">
        <div className="text-2xl font-bold flex">  {number} </div>
        <Image src={link} width={width} height={height} alt="user" />
      </div>
    </div>
  );
};

export default DashboardCard;
