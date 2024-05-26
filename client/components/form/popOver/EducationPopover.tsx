import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { medicalQualifications } from "@/public/data/specialities";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const EducationPopover = ({ educationValue, setEducationValue }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between overflow-x-hidden"
        >
          {educationValue
            ? medicalQualifications.find(
                (qualified) => qualified.value === educationValue
              )?.label
            : "Select Degree..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search Degrees..." />
          <CommandEmpty>No Degree found.</CommandEmpty>
          <CommandGroup>
            {medicalQualifications.map((qualified) => (
              <CommandList key={qualified.value}>
                <CommandItem
                  value={qualified.value}
                  onSelect={(currentValue: any) => {
                    setEducationValue(
                      currentValue === educationValue ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      educationValue === qualified.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {qualified.label}
                </CommandItem>
              </CommandList>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default EducationPopover;
