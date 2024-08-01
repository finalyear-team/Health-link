import React from "react";
import { Oval } from "react-loader-spinner";

const PageLoader = () => {
  return (
    <Oval
      visible={true}
      height="50"
      width="50"
      color="#0a71eb"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default PageLoader;
