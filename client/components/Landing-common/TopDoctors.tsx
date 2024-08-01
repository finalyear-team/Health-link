"use client";
import React, { useState } from "react";
import Image from "next/image";
import users from "@/public/data/users";
import DoctorProfileCard from "../shared/PopUpProfile";
import { DoctorProfile } from "@/types";
import useAppointmentStore from "@/store/appointmentStore";
import { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DOCTORS, GET_FOLLOWERS, GET_FOLLOWING } from "@/graphql/queries/userQueries";
import Loading from "@/common/Loader/Loading";
import useAuth from "@/hooks/useAuth";
import { FOLLOW_DOCTOR, UNFOLLOW_DOCTOR } from "@/graphql/mutations/userMutations";
import client from "@/graphql/apollo-client";

interface TopDoctorsProps {
  items: DoctorProfile[];
}

const TopDoctors: React.FC<TopDoctorsProps> = ({ items }) => {

  const { user } = useAuth()
  const doctors = items && items?.filter((item) => item.id !== user?.UserID)

  const selectDoctor = useAppointmentStore((state) => state.selectDoctor);
  const [Follow] = useMutation(FOLLOW_DOCTOR, {
    refetchQueries: [{
      query: GET_FOLLOWING,
      variables: user?.UserID
    }, {
      query: GET_FOLLOWERS,
      variables: user?.UserID
    }]
  })
  const [unFollow] = useMutation(UNFOLLOW_DOCTOR, {
    refetchQueries: [{
      query: GET_FOLLOWING,
      variables: user?.UserID
    }, {
      query: GET_FOLLOWERS,
      variables: user?.UserID
    }]
  })



  const [followersdata, setFollowersData] = useState<any[]>([]);
  const [followingdata, setFollowingData] = useState<any[]>([]);
  useEffect(() => {
    if (!user) return;
    const getFollowers = async () => {
      const { data: getFollowers } = await client.query({


        query: GET_FOLLOWERS,
        variables: {
          userID: user?.UserID,
        },
      });
      const { data: getFollowing } = await client.query({
        query: GET_FOLLOWING,
        variables: {
          userID: user?.UserID,
        },
      });

      console.log(getFollowers);
      console.log(getFollowing);

      setFollowersData(getFollowers?.GetFollowers);
      setFollowingData(getFollowing?.GetFollowing);
    };
    getFollowers();
  }, [user]);

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
  const handleUnfollow = async (FollowingID: string) => {
    if (!FollowingID || !user.UserID)
      return

    await unFollow({
      variables: {
        FollowerID: user.UserID,
        FollowingID,
      }
    })
  }




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

  const isUserFollowing = (FollowingID: string) => {
    let isFollowing = false
    console.log(FollowingID)
    if (followingdata && followingdata.length > 0)
      followingdata.forEach((following) => {
        if (following.UserID === FollowingID)
          isFollowing = true
        else isFollowing = false
      })

    return isFollowing
  }




  return (
    <div className="flex flex-wrap justify-center mt-3">
      {/* {data.Getdata.map((profile: any) => ( */}
      {items && items.map((profile: any, i: number) => (
        <DoctorProfileCard
          key={profile.UserID}
          id={profile.UserID}
          profilePicture={profile.ProfilePicture}
          name={`${profile.FirstName}  ${profile.LastName}`}
          username={profile.Username}
          type={profile.Role}
          followers={profile.Followers}
          following={profile.Following}
          rating={profile.Rating}
          speciality={profile.Speciality}
          experience={profile.ExperienceYears}
          hourlyRate={profile.ConsultationFee}
          isFollowing={isUserFollowing(profile.UserID)}
          onFollow={() => handleFollow(profile.UserID)}
          onUnFollow={() => handleUnfollow(profile.UserID)}
          onMakeAppointment={handleMakeAppointment}
          profile={profile}
        />
      ))}
    </div>
  );
};

export default TopDoctors;
