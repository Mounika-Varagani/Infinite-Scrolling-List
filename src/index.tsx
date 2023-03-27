import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { NotFound } from './NotFound';
import { SignIn } from './SignIn';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFound />}></Route>
        <Route path="/" element={<SignIn />}></Route>

        <Route path='/home' element={
          <RequireAuth redirectTo='/'>npm 
            <App />
          </RequireAuth>
        }></Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function RequireAuth({ children, redirectTo }: any) {
  const loggedIn = localStorage.getItem('loginOrNot');
  let isAuthenticated = loggedIn == 'true' ? 'true' : 'false';
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
