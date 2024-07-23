// "use client";

// import { useState, useMemo } from "react";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuCheckboxItem,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Calendar } from "@/components/ui/calendar";
// import { CalendarDays, Filter, MoveHorizontal } from "lucide-react";

// const AppointmentView = () => {
//   const [appointments, setAppointments] = useState([
//     {
//       id: 1,
//       patient: "John Doe",
//       doctor: "Dr. Jane Smith",
//       date: "2023-06-15",
//       time: "10:00 AM",
//       status: "Confirmed",
//       notes: "Routine checkup",
//     },
//     {
//       id: 2,
//       patient: "Sarah Johnson",
//       doctor: "Dr. Michael Lee",
//       date: "2023-06-17",
//       time: "2:30 PM",
//       status: "Pending",
//       notes: "Follow-up appointment",
//     },
//     {
//       id: 3,
//       patient: "David Williams",
//       doctor: "Dr. Emily Chen",
//       date: "2023-06-20",
//       time: "9:00 AM",
//       status: "Completed",
//       notes: "Annual physical",
//     },
//     {
//       id: 4,
//       patient: "Emily Davis",
//       doctor: "Dr. Robert Kim",
//       date: "2023-06-22",
//       time: "4:45 PM",
//       status: "Canceled",
//       notes: "Rescheduled due to patient emergency",
//     },
//   ]);
//   const [sortBy, setSortBy] = useState("date");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const handleSort = (key: any) => {
//     if (sortBy === key) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(key);
//       setSortOrder("asc");
//     }
//   };
//   const handleFilter = (status: any) => {
//     setFilterStatus(status);
//   };
//   const filteredAppointments = useMemo(() => {
//     let filtered = appointments;
//     if (filterStatus !== "all") {
//       filtered = filtered.filter(
//         (appointment) => appointment.status === filterStatus
//       );
//     }
//     return filtered.sort((a: any, b: any) => {
//       if (sortOrder === "asc") {
//         return a[sortBy] > b[sortBy] ? 1 : -1;
//       } else {
//         return a[sortBy] < b[sortBy] ? 1 : -1;
//       }
//     });
//   }, [appointments, sortBy, sortOrder, filterStatus]);
//   return (
//     <div className="p-6 sm:p-10">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Appointment Management</h1>
//         <div className="flex items-center gap-4">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="flex items-center gap-2"
//               >
//                 <Filter className="w-4 h-4" />
//                 <span>Filter</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuCheckboxItem
//                 checked={filterStatus === "all"}
//                 onCheckedChange={() => handleFilter("all")}
//               >
//                 All
//               </DropdownMenuCheckboxItem>
//               <DropdownMenuCheckboxItem
//                 checked={filterStatus === "Confirmed"}
//                 onCheckedChange={() => handleFilter("Confirmed")}
//               >
//                 Confirmed
//               </DropdownMenuCheckboxItem>
//               <DropdownMenuCheckboxItem
//                 checked={filterStatus === "Pending"}
//                 onCheckedChange={() => handleFilter("Pending")}
//               >
//                 Pending
//               </DropdownMenuCheckboxItem>
//               <DropdownMenuCheckboxItem
//                 checked={filterStatus === "Completed"}
//                 onCheckedChange={() => handleFilter("Completed")}
//               >
//                 Completed
//               </DropdownMenuCheckboxItem>
//               <DropdownMenuCheckboxItem
//                 checked={filterStatus === "Canceled"}
//                 onCheckedChange={() => handleFilter("Canceled")}
//               >
//                 Canceled
//               </DropdownMenuCheckboxItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//       <Card>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead
//                   className="cursor-pointer"
//                   onClick={() => handleSort("patient")}
//                 >
//                   Patient
//                   {sortBy === "patient" && (
//                     <span className="ml-1">
//                       {sortOrder === "asc" ? "\u2191" : "\u2193"}
//                     </span>
//                   )}
//                 </TableHead>
//                 <TableHead
//                   className="cursor-pointer"
//                   onClick={() => handleSort("doctor")}
//                 >
//                   Doctor
//                   {sortBy === "doctor" && (
//                     <span className="ml-1">
//                       {sortOrder === "asc" ? "\u2191" : "\u2193"}
//                     </span>
//                   )}
//                 </TableHead>
//                 <TableHead
//                   className="cursor-pointer"
//                   onClick={() => handleSort("date")}
//                 >
//                   Date
//                   {sortBy === "date" && (
//                     <span className="ml-1">
//                       {sortOrder === "asc" ? "\u2191" : "\u2193"}
//                     </span>
//                   )}
//                 </TableHead>
//                 <TableHead
//                   className="cursor-pointer"
//                   onClick={() => handleSort("time")}
//                 >
//                   Time
//                   {sortBy === "time" && (
//                     <span className="ml-1">
//                       {sortOrder === "asc" ? "\u2191" : "\u2193"}
//                     </span>
//                   )}
//                 </TableHead>
//                 <TableHead
//                   className="cursor-pointer"
//                   onClick={() => handleSort("status")}
//                 >
//                   Status
//                   {sortBy === "status" && (
//                     <span className="ml-1">
//                       {sortOrder === "asc" ? "\u2191" : "\u2193"}
//                     </span>
//                   )}
//                 </TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredAppointments.map((appointment) => (
//                 <TableRow key={appointment.id}>
//                   <TableCell>{appointment.patient}</TableCell>
//                   <TableCell>{appointment.doctor}</TableCell>
//                   <TableCell>{appointment.date}</TableCell>
//                   <TableCell>{appointment.time}</TableCell>
//                   <TableCell>
//                     <Badge
//                       variant={
//                         appointment.status === "Confirmed"
//                           ? "secondary"
//                           : appointment.status === "Pending"
//                           ? "outline"
//                           : appointment.status === "Completed"
//                           ? "success"
//                           : "danger"
//                       }
//                     >
//                       {appointment.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           ...
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem>Reschedule</DropdownMenuItem>
//                         <DropdownMenuItem>Cancel</DropdownMenuItem>
//                         <DropdownMenuItem>Confirm</DropdownMenuItem>
//                         <DropdownMenuItem>Send Notification</DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//       {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Calendar View</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Calendar mode="month" />
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Upcoming Appointments</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid gap-4">
//               {filteredAppointments
//                 .filter((appointment) => appointment.status === "Confirmed")
//                 .slice(0, 3)
//                 .map((appointment) => (
//                   <div
//                     key={appointment.id}
//                     className="flex items-center justify-between"
//                   >
//                     <div className="flex items-center gap-4">
//                       <div className="rounded-full bg-primary-foreground/10 text-primary p-2">
//                         <CalendarDaysIcon className="w-4 h-4" />
//                       </div>
//                       <div>
//                         <div className="font-medium">{appointment.patient}</div>
//                         <div className="text-sm text-muted-foreground">
//                           {appointment.date} at {appointment.time}
//                         </div>
//                       </div>
//                     </div>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="icon">
//                           <MoveHorizontalIcon className="w-4 h-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem>Reschedule</DropdownMenuItem>
//                         <DropdownMenuItem>Cancel</DropdownMenuItem>
//                         <DropdownMenuItem>Confirm</DropdownMenuItem>
//                         <DropdownMenuItem>Send Notification</DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div> */}
//     </div>
//   );
// };

