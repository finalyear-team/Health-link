import React from "react";
import {TailSpin} from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full">
      <TailSpin
        visible={true}
        height="15"
        width="15"
        color="#ffffff"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loading