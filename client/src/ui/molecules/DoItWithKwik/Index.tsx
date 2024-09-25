import React from "react";
import { Cn } from "../../../utils/twCn";
import Logo from "../../atoms/Logo/Index";
import Heading from "../../atoms/Typography/Heading/Index";
import Content from "../../atoms/Typography/Content/Index";
import BookCallButton from "../../atoms/BookCallButton/Index";

const DoItWithKwik: React.FC<{
  variant: string;
  className?: string | { [key: string]: string };
}> = ({ variant, className }) => {
  const isBlack = variant === "black";
  return (
    <div
      className={Cn(
        "p-16 border border-dark-grey rounded-lg bg-white flex flex-col gap-6",
        {
          "bg-[radial-gradient(220px_at_0px_0px,#a7a7a7,transparent),radial-gradient(220px_at_100%_100%,#a7a7a7,transparent),linear-gradient(to_bottom_right,black,black)]":
            isBlack,
        },
        className
      )}
    >
      <Logo
        black={isBlack}
        className={Cn({
          "size-14": isBlack,
        })}
      />
      <h2
        className={Cn("relative font-garamond text-[40px] font-[400] mt-12", {
          "text-white": isBlack,
        })}
      >
        {isBlack && (
          <span className="inline-block size-3 bg-bright-yellow rounded-full absolute -top-5"></span>
        )}
        Do it with Kwik
      </h2>
      <p
        className={Cn("text-[24px] font-[300]", {
          "text-white": isBlack,
        })}
      >
        It might sound like a lot of work! But our team loves this stuff! We
        have spent 40 years doing rewards and incentive programs and have
        generated over $6 BILLION in sales through our programs and we can
        handle all of this for you.
      </p>
      <p
        className={Cn("text-[24px] font-[600]", {
          "text-white": isBlack,
        })}
      >
        Our software automates everything you need for this program to happen.
      </p>
      <p
        className={Cn("text-[24px] font-[300]", {
          "text-white": isBlack,
        })}
      >
        We track user points, set up the attribution, the earning, the
        redemption, the redemption methods, we create a program for you, a
        forecast for you, a budget for you, and everything you need to make the
        program work without having to create a dedicated team for this project.
        Yet yielding you over $50,000 in revenue for a fraction of the cost to
        do it on your own.
      </p>

      <BookCallButton
        className={Cn("mt-8 w-fit", {
          "bg-white hover:shadow-[4px_4px_0px_0px_black]": !isBlack,
        })}
      >
        Book A Call
      </BookCallButton>
    </div>
  );
};

export default DoItWithKwik;
