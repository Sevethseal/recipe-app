import React from 'react'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import Login from '../pages/login'

import Redirect from '../components/Redirect'
import routeToComponentMap from './routeToComponentMap'
import Layout from '../components/Layout.tsx'
import { AuthProvider } from '../components/AuthWrapper'

const RoutesComponent = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={Redirect()} />
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            {routeToComponentMap.map((routeProps) => (
              <Route {...routeProps} key={routeProps.path} />
            ))}
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default RoutesComponent
