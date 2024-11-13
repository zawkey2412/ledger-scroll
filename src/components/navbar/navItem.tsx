import React from "react";
import { NavLink } from "react-router-dom";
import { NavItemProps } from "../../types/navbar";

const NavItem: React.FC<NavItemProps> = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `hover:text-blue-500 ${isActive ? "text-highlight font-bold" : ""}`
    }
  >
    {children}
  </NavLink>
);

export default NavItem;
