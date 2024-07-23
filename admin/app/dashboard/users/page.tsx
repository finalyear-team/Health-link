"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import UserTable from "@/components/shared/UserTable";
import { GET_USER, GET_USERS } from "@/graphql/queries/userQueries";
import { User } from "@/types";
import { DELETE_USER, REGISTER_USER } from "@/graphql/mutations/userMutations";
import Loading from "@/common/Loader/Loading";
import PageLoader from "@/common/Loader/PageLoader";
import Pagination from "@/components/shared/Pagination";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddUserModal from "@/components/shared/AddUserModal";

const UserTableContainer: React.FC = () => {

  return (
    <div>
      <div className="flex items-center justify-between sticky top-0 bg-white border-b p-2 border-slate-300 dark:bg-slate-950 dark:border-slate-800">
        <p className="text-xl font-bold">User Management</p>
        <AddUserModal />
      </div>

      <UserTable />
      {/* <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      /> */}
    </div>
  );
};

export default UserTableContainer;
