"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MdVerified,
  MdOutlineMedicalServices,
  MdCalendarMonth,
} from "react-icons/md";
import Rating from "./Rating";
import { DoctorProfile } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useAuth from "@/hooks/useAuth";
import { GET_FOLLOWERS, GET_FOLLOWING } from "@/graphql/queries/userQueries";
import client from "@/graphql/apollo-client";

const DoctorProfileCard: React.FC<DoctorProfile> = ({
  id,
  profilePicture,
  name,
  username,
  type,
  followers,
  following,
  rating,
  speciality,
  experience,
  hourlyRate,
  onUnFollow,
  onFollow,
  onMakeAppointment = (profile: DoctorProfile) => { },
  profile,
  isFollowing,
}) => {
  const [followersdata, setFollowersData] = useState<any[]>([]);
  const [followingdata, setFollowingData] = useState<any[]>([]);
  const { user } = useAuth()
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

  console.log("from pop overz")
  console.log(followingdata)

  return (
    <div className="top-doctors flex flex-col justify-between hover:shadow-lg border border-stroke">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center justify-center flex-nowrap">
          <Avatar>
            <AvatarImage src={profilePicture || "/placeholder-profile.jpg"} />
            <AvatarFallback>
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="mt-2 ml-2  ">
            <div className="flex items-center justify-center w-full">
              <h3 className="text-lg font-semibold">{name}</h3>
              <span>
                <MdVerified size={20} className="text-secondary-600 ml-2" />
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <p className="text-gray-500">@{username}</p>
              <span className="proffesional-type text-sm font-medium">
                {type}
              </span>
            </div>
          </div>
        </div>
        <div>
          {
            isFollowing ?
              <Button variant={"follow"} type="submit" onClick={onUnFollow}>
                Unfollow
              </Button> :
              <Button variant={"follow"} type="submit" onClick={onFollow}>
                Follow
              </Button>
          }

        </div>
      </div>
      <div className="mt-4 text-sm flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center font-medium text-sm ">
            <div className="">
              <p className="font-bold text-lg mr-2"> {followers} </p>
              <p> Followers</p>
            </div>

            <div className="px-4">
              <p className="font-bold text-lg"> {following}</p>
              <p>Following</p>
            </div>
          </div>
          <span>
            {/* <Rating value={rating} /> */}
          </span>
        </div>
        {/* <span className="py-4"> {""} </span> */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center justify-evenly flex-nowrap ">
              <span className="icon-gap">
                <MdOutlineMedicalServices />
              </span>
              {speciality}
            </div>
            <div className="flex items-center flex-nowrap ">
              <span className="icon-gap">
                <MdCalendarMonth />
              </span>
              {experience} years{" "}
            </div>
          </div>
          <span className="proffesional-type text-2xl font-semibold shadow-sm">
            {/* {hourlyRate} Br/hr */}
          </span>
        </div>
      </div>
      <div className="mt-4 w-full flex justify-center items-center">
        <Button
          variant={"outline"}
          className="w-full"
          type="submit"
          onClick={() => {
            if (profile) {
              onMakeAppointment(profile);
            }
          }}
        >
          Make an Appointment
        </Button>
      </div>
    </div>
  );
};

export default DoctorProfileCard;
