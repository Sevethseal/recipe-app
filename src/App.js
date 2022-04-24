import "./App.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/Home";
import { AuthWrapper } from "./components/AuthWrapper";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import AddRecipes from "./pages/addRecipes";
import ViewRecipes from "./pages/ViewRecipes";
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
            <Route
              exact
              path="/create"
              element={<PrivateRoute component={AddRecipes} />}
            />
            <Route
              exact
              path="view"
              element={<PrivateRoute component={ViewRecipes} />}
            />
          </React.Fragment>
        </Routes>
      </AuthWrapper>
    </Router>
  );
}

export default App;
