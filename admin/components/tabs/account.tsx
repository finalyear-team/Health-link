"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import PersonalInfoUpdate from "../layout/ui/PersonalInfoUpdate";
import ContactInfoUpdate from "../layout/ui/ContactInfoUpdate";

const Account = ({
  value,
  isPatient,
}: {
  value: string;
  isPatient: boolean;
}) => {
  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          {/* <CardTitle>Account</CardTitle> */}
          <span className="text-primary-700 font-medium">
            Personal Information
          </span>
          <hr />
        </CardHeader>

        <PersonalInfoUpdate />
        <CardHeader>
          <span className="text-primary-700 font-medium">
            Contact Information
          </span>
          <hr />
        </CardHeader>

        <ContactInfoUpdate />
        {/* for accepting the OTP code sent to the email */}
      </Card>
    </TabsContent>
  );
};

export default Account;
