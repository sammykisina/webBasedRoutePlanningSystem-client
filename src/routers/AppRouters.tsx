import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '@/hooks';
import { History, Home, Login, Paths, Profile, Register } from '@/pages';

const AppRouters = () => {
  /**
   * components states
   */
  const { user } = useAuth();

  return (
    <Routes>
      {/* common routes */}
      <Route
        path='/'
        element={
          <Suspense fallback='loading'>
            <Home />
          </Suspense>
        }
      />

      {/* auth routes */}
      <Route
        path='/auth/login'
        element={
          <Suspense fallback='loading'>
            <Login />
          </Suspense>
        }
      />

      <Route
        path='/auth/register'
        element={
          <Suspense fallback='loading'>
            <Register />
          </Suspense>
        }
      />

      {/* authenticated routes */}
      <Route
        path='/paths'
        element={
          <Suspense fallback='loading'>
            <Paths />
          </Suspense>
        }
      />

      <Route
        path='/history'
        element={
          <Suspense fallback='loading'>
            <History />
          </Suspense>
        }
      />

      <Route
        path='/profile'
        element={
          <Suspense fallback='loading'>
            <Profile />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AppRouters;
