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
      <BrowserRouter>
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/video">
            <Videos />
          </Route>
          <Route exact path="/groups">
            <Groups />
          </Route>
          <Route exact path="/group/:id">
            <GroupDetails />
          </Route>
          <Route exact path="/problem-statements">
            <ProblemStatements />
          </Route>
         
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;