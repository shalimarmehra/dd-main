// app/auth/withAuth.js
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from './AuthContext';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { isLoggedIn, userRole } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoggedIn || userRole !== 'user') {
        router.push('/'); // Redirect to login page if not logged in or not a user
      }
    }, [isLoggedIn, userRole, router]);

    return (isLoggedIn && userRole === 'user') ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
