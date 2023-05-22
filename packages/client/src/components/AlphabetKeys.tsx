import React from "react";

export const AlphabetKeys: React.FC = () => {
  const alphaBet = [...Array(26)].map(
    (ele, i) => (ele = String.fromCharCode(i + 97))
  );
  return (
    <div>
      <p>Alphabet Keys</p>
      <div>
        {alphaBet.map((letter, index) => (
          <button key={index}>{letter}</button>
        ))}
      </div>
    </div>
  );
};
