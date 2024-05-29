"use client"
import React from "react";
import Image from "next/image";
import users from "@/public/data/users";
import DoctorProfileCard from "../shared/PopUpProfile";
import { DoctorProfile } from "@/types";
import useAppointmentStore from "@/store/appointmentStore";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_DOCTORS } from "@/graphql/queries/userQueries";


interface TopDoctorsProps {
  items: DoctorProfile[];
}

const TopDoctors: React.FC<TopDoctorsProps> = ({ items }) => {
  const selectDoctor = useAppointmentStore((state) => state.selectDoctor);
  const selectedDoctor = useAppointmentStore((state) => state.selectedDoctor);
  const showAppointmentForm = useAppointmentStore(
    (state) => state.showAppointmentForm
  );
  const {data,error,loading}=useQuery(GET_DOCTORS)

  const handleFollow = () => {
    // handle follow logic
  };

  useEffect(() => {
    console.log("The selected Doctor is : ", selectedDoctor);
  }, [selectedDoctor]);

  const handleMakeAppointment = (profile: DoctorProfile) => {
    selectDoctor(profile);
    setTimeout(() => {
      showAppointmentForm();
    }, 1000);
    console.log("The updated Doctor is : ", profile);
  };

  if(loading)
    return <div>loading.....</div>


console.log(data)
  return (
    <div className="flex flex-wrap justify-center mt-3">
      {data.GetDoctors.map((profile:any) => (
        <DoctorProfileCard
          key={profile.id}
          id={profile.UserID}
          profilePicture={profile.profilePicture}
          name={`${profile.FirstName}  ${profile.LastName}`}
          username={profile.Username}
          type={profile.Role}
          followers={profile.Followers}
          following={profile.Following}
          rating={4.5}
          speciality={profile.Speciality}
          experience={profile.ExperienceYears}
          hourlyRate={profile.hourlyRate}
          onFollow={handleFollow}
          onMakeAppointment={handleMakeAppointment}
          profile={profile}
        />
      ))}
    </div>
  );
};

export default TopDoctors;
