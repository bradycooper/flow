import React from "react";
import SummaryCard from "../SummaryCard/Index";
import { Cn } from "../../../utils/twCn";

const Summaries: React.FC<{
  className?: string | { [key: string]: string };
}> = ({ className }) => {
  return (
    <div className={Cn("grid grid-cols-2 gap-8", className)}>
      <SummaryCard
        heading="Kwik' Summary"
        description="Your program looks amazing! Creating a customer retention program targeted at engaging your old customers, by making a program available to all of them and incentivizing them utilizing a giveaway is going to crush it! Looks like you want to incentivize purchasing and this will definitely do it. Giving them points is a smart way to do it and keeps them aware of what they're earning and making them earn those based on purchasing is a genius way to actually drive the behavior that you want. That's why making it a fixed % is the smartest way to easily calculate those results! We have a few things to note on this program."
      />
      <SummaryCard
        heading="Marketing Strategy"
        description="A great rewards program requires amazing marketing. No matter how good your rewards and incentives are you have to let people know they exist! Based on your program you configured here are some of our ways you could market this! 1. Pop Up: Reward pop ups do a great job at letting visitors to your site know you have a program. This also allows you to capture emails at roughly 3x a higher rate. 2. Product Pages: Put the reward points that users get right on the page! So that they can see as they're shopping what they get. 3. In the checkout! Let them know as they checkout what they're earning on their purchase so by the time they purchase they're aware of the offer. 4. Post purchase Claim: Give them an easy way to claim those points right at the point of checkout. 5. Post purchase email: Send them an email after telling them to claim those points. These are a few of the things to watch for, but also integrate as you run promotions and seasonal offers. The more you push this program, the more results you're going to see."
      />
    </div>
  );
};

export default Summaries;
