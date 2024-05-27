import React from "react";
import Image from "next/image";
import users from "@/public/data/users";
import DoctorProfileCard from "../shared/PopUpProfile";
import { DoctorProfile } from "@/types";
import useAppointmentStore from "@/store/appointmentStore";
import { useEffect } from "react";


interface TopDoctorsProps {
  items: DoctorProfile[];
}

const TopDoctors: React.FC<TopDoctorsProps> = ({ items }) => {
  const selectDoctor = useAppointmentStore((state) => state.selectDoctor);
  const selectedDoctor = useAppointmentStore((state) => state.selectedDoctor);
  const showAppointmentForm = useAppointmentStore(
    (state) => state.showAppointmentForm
  );

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

  return (
    <div className="flex flex-wrap justify-center mt-3">
      {items.map((profile) => (
        <DoctorProfileCard
          key={profile.id}
          id={profile.id}
          profilePicture={profile.profilePicture}
          name={profile.name}
          username={profile.username}
          type={profile.type}
          followers={profile.followers}
          following={profile.following}
          rating={profile.rating}
          speciality={profile.speciality}
          experience={profile.experience}
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
