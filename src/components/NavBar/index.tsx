/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import './styles.css'
import { useAuth } from '../AuthWrapper'
import { useLocation, useNavigate } from 'react-router-dom'
const NavBar = () => {
  const { logOut } = useAuth()
  const location = useLocation()
  const history = useNavigate()
  const navRedirect = (page: string) => {
    switch (page) {
      case 'ABOUT':
        history('/about')
        break
      case 'RECIPES':
        history('/view')
        break
      case 'ADD RECIPES':
        history('/create')
        break
      default:
        history('/home')
    }
  }
  if (location.pathname === '/') return <></>
  return (
    <div className="nav-bar">
      <div onClick={() => navRedirect('ABOUT')}>ABOUT</div>
      <div onClick={() => navRedirect('RECIPES')}>RECIPES</div>
      <div onClick={() => navRedirect('ADD RECIPES')}>ADD RECIPES</div>
      <div>TEST2</div>
      <div>
        <button onClick={logOut}>Logout</button>
      </div>
    </div>
  )
}

export default NavBar
