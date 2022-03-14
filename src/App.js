import "./App.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import { AuthWrapper } from "./components/AuthWrapper";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
function App() {
  return (
    <Router>
      <AuthWrapper>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Login />} />
          <React.Fragment>
            <Route
              exact
              path="home"
              element={<PrivateRoute component={Home} />}
            />
          </React.Fragment>
        </Routes>
      </AuthWrapper>
    </Router>
  );
}

export default App;
