import React from "react";
import { Answer } from "../../../types";
import { Cn } from "../../../utils/twCn";
import Content from "../../atoms/Typography/Content/Index";
import Heading from "../../atoms/Typography/Heading/Index";
import { generateRandomString } from "../../../utils/generateRandomString";

const SummaryCard: React.FC<{
  className?: string | { [key: string]: string };
  heading: string;
  description: string;
  steps?: string[];
}> = ({ className, heading, description, steps }) => {
  return (
    <div
      className={Cn(
        "p-12 border border-dark-grey rounded-lg space-y-3 bg-white",
        className
      )}
    >
      <Heading className="text-[30px] font-[500] font-geologica">{heading}</Heading>
      <p className="font-[200] text-[16px] font-geologica leading-7">{description}</p>
      {steps && (
        <ul className="list-decimal ml-4">
          {steps.map((step) => (
            <React.Fragment key={generateRandomString()}>
              <li className="my-2 font-geologica font-[200] text-[16px]">{step}</li>
            </React.Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SummaryCard;
