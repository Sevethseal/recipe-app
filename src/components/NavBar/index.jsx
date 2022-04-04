import React from "react";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { useAuth } from "../AuthWrapper";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const { logOut } = useAuth();
  const location = useLocation();
  const history = useNavigate();
  const navRedirect = (page) => {
    switch (page) {
      case "ABOUT":
        history("/about");
        break;
      case "RECIPES":
        history("/about");
        break;
      case "ADD RECIPES":
        history("/create");
        break;

      default:
        history("/home");
    }
  };
  if (location.pathname === "/") return <></>;
  return (
    <div className="nav-bar">
      <div onClick={() => navRedirect("ABOUT")}>ABOUT</div>
      <div onClick={() => navRedirect("RECIPES")}>RECIPES</div>
      <div onClick={() => navRedirect("ADD RECIPES")}>ADD RECIPES</div>
      <div>TEST2</div>
      <div>
        <button onClick={logOut}>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
