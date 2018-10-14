import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import CreateTodo from './components/CreateTodo';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import TodoList from './components/TodoList';
import TodoPage from './components/TodoPage';
import { Provider } from 'react-redux';
import store from './store'
import PrivateRoute from './components/PrivateRoutes';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authenticate';
import { clearCurrentProfile } from './actions/profileAction';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());

    window.location.href = '/signin'
  }

}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <h1>Todo Application</h1>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Switch>
              <PrivateRoute exact path="/todos" component={TodoPage} />
              <PrivateRoute exact path="/createtodo" component={CreateTodo} />
              <PrivateRoute exact path="/todo/:_id" component={CreateTodo} />

            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