// export default AppointmentView;

"use client";

import { useState, useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
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
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Filter, Frown, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import PageLoader from "@/common/Loader/PageLoader";

const GET_USERS = gql`
  query GetUsers {
    users {
      data {
        id
        name
        username
        email
      }
    }
  }
`;

const AppointmentView = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterStatus, setFilterStatus] = useState("all");

  const handleSort = (key: any) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const handleFilter = (status: any) => {
    setFilterStatus(status);
  };

  const appointments =
    data?.users?.data.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      status: "Confirmed", // Placeholder status
    })) || [];

  const filteredAppointments = useMemo(() => {
    let filtered = appointments;
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (appointment: any) => appointment.status === filterStatus
      );
    }

    return filtered.sort((a: any, b: any) => {
      if (sortOrder === "asc") {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  }, [appointments, sortBy, sortOrder, filterStatus]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <PageLoader />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-2">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold py-2">Appointment Management</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> New Appointment
        </Button>
      </div>
      <div className="flex items-end justify-between mb-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                New User Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+1,234</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+789</div>
              <p className="text-xs text-muted-foreground">
                +10% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+23,456</div>
              <p className="text-xs text-muted-foreground">
                +8% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+145</div>
              <p className="text-xs text-muted-foreground">
                +20% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filterStatus === "all"}
                onCheckedChange={() => handleFilter("all")}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Confirmed"}
                onCheckedChange={() => handleFilter("Confirmed")}
              >
                Confirmed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Pending"}
                onCheckedChange={() => handleFilter("Pending")}
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Completed"}
                onCheckedChange={() => handleFilter("Completed")}
              >
                Completed
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filterStatus === "Canceled"}
                onCheckedChange={() => handleFilter("Canceled")}
              >
                Canceled
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Patient
                  {sortBy === "name" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("username")}
                >
                  Doctor
                  {sortBy === "username" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Date
                  {sortBy === "email" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Time
                  {sortBy === "email" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status
                  {sortBy === "status" && (
                    <span className="ml-1">
                      {sortOrder === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment: any) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.username}</TableCell>
                  <TableCell>{appointment.email}</TableCell>
                  <TableCell>2:15 PM</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        appointment.status === "Confirmed"
                          ? "secondary"
                          : appointment.status === "Pending"
                          ? "outline"
                          : appointment.status === "Completed"
                          ? "success"
                          : "danger"
                      }
                    >
                      {appointment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          ...
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Cancel</DropdownMenuItem>
                        <DropdownMenuItem>Confirm</DropdownMenuItem>
                        <DropdownMenuItem>Send Notification</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredAppointments.length === 0 && (
            <div className="flex p-4 w-full items-center justify-center">
              <div className="flex items-center text-slate-500">
                <Frown className="w-12 h-12 mr-2 " />
                <p className="text-center">No Result Found</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentView;
