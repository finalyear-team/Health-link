import React from "react";

const Container = ({ children }: any) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  sm:px-6 lg:px-8  overflow-y-hidden bg-cover bg-center" style={{backgroundImage: `url('/Login.jpeg')`}}>
        {children}
    </div>
  );
};

export default Container;
