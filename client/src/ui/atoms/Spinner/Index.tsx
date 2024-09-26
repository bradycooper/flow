import React from "react";

const Spinner: React.FC = () => {
  return (
    <span className="inline-block relative size-5 shrink-0 self-start">
      <span className="inline-block border-4 border-light-grey border-r-light-cream w-full h-full rounded-full animate-spin"></span>
    </span>
  );
};

export default Spinner;
