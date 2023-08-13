import React from 'react'
import { Route, RouteProps, Routes } from 'react-router-dom'

const PrivateRoute = (props: RouteProps) => {
  return (
    <Routes>
      <Route {...props} />
    </Routes>
  )
}
export default PrivateRoute
