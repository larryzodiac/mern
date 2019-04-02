/*
  Evan MacHale - N00150552
  24.03.19
  Home.js
*/

import React, { Component } from 'react';
import axios from 'axios';

/*
  Home acts as a dashboard. Browse content or sign in 🏠
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
