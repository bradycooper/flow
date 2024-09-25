import React from "react";
import { Cn } from "../../../utils/twCn";

const SiteWrapper: React.FC<{
  children: React.ReactNode;
  className?: { [key: string]: string } | string;
}> = ({ children, className }) => {
  return (
    <section className={Cn("max-w-[1170px] mx-auto", className)}>
      {children}
    </section>
  );
};

export default SiteWrapper;
