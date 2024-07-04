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

const UserDetail = ({ params }: { params: { username: string } }) => {
  const profileValues = {
    id: 1,
    name: "Dr. John Doe",
    username: "dfsdf",
    speciality: "Family Medicine",
    experiance: 15,
    bio: "Dr. John Doe is a highly experienced family medicine physician with a passion for providing comprehensive and personalized care to his patients.",
    education: "Medical Degree, University of California, Los Angeles",
    certificate: [
      {
        certificateId: "1",
        certificateName: "Board Certified in Family Medicine",
      },
      {
        certificateId: "2",
        certificateName: "Advanced Cardiac Life Support (ACLS)",
      },
      {
        certificateId: "3",
        certificateName: "Pediatric Advanced Life Support (PALS)",
      },
    ],
    consultationFee: 150,
    availabilty: "monday - friday, 10:00 - 18:00",
    rating: 4.5,
    patientsConsulted: 23,
  };
  return (
    <div>
      <Header />
      <div className="container mx-auto mt-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="col-span-1 md:col-span-1">
            <CardContent className="flex flex-col items-center space-y-4 p-4">
              <Image
                src="/image/profile-picture.jpg"
                width={200}
                height={200}
                alt="Dr. John Doe"
                className="rounded-full"
              />
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  {profileValues.name}
                </CardTitle>
                <CardDescription>{profileValues.speciality}</CardDescription>
                <p className="text-muted-foreground">
                  {profileValues.experiance} years of experience
                </p>
              </CardHeader>
              <div className="flex space-y-2 flex-col items-center">
                <Button variant={"ghost"} className="w-full">
                  Follow
                </Button>
                <Button className="w-full">Make Appointment</Button>
              </div>
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
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileBadge className="w-6 h-6 mr-2" /> Qualifications
                </CardTitle>
                <hr />
              </CardHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Education</h3>
                  <ul className="space-y-1 px-3 border-l ml-2 dark:border-slate-500 border-slate-300">
                    <li>{profileValues.education}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Certifications</h3>
                  <ul className="space-y-1 px-3 border-l ml-2 dark:border-slate-500 border-slate-300">
                    {profileValues.certificate.map((certificate) => (
                      <li key={certificate.certificateId}>
                        {certificate.certificateName}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardContent>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MessageSquareQuote className="w-6 h-6 mr-2" /> Patient
                  Reviews
                </CardTitle>
                <hr />
              </CardHeader>
              <div className="space-y-4">
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
                    <AvatarFallback>JD</AvatarFallback>
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
                {profileValues.consultationFee} Birr/hr
              </CardDescription>
            </div>
            <div className="flex items-center flex-col justify-center">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <AlarmClockCheck className="w-6 h-6 mr-2" /> Availability
                </CardTitle>
              </CardHeader>
              <CardDescription>{profileValues.availabilty}</CardDescription>
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
