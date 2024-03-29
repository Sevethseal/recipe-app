import React from 'react'
import { useAuth } from '../components/AuthWrapper'
import { Navigate } from 'react-router-dom'

const Redirect = () => {
  const { currentUser } = useAuth()
  return currentUser ? <Navigate to="/about" /> : <Navigate to="/login" />
}

export default Redirect
