import "./Navbar.scss";
import { NavLink, Link } from "react-router-dom";
import React, { useEffect } from "react";
import { AiFillHome, AiOutlineUser } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { RiCompassDiscoverFill } from "react-icons/ri";
import Toggle from "./../generic/Toggle/Toggle";

import { navbarConstants } from "./../../utils/strings";

import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "./../../features/theme/theme";
import { changeAuth } from "./../../features/auth";

export default function Navbar() {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.value);
  useEffect(() => {
    localStorage.setItem("DARK_MODE", theme);
  }, [theme]);

  const onLogout = () => {
    dispatch(changeAuth(""));
    localStorage.setItem("auth", "");
  };

  return (
    <nav className={"Navbar " + theme}>
      <div className="mobile-container">
        <NavLink to="/">
          <i className="bi bi-search" style={{ color: "#ADFF45" }}></i>
          <div className="Navbar-Logo">
            <img className="logo-img" src="/logo.svg" alt="logo" />
          </div>
        </NavLink>
      </div>

      <div className={"Navbar-Links " + theme}>
        <NavLink to="/" className={"NavLink clickable-gray-box " + theme}>
          <AiFillHome className="nav-link-icon" />
          <span>{navbarConstants.HOME}</span>
        </NavLink>
        <NavLink to="/kesfet" className={"NavLink clickable-gray-box " + theme}>
          <RiCompassDiscoverFill className="nav-link-icon" />
          <span>{navbarConstants.DISCOVER}</span>
        </NavLink>
        <NavLink
          to="/kategoriler"
          className={"NavLink clickable-gray-box " + theme}
        >
          <BiCategory className="nav-link-icon" />
          <span>{navbarConstants.CATEGORIES}</span>
        </NavLink>

        {auth === "" ? (
          <Link to="/giris" className={"NavLink clickable-gray-box " + theme}>
            <AiOutlineUser className="nav-link-icon" />
            <span>{navbarConstants.SIGN}</span>
          </Link>
        ) : (
          <Link to="/profil" className={"NavLink clickable-gray-box " + theme}>
            <AiOutlineUser className="nav-link-icon" />
            <span>{navbarConstants.PROFILE}</span>
          </Link>
        )}
      </div>
      <div className={"themeToggleContainer " + theme}>
        <span>{navbarConstants.DARK}</span>
        <Toggle
          initial={theme === "dark"}
          onToggle={() => dispatch(switchTheme())}
        />
      </div>
    </nav>
  );
}
