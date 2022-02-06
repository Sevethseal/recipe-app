import React, { useState } from "react";
import FireBaseAuthService from "../../FireBaseAuthService";
import { useNavigate } from "react-router-dom";

import "./index.css";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  FireBaseAuthService.subscribeToAuthChanges(setUser);
  const history = useNavigate();

  const LoginUser = async (e) => {
    e.preventDefault();
    try {
      await FireBaseAuthService.login(email, password);
      setEmail("");
      setPassword("");
      history("/home");
    } catch (error) {
      alert(error.message);
    }
  };
  const LoginGoogle = async () => {
    try {
      await FireBaseAuthService.loginWithGoogle();
      history("/home");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="login">
      <div className="login-section">
        <div className="login__heading-wrapper">
          <div className="login__heading">Firebase Recipes</div>
        </div>

        <div className="login__credential">
          <form>
            <div className="login__align">
              <div>
                <label>Username(email)</label>
              </div>
              <div>
                <input
                  type={"email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="login__align">
              <label>Password</label>
              <input
                type={"password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login__button-section">
              <button type="submit" onClick={(e) => LoginUser(e)}>
                Login
              </button>
              <button type="submit">ResetEmail</button>
              <button type="button" onClick={LoginGoogle}>
                Login with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
