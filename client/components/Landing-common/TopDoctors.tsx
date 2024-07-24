"use client";
import React from "react";
import Image from "next/image";
import users from "@/public/data/users";
import DoctorProfileCard from "../shared/PopUpProfile";
import { DoctorProfile } from "@/types";
import useAppointmentStore from "@/store/appointmentStore";
import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DOCTORS } from "@/graphql/queries/userQueries";
import Loading from "@/common/Loader/Loading";
import useAuth from "@/hooks/useAuth";
import { FOLLOW_DOCTOR } from "@/graphql/mutations/userMutations";

interface TopDoctorsProps {
  items: DoctorProfile[];
}

const TopDoctors: React.FC<TopDoctorsProps> = ({ items }) => {
  const { user } = useAuth()

  const selectDoctor = useAppointmentStore((state) => state.selectDoctor);
  const [Follow, { data, loading, error }] = useMutation(FOLLOW_DOCTOR)

  const showAppointmentForm = useAppointmentStore(
    (state) => state.showAppointmentForm
  );

  const handleFollow = async (FollowingID: string) => {
    if (!FollowingID || !user.UserID)
      return

    await Follow({
      variables: {
        FollowerID: user.UserID,
        FollowingID,

      }


    })
    // handle follow logic
  };


  console.log(data)


  const handleMakeAppointment = (profile: any) => {
    selectDoctor({
      id: profile.UserID,
      profilePicture: profile.ProfilePicture,
      name: `$profile.FirstName  $profile.LastName`,
      username: profile.Username,
      type: profile.Role,
      followers: profile.Followers,
      following: profile.Following,
      rating: profile.Rating,
      speciality: profile.Speciality,
      experience: profile.ExperienceYears,
      hourlyRate: profile.ConsultationFee
    });
    setTimeout(() => {
      showAppointmentForm();
    }, 1000);
    console.log("The updated Doctor is : ", profile);
  };



  return (
    <div className="flex flex-wrap justify-center mt-3">
      {/* {data.Getdata.map((profile: any) => ( */}
      {items && items.map((profile: any) => (
        <DoctorProfileCard
          key={profile.UserID}
          id={profile.UserID}
          profilePicture={profile.profilePicture}
          name={`${profile.FirstName}  ${profile.LastName}`}
          username={profile.Username}
          type={profile.Role}
          followers={profile.Followers}
          following={profile.Following}
          rating={profile.Rating}
          speciality={profile.Speciality}
          experience={profile.ExperienceYears}
          hourlyRate={profile.ConsultationFee}
          onFollow={() => handleFollow(profile.UserID)}
          onMakeAppointment={handleMakeAppointment}
          profile={profile}
        />
      ))}
    </div>
  );
};

export default TopDoctors;
