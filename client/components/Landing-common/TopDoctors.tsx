import React from 'react'
import Image from 'next/image';
import users from '@/public/data/users';
import UserProfileCard from '../shared/PopUpProfile';

const TopDoctors = () => {

  const handleFollow = () => {
    // handle follow logic
  };

  const handleMakeAppointment = () => {
    // handle appointment logic
  };

  return (
    <div className="flex flex-wrap justify-center mt-3">
    {users.map((profile) => (
      <UserProfileCard
        key={profile.id}
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
      />
    ))}
  </div>
  )
}

export default TopDoctors