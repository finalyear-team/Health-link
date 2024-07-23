"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/types";
import { Input2 } from "../ui/input2";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Clock, Lock, Pencil, Trash } from "lucide-react";

interface UserTableProps {
  users: User[];
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "UserName",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "website",
    header: "Website",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="empty">...</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 cursor-pointer">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => console.log("Edit user ID:", row.original.id)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => console.log("Delete user ID:", row.original.id)}
          >
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => console.log("Suspend user ID:", row.original.id)}
          >
            <Clock className="mr-2 h-4 w-4" />
            <span>Suspend this user</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() =>
              console.log("Restrict permissions user ID:", row.original.id)
            }
          >
            <Lock className="mr-2 h-4 w-4" />
            <span>Restrict Permissions</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [doctors, setDoctors] = useState(0);
  const [patients, setPatients] = useState(0);
  const [admins, setAdmins] = useState(0);

  const table = useReactTable({
    data: users,
    columns,
    pageCount: 1,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex: 0, pageSize: 5 },
    },
  });

  return (
    <div className="w-full my-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-l-4 border-primary-700 h-24">
          <CardHeader className="p-2">
            <CardTitle className="text-lg">Doctors</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-4xl font-bold p-2">
            {doctors}
          </CardContent>
        </Card>
        <Card className="border-l-4 border-secondary-700 h-24">
          <CardHeader className="p-2">
            <CardTitle className="text-lg">Patients</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-4xl font-bold p-2">
            {patients}
          </CardContent>
        </Card>
        <Card className="border-l-4 border-slate-700 h-24">
          <CardHeader className="p-2">
            <CardTitle className="text-lg">Admins</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-4xl font-bold p-2">
            {admins}
          </CardContent>
        </Card>
        <Card className="border-l-4 border-green-700 h-24">
          <CardHeader className="p-2">
            <CardTitle className="text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-4xl font-bold p-2">
            {doctors + patients + admins}
          </CardContent>
        </Card>
      </div>
      <div className="flex items-center space-x-2 py-4">
        <Input2
          placeholder="Filter Names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
        <Input2
          placeholder="Filter Emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />

        <Input2
          placeholder="Filter UserName..."
          value={
            (table.getColumn("username")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("username")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
        <Input2
          placeholder="Filter Phone..."
          value={(table.getColumn("phone")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("phone")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTable;
