import React from "react";
import { NavLink } from "react-router-dom";
import { MobileNavItemProps } from "../../types/navbar";


const MobileNavItem: React.FC<MobileNavItemProps & { onClick?: () => void }> = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `hover:text-accent ${
        isActive ? "text-black md:text-highlight font-bold" : ""
      }`
    }
    onClick={onClick}
  >
    {children}
  </NavLink>
);

export default MobileNavItem;
