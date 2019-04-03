/*
  Evan MacHale - N00150552
  28.03.19
  Profile.js
*/

import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// Material Components
import { Cell, Row } from '@material/react-layout-grid';
import { Headline4, Body2 } from '@material/react-typography';

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

  // static contextType = ContextId;

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
        <Row>
          <Cell desktopColumns={4} tabletColumns={1} />
          <Cell desktopColumns={4} tabletColumns={6} phoneColumns={4}>
            <Row>
              <Cell desktopColumns={12} tabletColumns={8}>
                <Headline4>{ `${profile.username}'s Articles` }</Headline4>
                <Body2>{  }</Body2>
              </Cell>
            </Row>
            <Row>
              <Cell desktopColumns={10} tabletColumns={8}>
                {/* Rows in here per articles */}
                Lorem ipsum dolosit amet, consectetur adipiscing elit. Phasellus fringilla vulputate ipsum sit amet facilisis. Morbi dui ex, euismod sed egestas ac, maximus eget sem. Donec molestie auctor tellus eu egestas. Vivamus malesuada justo nec nisi semper condimentum. Nam sit amet nulla sit amet augue sodales gravida.
              </Cell>
            </Row>
          </Cell>
          <Cell desktopColumns={4} tabletColumns={1} />
        </Row>
      </React.Fragment>
    );
  }
}

export default Profile;
