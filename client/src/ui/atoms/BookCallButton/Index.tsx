import React from "react";
import { Cn } from "../../../utils/twCn";
import ArrowRightIcon from "../../../assets/icons/ArrowRight";

const BookCallButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className, children, ...props }) => {
  return (
    <button
      className={Cn(
        "relative outline-none rounded-full px-8 py-3 bg-cream border border-dark-grey text-[18px] font-[500] flex items-center gap-4 transition-all duration-300 ease-in-out shadow-none hover:shadow-[4px_4px_0px_0px_white] hover:translate-x-[-3px] hover:translate-y-[-3px]",
        className,
        { ...props }
      )}
    >
      {children} <ArrowRightIcon />
    </button>
  );
};

export default BookCallButton;
