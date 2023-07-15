/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import FireBaseAuthService from '../../FireBaseAuthService'
import { useAuth } from '../../components/AuthWrapper'
import { useNavigate } from 'react-router-dom'
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
      history('/home')
    } else {
      alert('fill email and password')
    }
  }
  const LoginGoogle = async () => {
    await authenticatedLoginGoogle()
    history('/home')
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
      <div className="login-section">
        <div className="login__heading-wrapper">
          <div className="login__heading">Firebase Recipes</div>
        </div>
        <div className="login__credential">
          <form>
            <div className="login__align">
              <div>
                <label>Username(email)</label>
              </div>
              <div>
                <input
                  type={'email'}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="login__align">
              <label>Password</label>
              <input
                type={'password'}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login__button-section">
              <button type="submit" onClick={(e) => LoginUser(e)}>
                Login
              </button>
              <button type="submit" onClick={handleResetPassword}>
                ResetEmail
              </button>
              <button type="button" onClick={LoginGoogle}>
                Login with Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
