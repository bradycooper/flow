import React from "react";
import { Cn } from "../../../../utils/twCn";

const Subtitle: React.FC<{
  children: React.ReactNode;
  className?: string | { [key: string]: string };
}> = ({ children, className }) => {
  return <h1 className={Cn("text-subtitle", className)}>{children}</h1>;
};

export default Subtitle;
