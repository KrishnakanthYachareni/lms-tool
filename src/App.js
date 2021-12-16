import './App.css';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import Videos from './components/Videos';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import SignUp from './components/SignUpPage';
import AppManager from './components/AppManager';
import Groups from './components/Groups';
import GroupDetails from './components/Groups/GroupDetail';

import ProblemStatements from './components/ProblemStatements'
function App() {
  return (
    <div className="App">
      <AppManager />
      <BrowserRouter basename={'/dsd4'}>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/dashboard`}>
            <Dashboard />
          </Route>
          <Route exact path={`${process.env.PUBLIC_URL}/signup`}>
            <SignUp />
          </Route>
          <Route exact path={`${process.env.PUBLIC_URL}/`}>
            <LoginPage />
          </Route>
          <Route exact path={`${process.env.PUBLIC_URL}/video`}>
            <Videos />
          </Route>
          <Route exact path={`${process.env.PUBLIC_URL}/groups`}>
            <Groups />
          </Route>
          <Route exact path={`${process.env.PUBLIC_URL}/group/:id`}>
            <GroupDetails />
          </Route>
          <Route exact path={`${process.env.PUBLIC_URL}/problem-statements`}>
            <ProblemStatements />
          </Route>
         
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
