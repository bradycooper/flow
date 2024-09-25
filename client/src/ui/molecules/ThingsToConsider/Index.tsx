import React from "react";
import { generateRandomString } from "../../../utils/generateRandomString";
import { Cn } from "../../../utils/twCn";

const ThingsToConsider: React.FC<{
  className?: string | { [key: string]: string };
}> = ({ className }) => {
  return (
    <ul
      className={Cn(
        "py-8 px-12 border border-bright-yellow bg-light-cream rounded-lg",
        className
      )}
    >
      {Array.from({ length: 27 }).map(() => (
        <React.Fragment key={generateRandomString()}>
          <div className="py-2 pl-7 first:border-t border-b border-dark-grey text-dark-grey list-disc">
            <li className="font-geologica text-[26px] font-[400]">How you're going to give points</li>
          </div>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default ThingsToConsider;
