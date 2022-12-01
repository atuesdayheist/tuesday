import React from 'react';
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './components/layout/navbar';
import Home from './components/common/home';
import Login from './components/auth/login';
import Dashboard from './components/auth/dashboard';
import Register from './components/auth/register';

const PrivateRoute = () => {
  const authState = useSelector((state) => state.auth);
  return (
    <> {authState.isAuth ? <Outlet /> : <Navigate to="/login" />} </>
  );
};

const RestrictedRoute = () => {
  const authState = useSelector((state) => state.auth);
  return (
    <>
      {!authState.isAuth ? <Outlet /> : <Navigate to="/dashboard" />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<RestrictedRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
