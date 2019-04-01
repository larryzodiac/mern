/*
  Evan MacHale - N00150552
  24.03.19
  App.js
  + + + + + + + + + + +
  + World Map 🌀 (Pages)
  + Index
  +   ¬ App             <--- You are here 🚀
  +     ¬ Portal
  +       ¬ Signin
  +       ¬ Signup
  +     ¬ Home
*/

import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
// Material Components
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { Grid } from '@material/react-layout-grid';
// My Components
import Home from './components/Home';
import Profile from './components/Profile';
import Signin from './components/Signin';
import Signup from './components/Signup';
import AppBar from './components/misc/AppBar';

/*
  App functions as the hub for all component traffic 🚂
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginSuccess: false,
    };
    this.setLoginSuccess = this.setLoginSuccess.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    axios.get('/api/token')
      .then((response) => {
        if (response.status === 200) this.setState({ loginSuccess: true });
      })
      .catch(() => this.setState({ loginSuccess: false }));
  }

  setLoginSuccess() {
    this.setState(prevState => ({
      loginSuccess: !prevState.loginSuccess,
    }));
  }

  logout(props) {
    axios.get('/api/logout')
      .then((response) => {
        if (response.status === 200) {
          this.setState({ loginSuccess: false });
          props.history.push('/');
        }
      });
  }

  render() {
    const { loginSuccess } = this.state;
    return (
      <BrowserRouter>
        <AppBar loginSuccess={loginSuccess} />
        <TopAppBarFixedAdjust>
          <Grid>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/profile" render={() => <Profile />} />
              <Route path="/signin" render={() => <Signin setLoginSuccess={this.setLoginSuccess} />} />
              <Route path="/signup" render={() => <Signup />} />
              <Route path="/logout" render={this.logout} />
            </Switch>
          </Grid>
        </TopAppBarFixedAdjust>
      </BrowserRouter>
    );
  }
}

export default App;
