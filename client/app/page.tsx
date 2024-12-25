"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MainView from "@/components/Landing-common/sections/main-view";
import ParentFeatures from "@/components/Landing-common/sections/parent-feature";
import Service from "@/components/Landing-common/sections/services";
import Testimonials from "@/components/Landing-common/sections/testimonial";
import TopDoctorSection from "@/components/Landing-common/sections/top-doctors";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    const popup = window.open(
      "http://localhost:4000/auth/google/signin",
      "GoogleAuthPopup",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
    );


    window.addEventListener("message", (event) => {
      if (event.origin !== "http://localhost:4000") return;
      const { accessToken, user } = event.data;
      console.log("User logged in:", user);
      console.log("Access token:", accessToken);
    });
  };


  return (
    <div className="flex flex-col min-h-[100dvh]">
      <button onClick={handleGoogleLogin} className="border border-green-500">google auth</button>
      {/* <Header /> */}
      {/* <main className="flex-1"> */}
      {/* front-page */}
      {/* <MainView /> */}

      {/* features */}
      {/* <ParentFeatures /> */}

      {/* our services */}
      {/* <Service /> */}

      {/* Testimonials */}
      {/* <Testimonials /> */}

      {/* top doctors */}
      {/* <TopDoctorSection /> */}
      {/* </main> */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
