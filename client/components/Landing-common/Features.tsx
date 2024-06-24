import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

const Features = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => {
  return (
    <Card className="features_container">
      <Image src={icon} alt={title} width={200} height={200} className="auto mb-4" />
      <CardTitle className="text-center">{title}</CardTitle>
      <CardDescription className="text-center mt-2">{description}</CardDescription>
    </Card>
  );
};

export default Features;
