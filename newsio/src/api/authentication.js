const baseUrl = 'http://localhost:8080/api/v1/auth'

export const signup = (firstName, lastName, email, password) => {
  return fetch(baseUrl + '/register', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ firstName, lastName, email, password })
  });
}

export const login = (email, password) => {
  return fetch(baseUrl + '/authenticate', {
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