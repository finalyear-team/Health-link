"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import UserTable from "@/components/shared/UserTable";
import { GET_USER, GET_USERS } from "@/graphql/queries/userQueries";
import { REGISTER_USER, UPDATE_USER } from "@/graphql/mutations/userMutations";
import { useToast } from "@/components/ui/use-toast";

import UserModal from "@/components/shared/AddUserModal";

const UserTableContainer: React.FC = () => {
  const [registerUser] = useMutation(REGISTER_USER);
  const { toast } = useToast();
  const handleAddUser = async (values: any) => {
    console.log(values);
    try {
      await registerUser({
        variables: {
          RegisterInput: {
            Username: values.username,
            Email: values.email,
            FirstName: values.firstName,
            LastName: values.lastName,
            Gender: values.gender,
            DateOfBirth: values.dateOfBirth,
            PhoneNumber: values.phoneNumber,
            Address: values.address,
            Role: values.userType,
          },
        },
      });

      toast({
        title: "User Registered",
        description: "User registered successfully",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to register user",
      });
    }
  };

  const handleEditUser = (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <div className="flex z-50 items-center justify-between sticky -top-2 bg-white border-b p-2 border-slate-300 dark:bg-slate-950 dark:border-slate-800">
        <p className="text-xl font-bold">User Management</p>
        <UserModal
          initialValues={{
            userType: "patient",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            dateOfBirth: "",
            gender: "",
            medicalLicense: "",
            specialty: "",
            educationLevel: "",
            experianceYear: "",
          }}
          onSubmit={handleAddUser}
        />
      </div>

      <UserTable />
    </div>
  );
};

export default UserTableContainer;
