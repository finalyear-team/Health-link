import React from "react";
import { Oval } from "react-loader-spinner";

const PageLoader = () => {
  return (
    <Oval
      visible={true}
      height="60"
      width="60"
      color="#0a71eb"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default PageLoader;
