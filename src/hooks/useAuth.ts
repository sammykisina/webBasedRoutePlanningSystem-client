import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthAPI } from '@/api';
import Cookies from 'js-cookie';
import { Toasts } from '@/components';
import { useNavigate } from 'react-router-dom';
import { APIUser, LoginData, RegisterData, User } from '../types/typings.t';

const useAuth = () => {
  /**
   * hook states
   */
  const [user, setUser] = useState<User | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  /**
   * hook functions
   */

  // login users
  const { mutateAsync: loginMutateAsync, isLoading: isLogging } = useMutation({
    mutationFn: (loginData: LoginData) => {
      return AuthAPI.login(loginData);
    },

    onSuccess: async (data) => {
      Cookies.set('user', JSON.stringify(data.user));
      Cookies.set('token', data.token);

      navigate('/');
      refresh();
      Toasts.successToast(data.message);
    },
  });

  // register users
  const { mutateAsync: registerMutateAsync, isLoading: isRegistering } =
    useMutation({
      mutationFn: (registerData: RegisterData) => {
        return AuthAPI.register(registerData);
      },

      onSuccess: async (data) => {
        Cookies.set('user', JSON.stringify(data.user));
        Cookies.set('token', data.token);

        navigate('/');
        refresh();
        Toasts.successToast(data.message);
      },
    });

  // logout users
  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');

    setToken(undefined);
    setUser(undefined);

    refresh();
    navigate('/');
  };

  // refresh the current browser
  const refresh = () => window.location.reload();

  useEffect(() => {
    const user = Cookies.get('user') && JSON?.parse(Cookies.get('user') || '');
    const token = Cookies.get('token');
    if (token !== undefined || token !== '') {
      setToken(token);
    }

    if (user !== undefined || user !== '') {
      setUser(user);
    }
  }, []);

  // update password
  const {
    mutateAsync: updatePasswordMutateAsync,
    isLoading: isUpdatingPassword,
  } = useMutation({
    mutationFn: (data: { userId: number; password: string }) => {
      return AuthAPI.updatePassword(data);
    },

    onSuccess: async (data) => {
      Toasts.successToast(data.message);
    },
  });

  // get current user profile
  const { data: userProfile, isLoading: isFetchingUserProfile } = useQuery({
    queryKey: ['userProfile', user?.role],
    queryFn: async ({ queryKey }) => {
      const [_, role] = queryKey;

      if (role === 'user') {
        return (await AuthAPI.getUserProfile(user?.id!)) as APIUser;
      }

      return null;
    },
  });

  return {
    user,
    token,
    loginMutateAsync,
    isLogging,
    logout,
    updatePasswordMutateAsync,
    isUpdatingPassword,
    userProfile,
    isFetchingUserProfile,
    registerMutateAsync,
    isRegistering,
  };
};

export default useAuth;
