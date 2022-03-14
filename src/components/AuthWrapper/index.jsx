import React, { useContext, useState, useEffect } from "react";
import FireBaseAuthService from "../../FireBaseAuthService";
const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthWrapper = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const authenticatedLogin = async (email, password) => {
    try {
      await FireBaseAuthService.login(email, password);
    } catch (error) {
      alert(error.message);
    }
  };
  const authenticatedLoginGoogle = async () => {
    try {
      await FireBaseAuthService.loginWithGoogle();
    } catch (error) {
      alert(error.message);
    }
  };
  const logOut = async () => {
    try {
      await FireBaseAuthService.logOutUser();
    } catch (error) {
      alert(error.message);
    }
  };
  useEffect(() => {
    const unsubscribe = FireBaseAuthService.subscribeToAuthChanges(
      setCurrentUser,
      setLoading
    );
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    authenticatedLogin,
    authenticatedLoginGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
