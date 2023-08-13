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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message)
    }
  }
  const authenticatedLoginGoogle = async () => {
    try {
      await FireBaseAuthService.loginWithGoogle()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message)
    }
  }
  const logOut = async () => {
    try {
      await FireBaseAuthService.logOutUser()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message)
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
