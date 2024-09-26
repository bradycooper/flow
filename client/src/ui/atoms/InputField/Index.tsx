import React from "react";
import { Cn } from "../../../utils/twCn";
import { InputFieldProps } from "../../../types";
import InputLabel from "../InputLabel/Index";

const InputField: React.FC<InputFieldProps> = ({
  className,
  label,
  id,
  required,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <InputLabel id={id} label={label} required={required} />}
      <input
        className={Cn(
          "inline-block outline-none bg-grey p-2 border border-light-grey",
          className
        )}
        id={id}
        required={required}
        {...props}
      />
    </div>
  );
};

export default InputField;
