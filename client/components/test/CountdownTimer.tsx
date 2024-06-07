"use client";

import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Timer } from "lucide-react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetTime: string;
  expire: boolean;
}

interface TimeLeft {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetTime,
  expire,
}) => {
  // calculate the remaing time
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetTime) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  // change the timeleft whenver the targettime changes
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const timerComponents: JSX.Element[] = [];

  // Add hours, minutes, seconds to timer
  Object.keys(timeLeft).forEach((interval, index) => {
    const value = timeLeft[interval as keyof typeof timeLeft];
    if (!value) {
      return;
    }

    // Only include hour, minute, and second values with framer-motion animations
    if (
      interval === "days" ||
      interval === "hours" ||
      interval === "minutes" ||
      interval === "seconds"
    ) {
      timerComponents.push(
        <motion.span
          key={value}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 1 }}
          className="flex items-center space-x-1"
        >
          {value} {index < 2 && ":"}
        </motion.span>
      );
    }
  });

  return (
    <div className="text-center text-lg font-semibold text-slate-600 dark:text-slate-300">
      {timerComponents.length ? (
        <div className="flex items-center space-x-3">
          <Timer className="h-5 w-5" /> {timerComponents} <span> Left</span>{" "}
        </div>
      ) : !expire ? (
        <div className="w-[250px] flex items-center justify-center space-x-2 flex-wrap text-sm text-slate-600 dark:text-slate-300">
          You can Now Join the Video Consultation.{" "}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[250px] text-xs">
                  Please make sure you are in a quiet, private location with a
                  stable internet connection.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <div className="text-sm"> The Live Consultation has ended. </div>
      )}
    </div>
  );
};

export default CountdownTimer;
