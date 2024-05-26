import SocialMediaCard from "@/components/layout/feed-card";
import ProfileHeader from "@/components/layout/profile-header";

const HomePage = () => {
  const dummyText =
    "Today, I had the pleasure of speaking at the annual Healthcare Innovation Summit. We discussed the future of telemedicine and its potential to revolutionize patient care. Excited to see how new technologies will continue to improve healthcare outcomes. Thank you to everyone who attended and participated in the discussion!";
  return (
    <div className="min-h-screen relative flex justify-center space-x-3">
      {/* left side */}
      <SocialMediaCard
        profilePicture="https://via.placeholder.com/150"
        name="Dr. John Doe"
        isVerified={true}
        username="johndoe"
        userType="Doctor"
        postContent={dummyText}
        postImage="https://via.placeholder.com/600"
      />
      {/* right side */}
      <div className="flex flex-col max-w-lg p-4 border border-slate-200 shadow-sm dark:border-slate-500 rounded-lg sticky dark:bg-slate-900">
        <h1 className="text-xl font-bold mb-4">Featured Doctors</h1>
        <div className="flex flex-col items-start space-y-2">
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
          <ProfileHeader
            profilePicture="https://via.placeholder.com/150"
            name="Dr. John Doe"
            isVerified={true}
            username="johndoe"
            userType="Doctor"
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
