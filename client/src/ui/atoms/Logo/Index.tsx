import React from "react";
import logo from "./../../../assets/images/logo.png";
import logoBlack from "./../../../assets/images/logoBlack.png";
import { Cn } from "../../../utils/twCn";

const Logo: React.FC<{
  className?: { [key: string]: string } | string;
  black?: boolean;
}> = ({ className, black }) => {
  return (
    <img
      src={black ? logoBlack : logo}
      alt="Logo"
      className={Cn("w-32 h-auto inline-block", className)}
    />
  );
};

export default Logo;
