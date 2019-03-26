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
  +     ¬ World
*/

import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.scss';
// Material Components
import { TopAppBarFixedAdjust } from '@material/react-top-app-bar';
import { Grid } from '@material/react-layout-grid';
// My Components
import World from './components/World';
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
  }

  render() {
    const { loginSuccess } = this.state;
    return (
      <BrowserRouter>
        <AppBar loginSuccess={loginSuccess} />
        <TopAppBarFixedAdjust>
          <Grid>
            <Route exact path="/" component={World} />
            <Route path="/signin" render={() => <Signin />} />
            <Route path="/signup" render={() => <Signup />} />
          </Grid>
        </TopAppBarFixedAdjust>
      </BrowserRouter>
    );
  }
}

export default App;
