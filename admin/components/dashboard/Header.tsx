"use client";

import React from "react";
import Profile from "../shared/profile";
import { ModeToggle } from "../shared/toggle";
// import { Command, CommandInput } from "@/components/ui/command";

import Notification from "../shared/notification";
import Setting from "../shared/setting";
import Search from "../shared/search";

const Header = () => {
  const [showResults, setShowResults] = React.useState(false);

  const onFocusHandler = () => {
    setShowResults(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 100);
  };

  return (
    <div className="fixed right-0 z-40 flex w-full items-center justify-end bg-primary-600 dark:bg-primary-700 py-1 px-3 text-sm h-14">
      <span className="w-1/6"></span>
      {/* <div className="db-header-left ml-6">
        <div className="relative w-1/2">
          <Command className="rounded-lg border shadow-md h-fit absolute z-50 -top-6">
            <CommandInput
              placeholder="search..."
              onFocus={onFocusHandler}
              onBlur={handleBlur}
            />
            {showResults ? <Search /> : ""}
          </Command>
        </div>
      </div> */}
      <div className="db-header-right space-x-6 text-white">
        <ModeToggle />

        <Notification />
        <Setting />
        <Profile />
      </div>
    </div>
  );
};

export default Header;
