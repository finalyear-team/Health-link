import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { specialties } from "@/public/data/specialities";
import { cn } from "@/lib/utils";
// import useUserStore from "@/store/userStore";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";

const SpecializationPopover = ({
  specializationValue,
  setSpecializationValue,
}: any) => {
  const [open, setOpen] = useState(false);
  // const setUserInformation = useUserStore((state) => state.setUserInformation);
  // const userInformation = useUserStore((state) => state.user);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between overflow-x-hidden"
        >
          {specializationValue
            ? specialties.find(
                (speciality) => speciality.value === specializationValue
              )?.label
            : "Select Specialization..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Specialization..." />
          <CommandEmpty>No specialization found.</CommandEmpty>
          <CommandGroup className="overflow-y-scroll h-[300px]">
            {specialties.map((speciality) => (
              <CommandList key={speciality.value}>
                <CommandItem
                  value={speciality.value}
                  onSelect={(currentValue: any) => {
                    console.log(currentValue);
                    console.log(specializationValue);
                    console.log(currentValue === specializationValue);
                    setSpecializationValue(
                      currentValue === specializationValue ? "" : currentValue
                    );
                    // setUserInformation({
                    //   ...userInformation,
                    //   specialization: currentValue,
                    // });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      specializationValue === speciality.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {speciality.label}
                </CommandItem>
              </CommandList>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SpecializationPopover;
