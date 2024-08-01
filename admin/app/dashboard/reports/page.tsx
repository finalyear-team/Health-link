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
      </Table>
    </div>
  );
};

export default Report;
