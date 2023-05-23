import React from "react";
import { useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

interface NavbarProps {
  score: number;
  lives: number;
  isExploding: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  score,
  lives,
  isExploding,
}) => {
  let displayLives = 7 - lives;

  useEffect(() => {
    console.log("lives:", lives);
    console.log("displayLives:", displayLives);
  }, [lives, displayLives]);
  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">
            <img src="/images/logov4.png" alt="logo" width="150" />
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className=" font-bold text-xl">lives: {displayLives}</a>
            </li>
            <li>
              <a className=" font-bold text-xl">score: {score}</a>
              {isExploding && <ConfettiExplosion />}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
