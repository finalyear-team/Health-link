import React from "react";
import Image from "next/image";
import Button from "./Button";
import {
  MdVerified,
  MdOutlineMedicalServices,
  MdCalendarMonth,
} from "react-icons/md";
import Rating from "./Rating";

interface UserProfile {
  profilePicture: string;
  name: string;
  username: string;
  type: string;
  followers: number;
  following: number;
  rating: number;
  speciality: string;
  experience: number;
  hourlyRate: number;
  onFollow: () => void;
  onMakeAppointment: () => void;
}

const UserProfileCard: React.FC<UserProfile> = ({
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
  onMakeAppointment,
}) => {
  return (
    <div className="top-doctors font-main">
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
              <span className="proffesional-type text-xs font-medium">
                {type}
              </span>
            </div>
          </div>
        </div>
        <div>
          <Button className="follow-btn" type="submit" onClick={onFollow}>
            Follow
          </Button>
        </div>
      </div>
      <div className="mt-4 text-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center font-medium text-xs border-b-2 border-stroke ">
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
            <Rating />
          </span>
        </div>
        <hr className="py-4" />
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
      <div className="mt-4">
        <Button
          className="font-main w-full text-base font-medium rounded-lg text-dark-700 border-2 border-dark-700 border-solid  hover:bg-primary-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          type="submit"
          onClick={onMakeAppointment}
        >
          Make an Appointment
        </Button>
      </div>
    </div>
  );
};

export default UserProfileCard;
