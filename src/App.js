import './App.css';
import Dashboard from './components/Dashboard';
import LoginPage from './components/LoginPage';
import Videos from './components/Videos';
import { BrowserRouter, HashRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from './components/SignUpPage';
import AppManager from './components/AppManager';
import Groups from './components/Groups';
import GroupDetails from './components/Groups/GroupDetail';

import ProblemStatements from './components/ProblemStatements'
import Presentations from './components/Presentations';
import ProblemStatementCreate from './components/ProblemStatements/CreateProblemStatement';
import AlertMessage from './components/Alert';
import Templates from './components/Templates';
function App() {
  return (
    <div className="App">
      <AppManager />
      <AlertMessage />
      <Router >
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
          <Route exact path="/group/">
            <GroupDetails />
          </Route>
          <Route exact path="/problem-statements">
            <ProblemStatements />
          </Route>
          <Route exact path="/problem-statements/create">
            <ProblemStatementCreate />
          </Route>
          <Route exact path="/presentation">
            <Presentations />
          </Route>
          <Route exact path="/templates">
            <Templates />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
