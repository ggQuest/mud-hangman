import exp from "constants";
import React from "react";

interface NavbarProps {
  score: number;
}

export const Navbar: React.FC<NavbarProps> = ({ score }) => {
  return (
    <div>
      <div className="navbar bg-neutral text-neutral-content">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">ggQuest</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className=" font-bold text-xl">score: {score}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
