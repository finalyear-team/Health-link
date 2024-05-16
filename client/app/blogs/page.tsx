import React from "react";
import UnderConstruction from "@/component/Under-construction";
import { Header, Footer } from "@/component";
import { Button } from "@/components/ui/button";
import { MdOutlineSearch, MdOutlineArrowForward } from "react-icons/md";

const Blogs = () => {
  return (
    <div>
      <Header />

      <UnderConstruction />
      <Button>
        <MdOutlineSearch className="mr-2 h-4 w-4" /> Login with Email
      </Button>
      <Footer />
    </div>
  );
};

export default Blogs;
