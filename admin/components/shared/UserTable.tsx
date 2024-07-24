"use client";

import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Check, FilePen, Filter, ListOrdered, Trash, User } from "lucide-react";
import PageLoader from "@/common/Loader/PageLoader";
import useFetchUsers from "@/hooks/useFetchUsers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import UserModal from "./AddUserModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ShowProfile from "./ShowProfile";
import { useMutation } from "@apollo/client";
import { UPDATE_USER, DELETE_USER } from "@/graphql/mutations/userMutations";
import { GET_USER } from "@/graphql/queries/userQueries";
import { useQuery } from "@apollo/client";
import { useToast } from "../ui/use-toast";
import { fetchUserData } from "@/lib/fetchUserData";

const UserTable = () => {
  const { loading, error, users } = useFetchUsers();
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const { toast } = useToast();

  const handleSort = (key: any) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const handleFilter = (role: any, status: any) => {
    setFilterRole(role);
    setFilterStatus(status);
  };

  const filteredUsers = useMemo(() => {
    return users
      .filter((user: any) => {
        if (filterRole && user.Role !== filterRole) return false;
        if (filterStatus && user.Status !== filterStatus) return false;
        return true;
      })
      .sort((a: any, b: any) => {
        if (sortOrder === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
  }, [users, sortBy, sortOrder, filterRole, filterStatus]);

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center mt-8">
        <PageLoader />
      </div>
    );
  if (error)
    return (
      <div className="w-full h-full flex items-center justify-center mt-8">
        Error: {error.message}
        <Button variant={"outline"} onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );

  const doctorsCount = users
    ? users.filter((user: any) => user.Role === "doctor").length
    : 0;
  const patientsCount = users
    ? users.filter((user: any) => user.Role === "patient").length
    : 0;
  const adminsCount = users
    ? users.filter((user: any) => user.Role === "admin").length
    : 0;

  const handleDelete = async (values: any) => {
    console.log(values);
    // await DeleteUser({
    //   variables: { id: values.UserID },
    // })
    //   .then(() => {
    //     toast({
    //       title: "Success",
    //       description: "The User has been deleted successfully",
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error deleting the user: ", error);
    //     toast({
    //       title: "Failed",
    //       description: "Failed to delete the User, try again!",
    //     });
    //   });
  };

  return (
    <div className="w-full mx-auto px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-4">
        <Card className="border-l-4 border-primary-700 h-24">
          <CardHeader className="p-2">
            <CardTitle className="text-lg">Doctors</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-4xl font-bold p-2">
            {doctorsCount}
          </CardContent>
        </Card>
        <Card className="border-l-4 border-secondary-700 h-24">
          <CardHeader className="p-2">
            <CardTitle className="text-lg">Patients</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-4xl font-bold p-2">
            {patientsCount}
          </CardContent>
        </Card>
        <Card className="border-l-4 border-slate-700 h-24">
          <CardHeader className="p-2">
            <CardTitle className="text-lg">Admins</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-4xl font-bold p-2">
            {adminsCount}
          </CardContent>
        </Card>
        <Card className="border-l-4 border-green-700 h-24">
          <CardHeader className="p-2">
            <CardTitle className="text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-4xl font-bold p-2">
            {doctorsCount + patientsCount + adminsCount}
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={filterRole}
                onValueChange={(value) => handleFilter(value, filterStatus)}
              >
                <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="doctor">
                  Doctors
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="patient">
                  Patients
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="admin">
                  Admins
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ListOrdered className="w-4 h-4 mr-2" />
                Sort by
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={(value) => handleSort(value)}
              >
                <DropdownMenuRadioItem value="createdAt">
                  Date
                  {sortBy === "createdAt" && (
                    <span className="ml-2">
                      {sortOrder === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Role">
                  Role
                  {sortBy === "Role" && (
                    <span className="ml-2">
                      {sortOrder === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100 dark:bg-slate-700 cursor-pointer">
            <TableHead onClick={() => handleSort("FirstName")}>
              First Name
              {sortBy === "FirstName" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => handleSort("LastName")}>
              Last Name
              {sortBy === "LastName" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => handleSort("Username")}>
              Username
              {sortBy === "Username" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => handleSort("Email")}>
              Email
              {sortBy === "Email" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => handleSort("Role")}>
              Role
              {sortBy === "Role" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user: any) => (
            <TableRow key={user.UserID}>
              <TableCell>{user.FirstName}</TableCell>
              <TableCell>{user.LastName}</TableCell>
              <TableCell>{user.Username}</TableCell>
              <TableCell>{user.Email}</TableCell>
              <TableCell>
                <Badge variant={user.Role.toLowerCase()}>{user.Role}</Badge>
              </TableCell>

              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      ...
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {/* <DropdownMenuItem> */}
                    <UserModal
                      isEditing
                      initialValues={{
                        userID: user.UserID,
                        userType: user.Role.toLowerCase(),
                        firstName: user.FirstName,
                        lastName: user.LastName,
                        email: user.Email,
                        password: "",
                        confirmPassword: "",
                        dateOfBirth: user.DateOfBirth,
                        phoneNumber: user.PhoneNumber,
                        address: user.Address,
                        specialty: user.Specialty,
                        educationLevel: user.EducationLevel,
                        consultationFee: user.ExperienceYears,
                      }}
                      onSubmit={async (values) => {
                        await updateUser({
                          variables: {
                            updateUserInput: {
                              UserID: user.UserID,
                              FirstName: values.firstName,
                              LastName: values.lastName,
                              Username: values.userName,
                              Email: values.email,
                              PhoneNumber: values.phoneNumber,
                              Address: values.address,
                              // Role: values.userType,
                              // Speciality: values.specialty || "",
                              // ExperienceYears: values.experience || 0,
                              // ConsultationFee: values.consultationFee || 0,
                            },
                          },
                        })
                          .then(() => {
                            toast({
                              title: "Success",
                              description:
                                "The User has been updated successfully",
                            });
                          })
                          .catch((error) => {
                            console.error("Error updating the user: ", error);
                            toast({
                              title: "Failed",
                              description: "Failed to update User, try again!",
                            });
                          });
                      }}
                    />

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full flex items-center justify-start h-8 p-2"
                        >
                          <Trash className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(user)}>
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <ShowProfile UserID={user.UserID} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
