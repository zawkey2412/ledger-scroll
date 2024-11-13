import React from "react";
import { NavLink } from "react-router-dom";
import { MobileNavItemProps } from "../../types/navbar";


const MobileNavItem: React.FC<MobileNavItemProps> = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `hover:text-accent ${
        isActive ? "text-black md:text-highlight font-bold" : ""
      }`
    }
  >
    {children}
  </NavLink>
);

export default MobileNavItem;
