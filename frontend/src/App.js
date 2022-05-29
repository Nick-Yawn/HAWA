import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import Projects from './components/Projects';
import Project from './components/Projects/Project';
import Conversions from './components/Projects/Conversions';
import Splash from './components/Splash';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <Splash />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/projects' exact={true}>
          <Projects />
        </ProtectedRoute>
        <ProtectedRoute path='/projects/:project_id' exact={true}>
          <Project />
        </ProtectedRoute>
        <ProtectedRoute path='/projects/:project_id/conversions' exact={true}>
          <Conversions />
        </ProtectedRoute>
        <Route path='/project-test'>
          <Project />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
