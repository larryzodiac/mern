/*
  Evan MacHale - N00150552
  28.03.19
  Profile.js
*/

import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

/*
  Profile is only available to authenticated users 🔒
*/

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: 'Loading...',
      redirect: false,
    };
  }

  componentDidMount() {
    axios.get('/api/profile')
      .then((response) => {
        if (response.status === 200) this.setState({ profile: response.data });
      })
      .catch(() => this.setState({ redirect: true }));
  }

  render() {
    const { profile, redirect } = this.state;
    return (
      <React.Fragment>
        { redirect && <Redirect to="/Signin" /> }
        <div>
          <h1>{ `${profile.username}'s Profile` }</h1>
          <p>{ `Email: ${profile.email}` }</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
