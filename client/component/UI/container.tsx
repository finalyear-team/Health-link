import React from "react";

const Container = ({ children }: any) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white  sm:px-6 lg:px-8 dark:bg-dark-700 overflow-y-hidden">
        {children}
    </div>
  );
};

export default Container;