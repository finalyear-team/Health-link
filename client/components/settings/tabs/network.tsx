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

const Network = ({ value }: { value: string }) => {
  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <CardTitle>Network</CardTitle>
          <CardDescription>Network section</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">this is the Network tab</CardContent>
        <CardFooter>
          <Button>Save password</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default Network;
