import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();
const SESSION_KEY = 'recipe-finder.session.v1';
const USERS_KEY = 'recipe-finder.users.v1';
const SESSION_MAX_AGE = 1000 * 60 * 60 * 24 * 14;

const readCache = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

const hashPassword = async (password, salt) => {
  const bytes = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
};

const getCachedSession = () => {
  const session = readCache(SESSION_KEY);
  if (!session || !session.expiresAt || Date.now() > session.expiresAt) {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
  return session.user;
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getCachedSession);

  useEffect(() => {
    if (!user) return;
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      user,
      expiresAt: Date.now() + SESSION_MAX_AGE,
    }));
  }, [user]);

  const signUp = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = readCache(USERS_KEY) || [];
    if (users.some((savedUser) => savedUser.email === normalizedEmail)) {
      throw new Error('An account with this email already exists.');
    }

    const salt = crypto.randomUUID();
    const passwordHash = await hashPassword(password, salt);
    const newUser = { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, salt, passwordHash };
    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(sessionUser);
    return sessionUser;
  };

  const signIn = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = readCache(USERS_KEY) || [];
    const savedUser = users.find((candidate) => candidate.email === normalizedEmail);
    if (!savedUser || savedUser.passwordHash !== await hashPassword(password, savedUser.salt)) {
      throw new Error('Incorrect email or password.');
    }
    const sessionUser = { id: savedUser.id, name: savedUser.name, email: savedUser.email };
    setUser(sessionUser);
    return sessionUser;
  };

  const signOut = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, signIn, signUp, signOut }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = { children: PropTypes.node.isRequired };
