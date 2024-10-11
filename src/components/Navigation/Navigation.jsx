import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";

const Navigation = () => {
  const NavLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div>
      <NavLink className={NavLinkClass} to="/">
        Home
      </NavLink>
      <NavLink className={NavLinkClass} to="/movies">
        Movies
      </NavLink>
    </div>
  );
};

export default Navigation;
