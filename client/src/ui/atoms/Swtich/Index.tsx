import React from "react";
import { Cn } from "../../../utils/twCn";

const Switch: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <label htmlFor="switch" className="relative left-0 top-0 flex items-center  w-20 h-10">
      <input type="checkbox" className="hidden peer" id="switch" />
      <div
        className={Cn(
          "bg-bright-yellow block w-16 cursor-pointer select-none rounded-full h-6 absolute peer-checked:bg-light-grey transition-colors",
          className
        )}
      ></div>
      <span className="absolute inline-block size-8 rounded-full bg-white shadow-md peer-checked:translate-x-full transition-transform p-1">
        <span className="inline-block size-full rounded-full border border-grey"></span>
      </span>
    </label>
  );
};

export default Switch;
