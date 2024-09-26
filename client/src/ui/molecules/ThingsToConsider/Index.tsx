import React from "react";
import { generateRandomString } from "../../../utils/generateRandomString";
import { Cn } from "../../../utils/twCn";

const ThingsToConsider: React.FC<{
  className?: string | { [key: string]: string };
  considerations: string[];
}> = ({ className, considerations }) => {
  return (
    <ul
      className={Cn(
        "py-8 px-12 border border-bright-yellow bg-light-cream rounded-lg",
        className
      )}
    >
      {considerations.map((consideration) => (
        <React.Fragment key={generateRandomString()}>
          <div className="py-2 pl-7 first:border-t border-b border-dark-grey text-dark-grey list-disc">
            <li className="font-geologica text-[22px] font-[300]">
              {consideration}
            </li>
          </div>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default ThingsToConsider;
