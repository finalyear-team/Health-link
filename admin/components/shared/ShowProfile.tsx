import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User } from "lucide-react";
import { GET_USER } from "@/graphql/queries/userQueries";
import { useQuery } from "@apollo/client";

const ShowProfile = (UserID: any) => {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { UserID },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start h-8 p-2"
        >
          <User className="w-4 h-4 mr-2" />
          View Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-[900px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            Detailed information about the user.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <Card className="grid grid-cols-[auto_1fr] gap-6">
            <div className="flex flex-col items-center gap-4 p-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="grid gap-1 text-center">
                <div className="font-semibold">John Doe</div>
                <div className="text-muted-foreground">@johndoe</div>
              </div>
            </div>
            <div className="grid gap-4 p-4">
              <div className="grid grid-cols-[minmax(100px,_1fr)_1fr] gap-x-4 gap-y-2">
                <div className="font-medium text-muted-foreground">
                  User ID:
                </div>
                <div>123456789</div>
                <div className="font-medium text-muted-foreground">Email:</div>
                <div>john.doe@example.com</div>
                <div className="font-medium text-muted-foreground">
                  Date of Birth:
                </div>
                <div>January 1, 1990</div>
                <div className="font-medium text-muted-foreground">Gender:</div>
                <div>Male</div>
              </div>
              <Separator />
              <div className="grid grid-cols-[minmax(100px,_1fr)_1fr] gap-x-4 gap-y-2">
                <div className="font-medium text-muted-foreground">
                  Phone Number:
                </div>
                <div>+1 (555) 555-5555</div>
                <div className="font-medium text-muted-foreground">
                  Address:
                </div>
                <div>123 Main St, Anytown USA</div>
              </div>
              <Separator />
              <div className="grid grid-cols-[minmax(100px,_1fr)_1fr] gap-x-4 gap-y-2">
                <div className="font-medium text-muted-foreground">Bio:</div>
                <div>
                  I&lsquo;m a software engineer with a passion for building
                  innovative web applications. In my free time, I enjoy hiking,
                  reading, and spending time with my family.
                </div>
                <div className="font-medium text-muted-foreground">Role:</div>
                <div>Admin</div>
                <div className="font-medium text-muted-foreground">Status:</div>
                <div>Active</div>
                <div className="font-medium text-muted-foreground">
                  Verified:
                </div>
                <div>Yes</div>
                <div className="font-medium text-muted-foreground">
                  Created At:
                </div>
                <div>June 1, 2023</div>
                <div className="font-medium text-muted-foreground">
                  Updated At:
                </div>
                <div>June 15, 2023</div>
                <div className="font-medium text-muted-foreground">
                  Last Login:
                </div>
                <div>June 20, 2023</div>
              </div>
            </div>
          </Card>
        </div>
        <DialogFooter>
          <div>
            <Button variant="ghost">Close</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShowProfile;
