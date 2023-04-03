import { authBaseUrl } from "./apiConfig";

export const signup = (firstName, lastName, email, password) => {
  return fetch(authBaseUrl + '/register', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ firstName, lastName, email, password })
  });
}

export const login = (email, password) => {
  return fetch(authBaseUrl + '/authenticate', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
}

export const isLoggedIn = () => {
  return (window.localStorage.getItem('token') !== null);
}

export const getToken = () => {
  return `Bearer ${window.localStorage.getItem('token')}`;
}