import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Total number of {title}</CardDescription>
      </CardHeader>
      <CardContent className="p-3">
        <div className="text-2xl font-bold flex"> {number} </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;

{
  /* <div className="flex justify-between">
          <Image src={link} width={width} height={height} alt="user" />
        </div> */
}
