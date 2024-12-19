// app/auth/AuthContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login as firebaseLogin } from './auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const role = localStorage.getItem('userRole');
    if (loggedIn && role) {
      setIsLoggedIn(true);
      setUserRole(role);
      if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
        router.push('/'); // Redirect to home if logged in user tries to access login or signup page
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      await firebaseLogin(email, password);
      setIsLoggedIn(true);
      const userRole = email === 'shalimarmehra01@gmail.com' ? 'admin' : 'user';
      setUserRole(userRole);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('userRole', userRole);
      router.push('/'); // Redirect to home after successful login
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);