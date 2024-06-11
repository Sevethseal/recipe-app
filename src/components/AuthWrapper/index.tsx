import React, { useContext, useState, useEffect } from 'react'
import FireBaseAuthService from '../../FireBaseAuthService'
import { AuthWrapperProps } from './types'

interface UseAuth {
  currentUser: null | unknown
  authenticatedLogin: (email: string, password: string) => Promise<void>
  authenticatedLoginGoogle: () => Promise<void>
  logOut: () => Promise<void>
}
const AuthContext = React.createContext<UseAuth>({} as UseAuth)
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthWrapperProps) => {
  const [currentUser, setCurrentUser] = useState<null | boolean>(null)
  const [loading, setLoading] = useState<null | boolean>(true)
  const authenticatedLogin = async (email: string, password: string) => {
    try {
      await FireBaseAuthService.login(email, password)
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('An unknown error occurred')
      }
    }
  }
  const authenticatedLoginGoogle = async () => {
    try {
      await FireBaseAuthService.loginWithGoogle()
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('An unknown error occurred')
      }
    }
  }
  const logOut = async () => {
    try {
      await FireBaseAuthService.logOutUser()
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('An unknown error occurred')
      }
    }
  }
  useEffect(() => {
    const unsubscribe = FireBaseAuthService.subscribeToAuthChanges(
      setCurrentUser,
      setLoading
    )
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    authenticatedLogin,
    authenticatedLoginGoogle,
    logOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
