import React from "react";
import { generateRandomString } from "../../../utils/generateRandomString";
import { Cn } from "../../../utils/twCn";

const NextSteps: React.FC<{
  className?: string | { [key: string]: string };
}> = ({ className }) => {
  return (
    <div
      className={Cn(
        "py-8 px-12 border border-dark-grey bg-white rounded-lg",
        className
      )}
    >
      {Array.from({ length: 27 }).map(() => {
        const randomString = generateRandomString();
        return (
          <React.Fragment key={randomString}>
            <div className="py-2  first:border-t border-b border-dark-grey text-dark-grey list-disc flex items-center gap-7">
              <input type="checkbox" name=" " id={randomString} className="scale-150"/>
              <label
                htmlFor={randomString}
                className="cursor-pointer font-geologica text-[26px] font-[400]"
              >
                Create a program
              </label>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default NextSteps;
