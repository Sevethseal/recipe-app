import React from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { useAuth } from "../AuthWrapper";

const NavBar = () => {
  const { logOut } = useAuth();
  const location = useLocation();
  if (location.pathname === "/") return <></>;
  return (
    <div className="nav-bar">
      <div>ABOUT</div>
      <div>RECIPES</div>
      <div>TEST1</div>
      <div>TEST2</div>
      <div>
        <button onClick={logOut}>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
