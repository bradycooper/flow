import React from "react";
import { InputLabelProps } from "../../../types";

const InputLabel: React.FC<InputLabelProps> = ({ required, label, id }) => {
  return (
    <label htmlFor={id} className="font-[500] text-[14px] flex gap-2 items-center">
      <span className="inline-block">
        {label} {required && "*"}
      </span>
      <span className="inline-block border-b bg-grey grow shrink-0"></span>
    </label>
  );
};

export default InputLabel;
