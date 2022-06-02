import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginSignUpCombo from './components/auth/LoginSignUpCombo';
import NavBar from './components/NavBar';
import Projects from './components/Projects';
import Project from './components/Projects/Project';
import Splash from './components/Splash';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';

function ResetProject({setProject}){
  setProject(null);
  return null;
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [project, setProject] = useState(null);
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
      <NavBar project={project}/>
      <Switch>
        <Route path='/' exact={true}>
          <Splash />
          <ResetProject setProject={setProject} />
        </Route>
        <Route path='/login' exact={true}>
          <LoginSignUpCombo />
          <ResetProject setProject={setProject} />
        </Route>
        <Route path='/sign-up' exact={true}>
          <LoginSignUpCombo />
          <ResetProject setProject={setProject} />
        </Route>
        <ProtectedRoute path='/projects' exact={true}>
          <Projects />
          <ResetProject setProject={setProject} />
        </ProtectedRoute>
        <ProtectedRoute path='/projects/:project_id' exact={true}>
          <Project setProject={setProject} />
        </ProtectedRoute>
        <Route path='/project-test'>
          <Project />
        </Route>
        <Route>
          <h1>404</h1>
          <h2>Pretend there's a nice 404 page here.</h2>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
