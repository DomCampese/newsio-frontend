import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import NewsSearch from 'components/SearchNews';
import SavedNews from 'components/SavedNews';
import Protected from 'components/Protected';
import ForgotPassword from 'components/ForgotPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: 'search',
        element: <Protected><NewsSearch/></Protected>
      },
      {
        path: 'my-stories',
        element: <Protected><SavedNews/></Protected>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'signup',
        element: <Signup/>
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
