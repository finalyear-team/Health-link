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

const UserTable = () => {
  const { loading, error, users } = useFetchUsers();

  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

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
                <DropdownMenuRadioItem value="Doctor">
                  Doctors
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Patient">
                  Patients
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Admin">
                  Admins
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={filterStatus}
                onValueChange={(value) => handleFilter(filterRole, value)}
              >
                <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Active">
                  Active
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Inactive">
                  Inactive
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
          <TableRow>
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
                    <DropdownMenuItem>
                      <FilePen className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Check className="w-4 h-4 mr-2" />
                      Activate
                    </DropdownMenuItem>
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
