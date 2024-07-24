"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, FilePen, Loader2, Plus } from "lucide-react";
import { Formik, Form } from "formik";
import SpecializationPopover from "./popOver/SpecializationPopover";
import EducationPopover from "./popOver/EducationPopover";

interface UserModalProps {
  isEditing?: boolean;
  initialValues: any;
  onSubmit: (values: any) => void;
}

const UserModal: React.FC<UserModalProps> = ({
  isEditing = false,
  initialValues,
  onSubmit,
}) => {
  const [userType, setUserType] = useState(initialValues.userType || "patient");
  const [gender, setGender] = useState(initialValues.gender || "");
  const [specializationValue, setSpecializationValue] = useState(
    initialValues.specialty || ""
  );
  const [educationValue, setEducationValue] = useState(
    initialValues.educationLevel || ""
  );

  useEffect(() => {
    setUserType(initialValues.userType || "patient");
    setGender(initialValues.gender || "");
    setSpecializationValue(initialValues.specialty || "");
    setEducationValue(initialValues.educationLevel || "");
  }, [initialValues]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={`${isEditing ? "ghost" : "default"}`}
          className={`${
            isEditing ? "w-full flex items-center justify-start h-8 p-2" : ""
          }`}
        >
          {isEditing ? (
            <FilePen className="w-4 h-4 mr-2" />
          ) : (
            <Plus className="w-5 h-5" />
          )}{" "}
          {isEditing ? "Edit" : "Add User"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit User" : "Register"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update the user details below."
              : "Please fill out the form to create account."}
          </DialogDescription>
        </DialogHeader>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isValid, isSubmitting }) => (
            <Form className="mt-8 space-y-6" action="#" method="POST">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Enter Last Name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="">
                  <Label>User Type</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {userType}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Select User Type</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={userType}
                        onValueChange={setUserType}
                      >
                        <DropdownMenuRadioItem value="patient">
                          Patient
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="doctor">
                          Doctor
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="admin">
                          Admin
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    name="username"
                    label="UserName"
                    type="text"
                    placeholder="Enter UserName"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    name="address"
                    type="text"
                    label="Address"
                    placeholder="Enter Address"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <Label>Gender</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                      >
                        {gender}
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Select Gender</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup
                        value={gender}
                        onValueChange={setGender}
                      >
                        <DropdownMenuRadioItem value="male">
                          Male
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="female">
                          Female
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2">
                  <Input
                    name="phoneNumber"
                    label="Phone Number"
                    type="number"
                    placeholder="Enter Phone Number"
                  />
                </div>
              </div>

              {userType === "patient" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        name="dateOfBirth"
                        type="date"
                        label="Date of Birth"
                        placeholder="Enter Date of Birth"
                      />
                    </div>
                  </div>
                </>
              )}
              {userType === "doctor" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Input
                        name="licenseNumber"
                        label="License Number"
                        type="number"
                        placeholder="Enter License Number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        name="experience"
                        type="number"
                        label="Experience"
                        placeholder="Enter Experience"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <SpecializationPopover
                        specializationValue={specializationValue}
                        setSpecializationValue={setSpecializationValue}
                      />
                    </div>
                    <div className="space-y-2">
                      <EducationPopover
                        educationValue={educationValue}
                        setEducationValue={setEducationValue}
                      />
                    </div>
                  </div>
                </>
              )}
              {!isEditing && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      name="password"
                      type="password"
                      label="Password"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>
              )}

              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isEditing ? "Update" : "Register"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant={"outline"}>
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
