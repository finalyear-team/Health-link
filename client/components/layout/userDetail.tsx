import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Image from "next/image";

const UserDetail = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/image/profile-picture.jpg"
                width={200}
                height={200}
                alt="Dr. John Doe"
                className="rounded-full"
              />
              <div className="text-center">
                <h1 className="text-2xl font-bold">Dr. John Doe</h1>
                <p className="text-primary font-medium">Family Medicine</p>
                <p className="text-muted-foreground">15 years of experience</p>
              </div>
            </div>
          </div>
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">About</h2>
              <div className="prose max-w-none">
                <p>
                  Dr. John Doe is a highly experienced family medicine physician
                  with a passion for providing comprehensive and personalized
                  care to his patients. With over 15 years of practice, he has
                  developed a deep understanding of the unique needs of
                  individuals and families, and is committed to helping them
                  achieve their best possible health outcomes.
                </p>
                <p>
                  Dr. Doe received his medical degree from the University of
                  California, Los Angeles, and completed his residency training
                  at the prestigious Mayo Clinic. He is board certified in
                  family medicine and is a member of the American Academy of
                  Family Physicians.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Qualifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Education</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>
                      Medical Degree, University of California, Los Angeles
                    </li>
                    <li>Residency, Mayo Clinic</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Certifications</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>Board Certified in Family Medicine</li>
                    <li>Advanced Cardiac Life Support (ACLS)</li>
                    <li>Pediatric Advanced Life Support (PALS)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Languages</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>English</li>
                    <li>Spanish</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Areas of Expertise
                  </h3>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>Family Medicine</li>
                    <li>Preventive Care</li>
                    <li>Chronic Disease Management</li>
                    <li>Women&apos;s Health</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Patient Reviews</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <div className="font-medium">Jane Doe</div>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-4 h-4" />
                        <Star className="w-4 h-4" />
                        <Star className="w-4 h-4" />
                        <Star className="w-4 h-4" />
                        <Star className="w-4 h-4" />
                      </div>
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
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-4 h-4" />
                        <Star className="w-4 h-4" />
                        <Star className="w-4 h-4" />
                        <Star className="w-4 h-4" />
                        <Star className="w-4 h-4" />
                      </div>
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
            </div>
          </div>
        </div>
        <div className="mt-8 bg-muted p-6 rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Consultation Fee</h3>
              <p className="text-2xl font-bold text-primary">$150</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Availability</h3>
              <p className="text-muted-foreground">
                Monday - Friday: 9am - 5pm
                <br />
                Saturday: 10am - 2pm
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Rating</h3>
              <div className="flex items-center space-x-2 text-yellow-500">
                <Star className="w-6 h-6" />
                <Star className="w-6 h-6" />
                <Star className="w-6 h-6" />
                <Star className="w-6 h-6" />
                <Star className="w-6 h-6" />
                <span className="text-2xl font-bold">4.9</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Patients Seen</h3>
              <p className="text-2xl font-bold">2,345</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
