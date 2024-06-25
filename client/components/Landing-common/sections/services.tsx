"use client";
import { useState, useEffect, useRef } from "react";
import React from "react";
import features from "@/public/data/feature";
import Features from "../Features";
import { Lightbulb } from "lucide-react";

const Service = () => {
  const cards = [1, 2, 3, 4, 5, 6];
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 3000); // Change card every 3 seconds

    return () => clearInterval(interval);
  }, [cards.length]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollLeft = currentIndex * (350 + 16); // Card width (350px) + margin (2 * 8px)
      scrollContainerRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);
  return (
    <section className="w-full py-6 ">
      <div className="w-full flex items-center justify-center mb-2 text-2xl font-bold text-center px-3 text-primary-600 dark:text-primary-700 sticky top-11 bg-slate-800">
        <Lightbulb className="w-6 h-6 mr-2" /> Features
      </div>
      <div className="container px-4 md:px-6">
        <div className="space-y-2 flex flex-col items-center justify-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary-foreground">
            Comprehensive Medical Care at Your Fingertips
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            HealthLink offers a wide range of medical services to meet all your
            healthcare needs.
          </p>
        </div>
        <div
          className="flex overflow-x-auto hide-scrollbar space-x-4 p-2 snap-x snap-mandatory"
          ref={scrollContainerRef}
        >
          {features.map(
            (
              feature: {
                title: string;
                description: string;
                icon: string;
              },
              index
            ) => (
              <Features
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                className={`p-3 m-2 w-[350px] flex-shrink-0 snap-center transition-transform duration-300 ease-in-out ${
                  index === currentIndex
                    ? "transform scale-105 border border-primary-600 dark:border-primary-700"
                    : ""
                }`}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default Service;
