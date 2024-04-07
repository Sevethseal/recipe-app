/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import FireBaseAuthService from '../../FireBaseAuthService'
import { useAuth } from '../../components/AuthWrapper'
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Typography } from '@mui/material'
import loginCover from '../../assets/loginCover.webp'
import './style.css'

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useNavigate()
  const { authenticatedLogin, authenticatedLoginGoogle } = useAuth()
  const LoginUser = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (email && password) {
      await authenticatedLogin(email, password)
      history('/about')
    } else {
      alert('fill email and password')
    }
  }
  const LoginGoogle = async () => {
    await authenticatedLoginGoogle()
    history('/about')
  }
  const handleResetPassword = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (!email) {
      alert('user name missing')
    } else {
      try {
        await FireBaseAuthService.sendPasswordResetEmail(email)
        alert('reset email sent to your email')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        alert(error.message)
      }
    }
  }

  return (
    <div className="login">
      <Box className="login__section">
        <Box className="login__credential">
          <Box>
            <Typography classes={{ root: 'login__sub-heading' }}>
              Good Food
            </Typography>
            <Box className="login__text-wrapper">
              <Typography classes={{ root: 'login__text' }}>
                WELCOME, ENJOY THE BEST RECIPES
              </Typography>
            </Box>
          </Box>
          <form>
            <Box className="login__details">
              <Typography classes={{ root: 'login__sub-heading' }}>
                Login / SignUp
              </Typography>
              <TextField
                id="Email"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="Password"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="login__button-section">
                <Button
                  size="small"
                  type="submit"
                  variant="outlined"
                  onClick={(e) => LoginUser(e)}
                  style={{
                    border: '1px solid black',
                    color: 'black',
                    font: 'Prata',
                  }}
                >
                  login
                </Button>
                <Button
                  type="submit"
                  variant="outlined"
                  onClick={handleResetPassword}
                  style={{
                    border: '1px solid black',
                    color: 'black',
                    font: 'Prata',
                  }}
                >
                  Reset Password
                </Button>
                <Button
                  variant="outlined"
                  onClick={LoginGoogle}
                  style={{
                    border: '1px solid black',
                    color: 'black',
                    font: 'Prata',
                  }}
                >
                  login via Google
                </Button>
              </div>
            </Box>
          </form>
        </Box>
        <Box className="login__cover-image-wrapper">
          <img
            src={loginCover}
            alt="loginCover"
            className="login__cover-image"
          />
        </Box>
      </Box>
    </div>
  )
}

export default Login
