import React from "react";

const InputError: React.FC<{
  error: string;
}> = ({ error }) => {
  return (
    <span className="inline-block text-red-600 font-geologica text-base">
      {error}
    </span>
  );
};

export default InputError;
