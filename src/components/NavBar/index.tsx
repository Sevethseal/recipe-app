/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react'
import './styles.css'
import { useAuth } from '../AuthWrapper'
import { useLocation, useNavigate } from 'react-router-dom'
import MenuSharpIcon from '@mui/icons-material/MenuSharp'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Button, Stack } from '@mui/material'
const NavBar = () => {
  const { logOut } = useAuth()
  const location = useLocation()
  const history = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRedirect = (page: string) => {
    switch (page) {
      case 'HOME':
        history('/home')
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
  const menuClickHandler = () => {
    setIsMenuOpen((prev) => !prev)
  }
  const MenuList = (
    <div className="menu-item">
      <div
        className={location.pathname === '/home' ? 'active-nav-bar' : ''}
        onClick={() => navRedirect('HOME')}
      >
        Home
      </div>
      <div
        className={location.pathname === '/view' ? 'active-nav-bar' : ''}
        onClick={() => navRedirect('RECIPES')}
      >
        Recipes
      </div>
      <div
        className={location.pathname === '/create' ? 'active-nav-bar' : ''}
        onClick={() => navRedirect('ADD RECIPES')}
      >
        Add Recipes
      </div>
    </div>
  )

  if (location.pathname === '/') return <></>
  return (
    <div className="nav-bar">
      <Stack display={'flex'} justifyContent={'center'}>
        {isMenuOpen ? (
          <CloseRoundedIcon onClick={menuClickHandler} id="menuClose" />
        ) : (
          <MenuSharpIcon onClick={menuClickHandler} id="menuIcon" />
        )}
      </Stack>
      {isMenuOpen && MenuList}
      <div>
        <Button
          onClick={logOut}
          sx={{ border: '0.5px solid black', marginRight: '5px' }}
        >
          Logout
        </Button>
      </div>
    </div>
  )
}

export default NavBar
