// import React from "react";
// import { Slider } from "@/components/ui/slider";
// import { MdOutlineVolumeUp } from "react-icons/md";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const AudioSettings = () => {
//   return (
//     <div className="">
//       <div className="flex gap-1">
//         <MdOutlineVolumeUp size={20} className="cursor-pointer dark:text-slate-900" />
//         <Slider defaultValue={[33]} max={100} step={1} />
//       </div>
//       <div>
//         <Select>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Mode" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="Default">Default</SelectItem>
//             <SelectItem value="Microphone">Microphone</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   );
// };

// export default AudioSettings;

"use client";
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { MdOutlineVolumeUp, MdOutlineVolumeOff } from "react-icons/md";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Volume } from "lucide-react";

const AudioSettings = () => {
  const [volume, setVolume] = useState(33);

  const handleVolumeToggle = () => {
    setVolume((prevVolume) => (prevVolume === 0 ? 33 : 0));
  };

  return (
    <div className="w-[180px] flex">
      {volume != 0 ? (
        <MdOutlineVolumeUp
          size={20}
          className="cursor-pointer dark:text-slate-900"
          onClick={handleVolumeToggle}
        />
      ) : (
        <MdOutlineVolumeOff
          size={20}
          className="cursor-pointer dark:text-slate-900"
          onClick={handleVolumeToggle}
        />
      )}
      <Slider value={[volume]} max={100} step={1} onValueChange={setVolume}/>
    </div>
  );
};

export default AudioSettings;
