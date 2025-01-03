import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  MdVerified,
  MdOutlineMedicalServices,
  MdCalendarMonth,
} from "react-icons/md";
import Rating from "./Rating";
import { DoctorProfile } from "@/types";

const DoctorProfileCard: React.FC<DoctorProfile> = ({
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
  onFollow,
  onMakeAppointment = (profile: DoctorProfile) => { },
  profile,
}) => {
  return (
    <div className="top-doctors flex flex-col justify-between hover:shadow-lg border border-stroke">
      <div className="flex items-center justify-between flex-wrap">
        <div className="flex items-center justify-center flex-nowrap">
          <Image
            src={profilePicture}
            alt={`${name}'s profile`}
            className="profile-image"
            width={50}
            height={50}
          />
          <div className="mt-2 ml-2">
            <div className="flex items-center justify-center">
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
          <Button variant={"follow"} type="submit" onClick={onFollow}>
            Follow
          </Button>
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
            <Rating value={rating} />
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
            {hourlyRate} Br/hr
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
