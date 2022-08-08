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
  const [language, setLanguage] = useState('enMessage');

  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  useEffect(() => {
    const recoveredToken = localStorage.getItem('token');
    const recoveredUser = localStorage.getItem('user');

    if (recoveredUser && recoveredToken) {
      setUser({ ...JSON.parse(recoveredUser) });
      api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;
    }

    setLoadingControl(false);
  }, []);

  const login = async (email, password) => {
    if (email.length === 0 || password.length === 0) {
      toast.warning('Please fill in all fields!', { autoClose: 3000 });
      return;
    }

    const emailTested = emailRegex.test(email);

    if (!emailTested) {
      toast.warning('Please type a valid email!', { autoClose: 3000 });
      return;
    }

    setAuthLoading(true);
    try {
      const response = await createSession(email, password);
      const loggedUser = response.data.user;
      const token = response.data.token;

      api.defaults.headers.Authorization = `Bearer ${token}`;

      localStorage.setItem(
        'user',
        JSON.stringify({ ...loggedUser, authenticated: true }),
      );
      localStorage.setItem('token', token);
      setUser({ ...loggedUser, authenticated: true });
      setAuthLoading(false);
      window.location.href = '/';
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        toast.error('Something went wrong, try again later!', {
          autoClose: 3000,
        });
      } else {
        toast.error(err[language], { autoClose: 3000 });
      }
    }
  };

  const register = async (email, password) => {
    const emailTested = emailRegex.test(email);

    if (!emailTested) {
      toast.warning('Please type a valid email!', { autoClose: 3000 });
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
        toast.error('Something went wrong, try again later!', {
          autoClose: 3000,
        });
      } else {
        toast.error(err[language], { autoClose: 3000 });
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = null;
    setUser({ authenticated: false });
    window.location.href = '/auth/signin';
  };

  const updateFavorites = async (id, drink, isFavorite) => {
    if (!user.authenticated) {
      toast.warning('Please log in before putting the drink in favorites!', {
        autoClose: 3000,
      });
      return;
    }

    setAuthLoading(true);

    try {
      await api.patch(`/drink/favorites/${user._id}`, {
        drink,
        drinkId: id,
      });

      const response = await api.get(`/drink/favorites/${user._id}`);
      const newFavorites = response.data.user.favorites;
      const newFavoritesInfo = response.data.user.favoritesInfo;

      localStorage.setItem(
        'user',
        JSON.stringify({
          ...user,
          favorites: newFavorites,
          favoritesInfo: newFavoritesInfo,
        }),
      );
      setUser({
        ...user,
        favorites: newFavorites,
        favoritesInfo: newFavoritesInfo,
      });
      setAuthLoading(false);

      if (isFavorite) {
        toast.success('Drink removed from favorites successfully!', {
          autoClose: 3000,
        });
        return;
      }

      toast.success('Drink added to favorites successfully!', {
        autoClose: 3000,
      });
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        toast.error('Something went wrong, try again later!', {
          autoClose: 3000,
        });
      } else {
        toast.error(err[language], { autoClose: 3000 });
      }
    }
  };

  const forgotPassword = async (email) => {
    setAuthLoading(true);
    try {
      await api.post('/auth/send-email', { email });
      setAuthLoading(false);
      toast.success('Check your mail box!', { autoClose: 3000 });
      window.location.href = '/';
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        toast.error('Something went wrong, try again later!', {
          autoClose: 3000,
        });
      } else {
        toast.error(err[language], { autoClose: 3000 });
      }
    }
  };

  const resetPassword = async (email, token, password) => {
    setAuthLoading(true);
    try {
      await api.post('/auth/reset-password', { email, token, password });
      setAuthLoading(false);
      toast.success('Password changed successfully!', { autoClose: 3000 });
      window.location.href = '/auth/signin';
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        toast.error('Something went wrong, try again later!', {
          autoClose: 3000,
        });
      } else {
        toast.error(err[language], { autoClose: 3000 });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
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
