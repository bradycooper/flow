import React from "react";
import logo from "./../../../assets/images/openAI.png";
import Content from "../Typography/Content/Index";

const PoweredByOpenAI = () => {
  return (
    <div className="mt-auto flex flex-col gap-0.5">
      <p className="font-geologica text-[12px]">Powered by</p>
      <img className="w-20" src={logo} alt="OpenAI" />
    </div>
  );
};

export default PoweredByOpenAI;
