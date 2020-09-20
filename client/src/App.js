import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from './pages/Auth.js';
import DashboardPage from './pages/Dashboard.js';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  console.log('App token', token);
  console.log('App user', user);
  const login = (_token, _user) => {
    setToken(_token);
    setUser(_user);
  }

  const logout = () => {
    setToken(null);
    setUser(null);
  }
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ token, user, login, logout }}>
        <MainNavigation />
        <Switch>
          {!token && <Redirect from="/" to="/auth" exact />}
          {!token && <Redirect from="/dashboard" to="/auth" exact />}
          {token && <Redirect from="/" to="/dashboard" exact />}
          {token && <Redirect from="/auth" to="/dashboard" exact />}
          {!token && <Route path="/auth" component={AuthPage} />}
          {token && <Route path="/dashboard" component={DashboardPage} />}
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
