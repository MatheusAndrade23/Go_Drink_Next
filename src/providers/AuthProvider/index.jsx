import { createContext, useEffect, useState } from 'react';

import { Loading } from '../../components/Loading';
import { AuthLoading } from '../../components/AuthLoading';

import { api, createSession } from '../../services/api';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ authenticated: false });
  const [loadingControl, setLoadingControl] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const language = 'enMessage';

  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  useEffect(() => {
    const recoveredToken = localStorage.getItem('@go-drink/token');
    const recoveredUser = localStorage.getItem('@go-drink/user');

    if (recoveredUser && recoveredToken) {
      api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;
      setUser({ ...JSON.parse(recoveredUser) });
    }

    setLoadingControl(false);
  }, []);

  const login = async (email, password) => {
    if (email.length === 0 || password.length === 0) {
      toast.warning('Please fill in all fields!');
      return;
    }

    const emailTested = emailRegex.test(email);

    if (!emailTested) {
      toast.warning('Please type a valid email!');
      return;
    }

    setAuthLoading(true);
    try {
      const response = await createSession(email, password);
      const loggedUser = response.data.user;
      const token = response.data.token;

      api.defaults.headers.Authorization = `Bearer ${token}`;

      const newUser = { ...loggedUser, authenticated: true };

      localStorage.setItem('@go-drink/user', JSON.stringify(newUser));
      localStorage.setItem('@go-drink/token', token);

      setUser(newUser);
      setAuthLoading(false);
      toast.success('Logged successfully!');
      toast.info('Redirecting..');
      window.location.href = '/';
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        toast.error('Something went wrong, try again later!');
        return;
      }
      toast.error(err[language]);
    }
  };

  const register = async (email, password) => {
    const emailTested = emailRegex.test(email);

    if (!emailTested) {
      toast.warning('Please type a valid email!');
      return;
    }

    setAuthLoading(true);

    try {
      await api.post('/auth/signup', { email, password });
      login(email, password);
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;

      if (!err) {
        toast.error('Something went wrong, try again later!');
        return;
      }
      toast.error(err[language]);
    }
  };

  const logOut = () => {
    localStorage.removeItem('@go-drink/user');
    localStorage.removeItem('@go-drink/token');
    api.defaults.headers.Authorization = null;
    setUser({ authenticated: false });
    window.location.href = '/auth/signin';
  };

  const updateFavorites = async (id, drink, isFavorite) => {
    if (!user.authenticated) {
      toast.warning('Please log in before putting the drink in favorites!');
      return;
    }
    setAuthLoading(true);

    try {
      const response = await api.patch(`/drink/favorites/${user._id}`, {
        drink,
        drinkId: id,
      });

      const { favorites, favoritesInfo } = response.data.user;
      const newUser = { ...user, favorites, favoritesInfo };

      localStorage.setItem('@go-drink/user', JSON.stringify(newUser));
      setUser(newUser);
      setAuthLoading(false);

      if (isFavorite) {
        toast.success('Drink removed from favorites successfully!');
        return;
      }

      toast.success('Drink added to favorites successfully!');
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        toast.error('Something went wrong, try again later!');
        return;
      }
      toast.error(err[language]);
    }
  };

  const forgotPassword = async (email) => {
    setAuthLoading(true);
    try {
      await api.post('/auth/send-email', { email });
      setAuthLoading(false);
      toast.success('Check your mail box!');
      window.location.href = '/';
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        toast.error('Something went wrong, try again later!');
        return;
      }
      toast.error(err[language]);
    }
  };

  const resetPassword = async (email, token, password) => {
    setAuthLoading(true);
    try {
      await api.post('/auth/reset-password', { email, token, password });
      setAuthLoading(false);
      toast.success('Password changed successfully!');
      window.location.href = '/auth/signin';
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        toast.error('Something went wrong, try again later!');
        return;
      }
      toast.error(err[language]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logOut,
        register,
        updateFavorites,
        resetPassword,
        forgotPassword,
      }}
    >
      {loadingControl ? <Loading /> : children}
      {authLoading && <AuthLoading />}
    </AuthContext.Provider>
  );
};
