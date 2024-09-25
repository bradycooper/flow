import React from "react";
import { Cn } from "../../../../utils/twCn";

const Content: React.FC<{
  children: React.ReactNode;
  className?: string | { [key: string]: string };
}> = ({ children, className }) => {
  return <p className={Cn("text-content", className)}>{children}</p>;
};

export default Content;
