"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MainView from "@/components/Landing-common/sections/main-view";
import ParentFeatures from "@/components/Landing-common/sections/parent-feature";
import Service from "@/components/Landing-common/sections/services";
import Testimonials from "@/components/Landing-common/sections/testimonial";
import TopDoctorSection from "@/components/Landing-common/sections/top-doctors";

const Home = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        {/* front-page */}
        <MainView />

        {/* features */}
        <ParentFeatures />

        {/* our services */}
        <Service />

        {/* Testimonials */}
        <Testimonials />

        {/* top doctors */}
        <TopDoctorSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
