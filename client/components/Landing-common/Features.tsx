import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

const Features = ({
  title,
  description,
  icon,
  className,
}: {
  title: string;
  description: string;
  icon: string;
  className: string;
}) => {
  return (
    <Card className={className}>
      <CardHeader>
        <Image
          src={icon}
          alt={title}
          width={200}
          height={200}
          className="auto mb-4"
        />
      </CardHeader>
      <CardTitle className="text-center">{title}</CardTitle>
      <CardDescription className="text-center mt-2">
        {description}
      </CardDescription>
    </Card>
  );
};

export default Features;
