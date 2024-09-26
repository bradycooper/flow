import { useEffect, useRef } from "react";
import { Cn } from "../../../utils/twCn";
import Content from "../../atoms/Typography/Content/Index";
import PoweredByOpenAI from "../../atoms/PoweredByOpenAI/Index";

const StatsCard: React.FC<{
  className?: string | { [key: string]: string };
  headingClassName?: string | { [key: string]: string };
  childrenClassName?: string | { [key: string]: string };
  descriptionClassName?: string | { [key: string]: string };
  heading: string;
  description?: string;
  children: React.ReactNode;
  sucessScore?: string;
  powered?: boolean;
}> = ({
  className,
  headingClassName,
  childrenClassName,
  descriptionClassName,
  heading,
  description,
  children,
  sucessScore,
  powered,
}) => {
  const childrenRef = useRef<HTMLHeadingElement | null>(null);

  const adjustFontSize = () => {
    const element = childrenRef.current;
    if (element) {
      const containerWidth = element.parentElement?.offsetWidth || 0;
      const textLength = element.textContent?.length || 0;

      const fontSize = Math.min(containerWidth / textLength, 40);
      element.style.fontSize = `${fontSize}px`;
    }
  };

  useEffect(() => {
    adjustFontSize();
    window.addEventListener("resize", adjustFontSize);

    return () => window.removeEventListener("resize", adjustFontSize);
  }, []);

  return (
    <div
      className={Cn(
        "px-10 py-5 border border-dark-grey rounded-lg flex flex-col gap-4",
        className
      )}
    >
      <Content
        className={Cn(
          "text-[15px] font-[500] font-geologica",
          headingClassName
        )}
      >
        {heading}
      </Content>

      <h2
        ref={childrenRef}
        className={Cn(
          "text-[28px] font-[700] font-geologica",
          childrenClassName
        )}
      >
        {children}
      </h2>

      {sucessScore && (
        <p className="text-[12px] font-bold font-geologica">{sucessScore}</p>
      )}

      {description && (
        <Content
          className={Cn(
            "text-[15px] font-[300] font-geologica",
            descriptionClassName
          )}
        >
          {description}
        </Content>
      )}

      {powered && <PoweredByOpenAI />}
    </div>
  );
};

export default StatsCard;
