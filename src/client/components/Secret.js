/*
  Evan MacHale - N00150552
  28.03.19
  Secret.js
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
  Secret is only available to authenticated users.
*/

class Secret extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...',
    };
  }

  componentDidMount() {
    axios.get('/api/secret')
      .then(response => this.setState({ message: response.data }));
  }

  render() {
    const { message } = this.state;
    return (
      <div>
        <h1>Secret</h1>
        <p>{ message }</p>
      </div>
    );
  }
}

export default Secret;
