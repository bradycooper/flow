import React from "react";
import { Cn } from "../../../../utils/twCn";

const Subtitle = React.forwardRef<HTMLHeadingElement, {
  children: React.ReactNode;
  className?: string | { [key: string]: string };
}>(({ children, className }, ref) => {
  return (
    <h1 ref={ref} className={Cn("text-subtitle", className)}>
      {children}
    </h1>
  );
});

export default Subtitle;
