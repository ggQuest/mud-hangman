import React from "react";

interface OneKeyProps {
  letter: string;
}

export const OneKey: React.FC<OneKeyProps> = ({ letter }) => {
  return (
    <span>
      <button>{letter}</button>
    </span>
  );
};
