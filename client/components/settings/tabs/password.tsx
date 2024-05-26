"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Password = ({ value }: { value: string }) => {
    return(
        <TabsContent value={value}>
        <Card>
          <CardHeader>
            <CardTitle>Passwords</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos; ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            this is the content of the password tab
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    )
}

export default Password