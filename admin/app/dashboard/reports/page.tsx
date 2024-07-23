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
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import PageLoader from "@/common/Loader/PageLoader";
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
import { Input2 } from "@/components/ui/input2";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

const GET_REPORTS = gql`
  query GetReports {
    posts(options: { paginate: { page: 1, limit: 10 } }) {
      data {
        id
        title
        body
        user {
          name
          email
        }
      }
    }
  }
`;

const Report = () => {
  const { loading, error, data } = useQuery(GET_REPORTS);

  const [reports, setReports] = useState([
    {
      id: "REP001",
      type: "Post",
      reason: "Inappropriate content",
      reporterName: "John Doe",
      reporterEmail: "john@example.com",
      creatorName: "Jane Smith",
      creatorEmail: "jane@example.com",
      createdAt: "2023-06-15",
      status: "Pending",
      notes: "",
    },
    {
      id: "REP002",
      type: "Comment",
      reason: "Harassment",
      reporterName: "Sarah Lee",
      reporterEmail: "sarah@example.com",
      creatorName: "Michael Johnson",
      creatorEmail: "michael@example.com",
      createdAt: "2023-06-12",
      status: "Resolved",
      notes: "User warned, content deleted",
    },
    {
      id: "REP003",
      type: "Forum",
      reason: "Misinformation",
      reporterName: "David Kim",
      reporterEmail: "david@example.com",
      creatorName: "Emily Chen",
      creatorEmail: "emily@example.com",
      createdAt: "2023-06-10",
      status: "Pending",
      notes: "",
    },
    {
      id: "REP004",
      type: "Post",
      reason: "Copyright infringement",
      reporterName: "Lisa Park",
      reporterEmail: "lisa@example.com",
      creatorName: "Alex Tan",
      creatorEmail: "alex@example.com",
      createdAt: "2023-06-08",
      status: "Resolved",
      notes: "Content removed, creator warned",
    },
  ]);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const handleSort = (key: any) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };
  const handleFilter = (type: any, status: any) => {
    setFilterType(type);
    setFilterStatus(status);
  };
  const filteredReports = useMemo(() => {
    return reports
      .filter((report) => {
        if (filterType && report.type !== filterType) return false;
        if (filterStatus && report.status !== filterStatus) return false;
        return true;
      })
      .sort((a: any, b: any) => {
        if (sortOrder === "asc") {
          return a[sortBy] > b[sortBy] ? 1 : -1;
        } else {
          return a[sortBy] < b[sortBy] ? 1 : -1;
        }
      });
  }, [reports, sortBy, sortOrder, filterType, filterStatus]);

  if (loading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <PageLoader />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Reported Content</h1>
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
                value={filterType}
                onValueChange={(value) => handleFilter(value, filterStatus)}
              >
                <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Post">
                  Posts
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Comment">
                  Comments
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Forum">
                  Forum Entries
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={filterStatus}
                onValueChange={(value) => handleFilter(filterType, value)}
              >
                <DropdownMenuRadioItem value="">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Pending">
                  Pending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Resolved">
                  Resolved
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
                <DropdownMenuRadioItem value="type">
                  Type
                  {sortBy === "type" && (
                    <span className="ml-2">
                      {sortOrder === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="status">
                  Status
                  {sortBy === "status" && (
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
            <TableHead onClick={() => handleSort("id")}>
              Report ID
              {sortBy === "id" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => handleSort("type")}>
              Type
              {sortBy === "type" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => handleSort("reason")}>
              Reason
              {sortBy === "reason" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => handleSort("reporterName")}>
              Reporter
              {sortBy === "reporterName" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => handleSort("creatorName")}>
              Creator
              {sortBy === "creatorName" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => handleSort("createdAt")}>
              Date
              {sortBy === "createdAt" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead onClick={() => handleSort("status")}>
              Status
              {sortBy === "status" && (
                <span className="ml-2">
                  {sortOrder === "asc" ? "\u2191" : "\u2193"}
                </span>
              )}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.type}</TableCell>
              <TableCell>{report.reason}</TableCell>
              <TableCell>
                <Link href="#" prefetch={false}>
                  {report.reporterName}
                </Link>
              </TableCell>
              <TableCell>
                <Link href="#" prefetch={false}>
                  {report.creatorName}
                </Link>
              </TableCell>
              <TableCell>{report.createdAt}</TableCell>
              <TableCell>
                <Badge
                // variant={report.status === "Pending" ? "warning" : "success"}
                >
                  {report.status}
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
                    <DropdownMenuItem>
                      <FilePen className="w-4 h-4 mr-2" />
                      Review
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="w-4 h-4 mr-2" />
                      Warn User
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Check className="w-4 h-4 mr-2" />
                      Resolve
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody>
          {data.posts.data.map((report: any) => (
            <TableRow key={report.id}>
              <TableCell>{report.id}</TableCell>
              <TableCell>{report.title}</TableCell>
              <TableCell>{report.body}</TableCell>
              <TableCell>
                <Link href="#" prefetch={false}>
                  {report.user.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link href="#" prefetch={false}>
                  {report.user.email}
                </Link>
              </TableCell>
              <TableCell>placeholder</TableCell>
              <TableCell>
                <Badge
                // variant={report.status === "Pending" ? "warning" : "success"}
                >
                  {/* {report.status} */}
                  Resolved
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
                    {/* ============================== */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className="p-2 w-full flex justify-start"
                        >
                          <FilePen className="w-4 h-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="sm:max-w-[900px]">
                        <DialogHeader>
                          <DialogTitle>Report Detail</DialogTitle>
                          <DialogDescription>
                            Please fill out the form to create account.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-6 sm:p-8 bg-background rounded-lg shadow-lg">
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-start gap-4">
                              <Avatar>
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>R</AvatarFallback>
                              </Avatar>
                              <div className="grid gap-1">
                                <div className="font-semibold">
                                  Olivia Davis
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  olivia@healthlink.com
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Reported Content
                                </div>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              <time dateTime="2023-06-23T14:30:00">
                                June 23, 2023 2:30 PM
                              </time>
                            </div>
                          </div>
                          <div className="grid gap-6">
                            <div>
                              <h2 className="text-lg font-semibold mb-2">
                                Report Details
                              </h2>
                              <div className="text-sm text-muted-foreground">
                                Inappropriate content: The reported post
                                contained explicit language and images that were
                                not suitable for the platform.
                              </div>
                            </div>
                            <div>
                              <h2 className="text-lg font-semibold mb-2">
                                Report Context
                              </h2>
                              <div className="grid gap-4">
                                <div className="flex items-start gap-4">
                                  <Avatar>
                                    <AvatarImage src="/placeholder-user.jpg" />
                                    <AvatarFallback>C</AvatarFallback>
                                  </Avatar>
                                  <div className="grid gap-1">
                                    <div className="font-semibold">
                                      Emma Brown
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      emma@healthlink.com
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      Content Creator
                                    </div>
                                  </div>
                                </div>
                                <div className="grid gap-4">
                                  <div className="bg-muted/20 p-4 rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <Avatar>
                                          <AvatarImage src="/placeholder-user.jpg" />
                                          <AvatarFallback>U1</AvatarFallback>
                                        </Avatar>
                                        <div className="font-semibold">
                                          Liam Johnson
                                        </div>
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        <time dateTime="2023-06-23T14:15:00">
                                          2:15 PM
                                        </time>
                                      </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      This post is completely unacceptable. I'm
                                      reporting it immediately.
                                    </div>
                                  </div>
                                  <div className="bg-muted/20 p-4 rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <Avatar>
                                          <AvatarImage src="/placeholder-user.jpg" />
                                          <AvatarFallback>U2</AvatarFallback>
                                        </Avatar>
                                        <div className="font-semibold">
                                          Noah Williams
                                        </div>
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        <time dateTime="2023-06-23T14:20:00">
                                          2:20 PM
                                        </time>
                                      </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      I agree, this content is completely
                                      unacceptable. The platform should take
                                      immediate action.
                                    </div>
                                  </div>
                                  <div className="bg-muted/20 p-4 rounded-lg">
                                    <div className="flex items-start justify-between mb-2">
                                      <div className="flex items-center gap-2">
                                        <Avatar>
                                          <AvatarImage src="/placeholder-user.jpg" />
                                          <AvatarFallback>U3</AvatarFallback>
                                        </Avatar>
                                        <div className="font-semibold">
                                          Olivia Smith
                                        </div>
                                      </div>
                                      <div className="text-sm text-muted-foreground">
                                        <time dateTime="2023-06-23T14:25:00">
                                          2:25 PM
                                        </time>
                                      </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      I'm glad this was reported. The content
                                      was completely inappropriate and
                                      unacceptable.
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h2 className="text-lg font-semibold mb-2">
                                Admin Actions
                              </h2>
                              <div className="grid gap-4">
                                <div>
                                  <Label htmlFor="notes">Add Notes</Label>
                                  <Textarea
                                    id="notes"
                                    placeholder="Enter your notes here..."
                                    className="mt-1"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button variant="outline">
                                    Contact Reporter
                                  </Button>
                                  <Button variant="outline">
                                    Contact Content Creator
                                  </Button>
                                  <Button variant="destructive">
                                    Delete Content
                                  </Button>
                                  <Button variant="secondary">
                                    Resolve Report
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Register</Button>
                          <DialogClose asChild>
                            <Button type="button" variant={"outline"}>
                              Cancel
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    {/* ============================== */}
                    <Button
                      variant={"ghost"}
                      className="p-2 w-full flex justify-start"
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                    <Button
                      variant={"ghost"}
                      className="p-2 w-full flex justify-start"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Warn User
                    </Button>
                    <Button
                      variant={"ghost"}
                      className="p-2 w-full flex justify-start"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Resolve
                    </Button>
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

export default Report;
