import React from 'react'

import './styles.css'
import NavBar from '../NavBar'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../AuthWrapper'

const Layout = () => {
  const { currentUser } = useAuth()
  return currentUser ? (
    <>
      <NavBar />
      <div className="layout-wrapper">
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  )
}

export default Layout
