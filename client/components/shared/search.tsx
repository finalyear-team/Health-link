import React from "react";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import {
  MdOutlineCalendarMonth,
  MdOutlineSettings,
  MdOutlineMarkUnreadChatAlt,
  MdOutlineForum,
} from "react-icons/md";

import { CreditCard, User } from "lucide-react";

const Search = () => {
  return (
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem>
          <MdOutlineCalendarMonth size={15} className="mr-2" />
          <span>Appointment</span>
        </CommandItem>
        <CommandItem>
          <MdOutlineMarkUnreadChatAlt size={15} className="mr-2" />
          <span>Chat</span>
        </CommandItem>
        {/* <CommandItem>
          <MdOutlineForum size={15} className="mr-2" />
          <span>Forum</span>
        </CommandItem> */}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="Settings">
        <CommandItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </CommandItem>
        {/* <CommandItem>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </CommandItem> */}
        <CommandItem>
          <MdOutlineSettings size={15} className="mr-2" />
          <span>Settings</span>
        </CommandItem>
      </CommandGroup>
    </CommandList>
  );
};

export default Search;
