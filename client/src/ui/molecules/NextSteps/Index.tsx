import React from "react";
import { generateRandomString } from "../../../utils/generateRandomString";
import { Cn } from "../../../utils/twCn";

const NextSteps: React.FC<{
  className?: string | { [key: string]: string };
  nextSteps: string[];
}> = ({ className, nextSteps }) => {
  return (
    <div
      className={Cn(
        "py-8 px-12 border border-dark-grey bg-white rounded-lg",
        className
      )}
    >
      {nextSteps.map((nextSteps) => {
        const randomString = generateRandomString();
        return (
          <React.Fragment key={randomString}>
            <div className="py-2  first:border-t border-b border-dark-grey text-dark-grey list-disc flex items-center gap-5">
              <input
                type="checkbox"
                name=" "
                disabled
                id={randomString}
                className="scale-150"
              />
              <label
                htmlFor={randomString}
                className="cursor-pointer font-geologica text-[22px] font-[300]"
              >
                {nextSteps}
              </label>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default NextSteps;
