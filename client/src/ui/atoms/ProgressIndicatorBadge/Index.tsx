import React from "react";
import { Cn } from "../../../utils/twCn";

const ProgressIndicatorBadge: React.FC<{
  number: number;
  active: boolean;
}> = ({ number, active }) => {
  return (
    <span
      className={Cn(
        "font-geologica size-12 rounded-full bg-grey border border-dark-grey flex items-center font-bold justify-center text-[20px]",
        {
          "bg-light-cream": active,
          "border-bright-yellow": active,
        }
      )}
    >
      {number}
    </span>
  );
};

export default ProgressIndicatorBadge;
