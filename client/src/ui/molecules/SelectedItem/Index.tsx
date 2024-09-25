import React from "react";
import Content from "../../atoms/Typography/Content/Index";
import TickMarkIcon from "../../../assets/icons/TickMarkIcon";
import { Cn } from "../../../utils/twCn";

const SelectedItem: React.FC<{
  text: string;
  answer: string | undefined;
  className?: string | { [key: string]: string };
}> = ({ answer, text, className }) => {
  return (
    <div
      className={Cn(
        "p-4 rounded-md bg-white border border-dark-aqua flex gap-3 items-center",
        className
      )}
    >
      <div className="p-1 text-success text-[20px]">
        <TickMarkIcon />
      </div>
      <div className="">
        <Content className="text-dark-grey font-[200] font-geologica text-[15px]">
          {text}
        </Content>
        <Content className="text-black text-[14px] font-[600] mt-1">
          {answer}
        </Content>
      </div>
    </div>
  );
};

export default SelectedItem;
