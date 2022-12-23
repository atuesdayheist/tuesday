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
import Curate from './components/curate/input';

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
      <div id="main">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/curate" element={<Curate />} />
          </Route>

          <Route element={<RestrictedRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
