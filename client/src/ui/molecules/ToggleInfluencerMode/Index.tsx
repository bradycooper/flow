import React from "react";
import Switch from "../../atoms/Swtich/Index";

const ToggleInfluencerMode: React.FC = () => {
  return (
    <div className="border rounded-full border-light-grey px-8 py-2 flex items-center  font-[500] text-[18px]">
      <Switch />
      Switch to Influencers
    </div>
  );
};

export default ToggleInfluencerMode;
