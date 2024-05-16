"use client";

import React from "react";
import {
  MdNotificationsNone,
  MdOutlineCalendarMonth,
  MdOutlineSettings,
  MdOutlineSearch,
} from "react-icons/md";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Formik, Form } from "formik";
import Link from "next/link";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  const initialValues = {
    header_search: "",
  };

  // handilng the submit
  const handleSubmit = (values: any, { setSubmitting, resetForm }: any) => {
    console.log("Search Values:", values);
    setSubmitting(false);
    resetForm();
  };

  return (
    <div className="fixed right-0 flex w-full items-center justify-end bg-primary-600 py-1 px-3 text-sm ">
      <span className="w-1/6"></span>
      <div className="db-header-left ml-6">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isValid, isSubmitting }) => (
            <Form className="relative w-1/2" action="#" method="POST">
              <Input name="header_search" type="text" placeholder="Search" />
              <Button
                type="submit"
                variant={"ghost"}
                size={"sm"}
                className="absolute top-1/2 transform -translate-y-1/2 right-2 cursor-pointer text-gray-700"
              >
                <MdOutlineSearch size={20} />
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <TooltipProvider>
        <div className="db-header-right space-x-6 text-white">
          <div className="flex items-center">
            <Switch id="darkMode" aria-setsize={20}/>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <MdOutlineCalendarMonth size={20} />
            </TooltipTrigger>
            <TooltipContent>Appointment</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <MdNotificationsNone size={20} />
            </TooltipTrigger>
            <TooltipContent>Notification</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <MdOutlineSettings size={20} />
            </TooltipTrigger>
            <TooltipContent>Setting</TooltipContent>
          </Tooltip>
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </TooltipProvider>
    </div>
  );
};

export default Header;
