import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthWrapper'
import { PrivateRouteProps } from './types'
const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
  const { currentUser } = useAuth()
  return currentUser ? <Component /> : <Navigate to="/" />
}

export default PrivateRoute
