import { Answer } from "../../../types";
import { Cn } from "../../../utils/twCn";
import Content from "../../atoms/Typography/Content/Index";
import Heading from "../../atoms/Typography/Heading/Index";

const SummaryCard: React.FC<{
  className?: string | { [key: string]: string };
  heading: string;
  description: string;
}> = ({ className, heading, description }) => {
  return (
    <div
      className={Cn(
        "p-12 border border-dark-grey rounded-lg space-y-3 bg-white",
        className
      )}
    >
      <Heading className="text-[30px] font-[600]">{heading}</Heading>
      <Content className="font-[400]">{description}</Content>
    </div>
  );
};

export default SummaryCard;
