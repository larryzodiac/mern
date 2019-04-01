/*
  Evan MacHale - N00150552
  28.03.19
  Profile.js
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
import { Redirect } from 'react-router-dom';

/*
  p is only available to authenticated users.
*/

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      message: 'Loading...',
      redirect: false,
    };
  }

  componentDidMount() {
    axios.get('/api/profile')
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) this.setState({ message: response.data });
      })
      .catch(() => this.setState({ redirect: true }));
  }

  render() {
    const { message } = this.state;
    const { redirect } = this.state;
    return (
      <React.Fragment>
        { redirect && <Redirect to="/Signin" /> }
        <div>
          <h1>Profile</h1>
          <p>{ message }</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
