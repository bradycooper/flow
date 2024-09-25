import { Answer } from "../../../types";
import { Cn } from "../../../utils/twCn";
import Content from "../../atoms/Typography/Content/Index";
import Heading from "../../atoms/Typography/Heading/Index";

const StatsCard: React.FC<{
  className?: string | { [key: string]: string };
  headingClassName?: string | { [key: string]: string };
  childrenClassName?: string | { [key: string]: string };
  descriptionClassName?: string | { [key: string]: string };
  heading: string;
  description?: string;
  children: React.ReactNode;
}> = ({
  className,
  headingClassName,
  childrenClassName,
  descriptionClassName,
  heading,
  description,
  children,
}) => {
  return (
    <div
      className={Cn(
        "px-12 py-6 border border-dark-grey rounded-lg space-y-3",
        className
      )}
    >
      <Content className={Cn("text-[15px] font-[500]", headingClassName)}>
        {heading}
      </Content>

      <Heading className={Cn("text-[35px] font-[700]", childrenClassName)}>
        {children}
      </Heading>
      {description && (
        <Content className={Cn("text-[15px] font-[400]", descriptionClassName)}>
          {description}
        </Content>
      )}
    </div>
  );
};

export default StatsCard;
