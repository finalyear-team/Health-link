"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Star,
  User,
  FileBadge,
  MessageSquareQuote,
  WalletMinimal,
  AlarmClockCheck,
  Activity,
} from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries/userQueries";
import Loading from "@/common/Loader/Loading";

const UserDetail = ({ params }: { params: { id: string } }) => {
  const { data: userData, loading, error } = useQuery(GET_USER, {
    variables: {
      UserID: params.id
    }
  });

  if (loading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  const profileValues = {
    id: userData?.GetUser?.UserID,
    name: `${userData?.GetUser?.FirstName} ${userData?.GetUser?.LastName}`,
    username: userData?.GetUser?.Username,
    speciality: userData?.GetUser?.Speciality,
    experience: userData?.GetUser?.ExperienceYears,
    bio: userData?.GetUser?.Bio,
    education: userData?.GetUser?.EducationalBackground,
    consultationFee: userData?.GetUser?.ConsultationFee,
    availability: "Monday - Friday, 10:00 - 18:00", // Placeholder, adjust as needed
    rating: userData?.GetUser?.Rating,
    patientsConsulted: userData?.GetUser?.Followers || 0, // Assuming Followers as a proxy for consulted patients
  };




  return (
    <div>
      <Header />
      <div className="container mx-auto mt-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="col-span-1 md:col-span-1">
            <CardContent className="flex flex-col items-center space-y-4 p-4">
              <Image
                src={userData?.GetUser?.ProfilePicture || "/image/profile-picture.jpg"}
                width={200}
                height={200}
                alt={profileValues.name || "Profile Picture"}
                className="rounded-full"
              />
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  {profileValues.name}
                </CardTitle>
                <CardDescription>{profileValues.speciality}</CardDescription>
                <p className="text-muted-foreground">
                  {profileValues.experience} years of experience
                </p>
              </CardHeader>
              {/* <div className="flex space-y-2 flex-col items-center">
                <Button variant={"ghost"} className="w-full">
                  Follow
                </Button>
                <Button className="w-full">Make Appointment</Button>
              </div> */}
            </CardContent>
          </Card>
          <Card className="col-span-1 md:col-span-2 space-y-6">
            <CardContent>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <User className="w-6 h-6 mr-2" /> About
                </CardTitle>
                <hr />
              </CardHeader>
              <div className="prose max-w-none">
                <p>{profileValues.bio}</p>
              </div>
            </CardContent>
            <CardContent>
              {/* <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileBadge className="w-6 h-6 mr-2" /> Qualifications
                </CardTitle>
                <hr />
              </CardHeader> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Education</h3>
                  <ul className="space-y-1 px-3 border-l ml-2 dark:border-slate-500 border-slate-300">
                    <li>{profileValues.education}</li>
                  </ul>
                </div>
                {/* You can add more details here if needed */}
              </div>
            </CardContent>
            <CardContent>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MessageSquareQuote className="w-6 h-6 mr-2" /> Patient Reviews
                </CardTitle>
                <hr />
              </CardHeader>
              <div className="space-y-4">
                {/* Sample reviews */}
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="font-medium">Jane Doe</div>
                    </div>
                    <p className="text-muted-foreground">
                      &quot;Dr. Doe is an amazing doctor. He took the time to
                      listen to my concerns and provided excellent care. I
                      highly recommend him.&quot;
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="font-medium">John Smith</div>
                    </div>
                    <p className="text-muted-foreground">
                      &quot;I&apos;ve been seeing Dr. Doe for years and
                      he&apos;s always provided excellent care. He&apos;s
                      knowledgeable, caring, and takes the time to address all
                      of my concerns.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-8 bg-muted p-6 rounded-lg">
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center flex-col justify-center">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <WalletMinimal className="w-6 h-6 mr-2" /> Consultation Fee
                </CardTitle>
              </CardHeader>
              <CardDescription>
                {profileValues.consultationFee ? `${profileValues.consultationFee} Birr/hr` : 'N/A'}
              </CardDescription>
            </div>
            <div className="flex items-center flex-col justify-center">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <AlarmClockCheck className="w-6 h-6 mr-2" /> Availability
                </CardTitle>
              </CardHeader>
              <CardDescription>{profileValues.availability}</CardDescription>
            </div>
            <div className="flex items-center flex-col justify-center">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Star className="w-6 h-6 mr-2" /> Rating
                </CardTitle>
              </CardHeader>
              <CardDescription>{profileValues.rating}</CardDescription>
            </div>
            <div className="flex items-center flex-col justify-center">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Activity className="w-6 h-6 mr-2" /> Patients Consulted
                </CardTitle>
              </CardHeader>
              <CardDescription>
                {profileValues.patientsConsulted}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default UserDetail;
