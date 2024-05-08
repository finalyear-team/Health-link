import React from "react";
import Image from "next/image";

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
    <div className="features_container">
      <Image src={icon} alt={title} width={200} height={200} className="h-16 w-16 mb-4" />
      <h3 className="text-2xl text-center font-bold font-main mb-2 text-dark-700">{title}</h3>
      <p className="text-gray-700 font-main text-center mt-2">{description}</p>
    </div>
  );
};

export default Features;
