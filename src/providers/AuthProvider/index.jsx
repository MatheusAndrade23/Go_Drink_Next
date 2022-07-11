import P from "prop-types";

import { useTranslation } from "next-i18next";
import { createContext, useEffect, useState } from "react";

import { Loading } from "../../components/Loading";
import { AuthLoading } from "../../components/AuthLoading";
import { MessageComponent } from "../../components/MessageComponent";

import { api, createSession } from "../../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const { t, i18n } = useTranslation();

  const [user, setUser] = useState({ authenticated: false });
  const [loadingControl, setLoadingControl] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const recoveredToken = localStorage.getItem("token");
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser && recoveredToken) {
      setUser({ ...JSON.parse(recoveredUser) });
      api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;
    }

    setLoadingControl(false);
  }, []);

  useEffect(() => {
    setLanguage(i18n.language + "Message");
  }, [i18n.language]);

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const response = await createSession(email, password);
      const loggedUser = response.data.user;
      const token = response.data.token;

      api.defaults.headers.Authorization = `Bearer ${token}`;

      localStorage.setItem(
        "user",
        JSON.stringify({ ...loggedUser, authenticated: true })
      );
      localStorage.setItem("token", token);
      setUser({ ...loggedUser, authenticated: true });
      setAuthLoading(false);
      window.location.href = "/";
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        setMessage(t("error500message"));
      } else {
        setMessage(err[language]);
      }
    }
  };

  const register = async (email, password) => {
    setAuthLoading(true);
    try {
      await api.post("/auth/signup", { email, password });
      login(email, password);
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        setMessage(t("error500message"));
      } else {
        setMessage(err[language]);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    setUser({ authenticated: false });
    window.location.href = "/auth/signin";
  };

  const updateFavorites = async () => {
    setAuthLoading(true);
    if (!user.authenticated) {
      return;
    }

    try {
      const response = await api.get(`/drink/favorites/${user._id}`);
      const newFavorites = response.data.user.favorites;
      const newFavoritesInfo = response.data.user.favoritesInfo;

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          favorites: newFavorites,
          favoritesInfo: newFavoritesInfo,
        })
      );
      setUser({
        ...user,
        favorites: newFavorites,
        favoritesInfo: newFavoritesInfo,
      });
      setAuthLoading(false);
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        setMessage(t("error500message"));
      } else {
        setMessage(err[language]);
      }
    }
  };

  const forgotPassword = async (email) => {
    setAuthLoading(true);
    try {
      await api.post("/auth/send-email", { email });
      setAuthLoading(false);
      setMessage(t("mailBox"));
      window.location.href = "/";
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        setMessage(t("error500message"));
      } else {
        setMessage(err[language]);
      }
    }
  };

  const resetPassword = async (email, token, password) => {
    setAuthLoading(true);
    try {
      await api.post("/auth/reset-password", { email, token, password });
      setAuthLoading(false);
      setMessage(t("passwordChanged"));
      window.location.href = "/auth/signin";
    } catch (error) {
      setAuthLoading(false);
      const err = error.response.data;
      if (!err) {
        setMessage(t("error500message"));
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
