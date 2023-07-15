import './App.css'
import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/Home'
import { AuthWrapper } from './components/AuthWrapper'
import NavBar from './components/NavBar'
import AddRecipes from './pages/addRecipes'
import ViewRecipes from './pages/ViewRecipes'
import PrivateRoute from './components/PrivateRoute'
function App() {
  return (
    <Router>
      <AuthWrapper>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <React.Fragment>
            <Route path="home" element={<PrivateRoute component={Home} />} />
            <Route
              path="/create"
              element={<PrivateRoute component={AddRecipes} />}
            />
            <Route
              path="view"
              element={<PrivateRoute component={ViewRecipes} />}
            />
          </React.Fragment>
        </Routes>
      </AuthWrapper>
    </Router>
  )
}

export default App
