import React from "react";
import { Cn } from "../../../utils/twCn";
import SelectedItem from "../SelectedItem/Index";

const ProgramDetails: React.FC<{
  className?: string | { [key: string]: string };
}> = ({ className }) => {
  return (
    <div
      className={Cn(
        className,
        "p-10 rounded-lg bg-light-cream border border-bright-yellow grid grid-cols-3 gap-5"
      )}
    >
      {Array.from({ length: 9 }).map(() => (
        <SelectedItem
          text="What are you looking to accomplish in your business?"
          answer="New Customer"
          className="border-bright-yellow"
        />
      ))}
    </div>
  );
};

export default ProgramDetails;
