import React, { SVGProps } from "react";

const TickMarkIcon: React.FC<SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM4.54545 9.61006L5.8311 8.32441L9.04523 11.5385L14.1878 6.39594L15.4735 7.68159L9.04523 14.1098L4.54545 9.61006Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TickMarkIcon;
