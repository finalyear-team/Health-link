"use client"
import React from "react";
import { Tags } from "lucide-react";
import users from "@/public/data/users";
import TopDoctors from "../TopDoctors";
import { useQuery } from "@apollo/client";
import { GET_DOCTORS } from "@/graphql/queries/userQueries";

const TopDoctorSection = () => {
  const { data: topDoctors, loading, error } = useQuery(GET_DOCTORS)
  const filteredUsers = users.slice(0, 6);
  return (
    <section className="w-full py-6">
      <div className="w-full flex items-center justify-center mb-2 text-2xl font-bold h-20 text-center px-3 text-primary-600 dark:text-primary-700 sticky top-12 bg-slate-800">
        <Tags className="w-6 h-6 mr-2" /> Our Doctors
      </div>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-foreground">
            Meet Our Exceptional Doctors
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our team of highly skilled and experienced doctors are dedicated to
            providing you with the best possible care.
          </p>
        </div>
        <TopDoctors items={topDoctors?.GetDoctors} />
      </div>
    </section>
  );
};

export default TopDoctorSection;
