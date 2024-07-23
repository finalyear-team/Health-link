"use client";

import React, { useState } from "react";
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
import { Select } from "@/components/ui/select";
import { ChevronDown, Loader2, Plus } from "lucide-react";
import { Formik, Form } from "formik";
import Link from "next/link";
import SpecializationPopover from "./popOver/SpecializationPopover";
import EducationPopover from "./popOver/EducationPopover";

const AddUserModal = () => {
  const [userType, setUserType] = useState("patient");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [insuranceNumber, setInsuranceNumber] = useState("");
  const [medicalLicense, setMedicalLicense] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [department, setDepartment] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [specializationValue, setSpecializationValue] = useState("");
  const [educationValue, setEducationValue] = useState("");
  const handleSubmit = (values: any) => {
    console.log(values);
    // setShowConfirmation(true);
    // setFirstName("");
    // setLastName("");
    // setEmail("");
    // setPassword("");
    // setConfirmPassword("");
    // setDateOfBirth("");
    // setGender("");
    // setInsuranceNumber("");
    // setMedicalLicense("");
    // setSpecialty("");
    // setYearsOfExperience("");
    // setEmployeeId("");
    // setDepartment("");
  };
  const initialValues = {
    userType,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender,
    insuranceNumber: "",
    medicalLicense: "",
    specialty: specializationValue,
    educationLevel: educationValue,
    yearsOfExperience: "",
    employeeId: "",
    department: "",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-5 h-5" /> Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Please fill out the form to create account.
          </DialogDescription>
        </DialogHeader>
        {/* <form onSubmit={handleSubmit} className="grid gap-4">

        </form> */}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          // validationSchema={validationSchemaPersInfo}
          // enableReinitialize
        >
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
              <div className="space-y-2">
                <Input
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter Email"
                />
              </div>
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
              <div className="space-y-2">
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
                    <div className="space-y-2">
                      <div className="space-y-1">
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
                            <DropdownMenuLabel>SelectGender</DropdownMenuLabel>
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
                    </div>
                  </div>
                </>
              )}
              {userType === "doctor" && (
                <>
                  <div className="space-y-2">
                    <Input
                      name="licenseNumber"
                      label="License Number"
                      type="number"
                      placeholder="Enter License Number"
                    />
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
                    <div className="space-y-2">
                      <Input
                        name="experience"
                        type="number"
                        label="Experiance"
                        placeholder="Enter experiance"
                      />
                    </div>
                  </div>
                </>
              )}
              {userType === "admin" && (
                <>
                  <div className="space-y-2">
                    <Input
                      name="employeeId"
                      type="text"
                      label="Employee ID"
                      placeholder="Enter Employee ID"
                    />
                  </div>
                </>
              )}
              <DialogFooter>
                <Button type="submit">Register</Button>
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

export default AddUserModal;
