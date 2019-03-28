/*
  Evan MacHale - N00150552
  24.03.19
  World.js
  + + + + + + + + + + +
  + World Map 🌀 (Pages)
  + Index
  +   ¬ App
  +     ¬ Signin
  +     ¬ Signup
  +     ¬ Home         <--- You are here 🚀
*/

import React, { Component } from 'react';
import axios from 'axios';

/*
  World acts as a homepage. Browse or sign in 🏠
*/

class Home extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...',
    };
  }

  componentDidMount() {
    axios.get('/api/home')
      .then(response => this.setState({ message: response.data }));
  }

  render() {
    const { message } = this.state;
    return (
      <div>
        <h1>Home</h1>
        <p>{ message }</p>
      </div>
    );
  }
}

export default Home;
