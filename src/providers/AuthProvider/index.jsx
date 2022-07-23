import P from 'prop-types';

import { createContext, useEffect, useState } from 'react';

import { Loading } from '../../components/Loading';
import { AuthLoading } from '../../components/AuthLoading';
import { MessageComponent } from '../../components/MessageComponent';

import { api, createSession } from '../../services/api';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ authenticated: false });
  const [loadingControl, setLoadingControl] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [language, setLanguage] = useState('enMessage');

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
        setMessage('Something went wrong, try again later!');
      } else {
        setMessage(err[language]);
      }
    }
  };

  const register = async (email, password) => {
    setAuthLoading(true);
    try {
      await api.post('/auth/signup', { email, password });
      login(email, password);
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        setMessage('Something went wrong, try again later!');
      } else {
        setMessage(err[language]);
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

  const updateFavorites = async (id, drink) => {
    setAuthLoading(true);
    if (!user.authenticated) {
      setMessage('Please log in before putting the drink in favorites!');
    }

    console.log(id, drink);

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
    } catch (error) {
      setAuthLoading(false);
      // const err = error.response.data;
      if (!error) {
        setMessage('Something went wrong, try again later!');
      } else {
        setMessage(error[language]);
      }
    }
  };

  const forgotPassword = async (email) => {
    setAuthLoading(true);
    try {
      await api.post('/auth/send-email', { email });
      setAuthLoading(false);
      setMessage('Check your mail box!');
      window.location.href = '/';
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        setMessage('Something went wrong, try again later!');
      } else {
        setMessage(err[language]);
      }
    }
  };

  const resetPassword = async (email, token, password) => {
    setAuthLoading(true);
    try {
      await api.post('/auth/reset-password', { email, token, password });
      setAuthLoading(false);
      setMessage('Password changed successfully!');
      window.location.href = '/auth/signin';
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        setMessage('Something went wrong, try again later!');
      } else {
        setMessage(err[language]);
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
      {message && <MessageComponent message={message} hide={setMessage} />}
      {loadingControl ? <Loading /> : children}
      {authLoading && <AuthLoading />}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: P.node.isRequired,
};
