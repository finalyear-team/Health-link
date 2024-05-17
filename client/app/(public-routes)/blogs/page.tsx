import React from "react";
import UnderConstruction from "@/components/under-construction/Under-construction";
import { Button } from "@/components/ui/button";
import { MdOutlineSearch, MdOutlineArrowForward } from "react-icons/md";

const Blogs = () => {
  return (
    <div>
      <UnderConstruction />
      <Button>
        <MdOutlineSearch className="mr-2 h-4 w-4" /> Login with Email
      </Button>
    </div>
  );
};

export default Blogs;
