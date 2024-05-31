"use client";

import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface CountdownTimerProps {
  targetTime: string;
}

interface TimeLeft {
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTime }) => {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [targetTime]);

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    const value = timeLeft[interval as keyof TimeLeft];
    if (!value) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {value} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="text-center text-lg font-semibold text-slate-600 dark:text-slate-300">
      {timerComponents.length ? (
        timerComponents
      ) : (
        <div className="w-[250px] flex items-center justify-center space-x-2 flex-wrap text-sm text-slate-600 dark:text-slate-300">
          You can Join the Consultation Now.{" "}
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
      )}
    </div>
  );
};

export default CountdownTimer;
