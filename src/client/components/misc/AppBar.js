/*
  Evan MacHale - N00150552
  24.03.19
  AppBar.js - Miscellaneous modular components folder🔨
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Material Components
import Button from '@material/react-button';
import TopAppBar, {
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';

/*
  AppBar used for navigation 🚩
*/

class AppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loginSuccess } = this.props;
    const { logout } = this.props;
    return (
      <div>
        <TopAppBar className="top-app-bar-custom">
          <TopAppBarRow>

            <TopAppBarSection align="start">
              <Link to="/Secret">
                <TopAppBarTitle>Secret</TopAppBarTitle>
              </Link>
              <Link to="/">
                <TopAppBarTitle>Home</TopAppBarTitle>
              </Link>
            </TopAppBarSection>

            <TopAppBarSection align="end">
              {loginSuccess ? (
                <Button onClick={logout}>logout</Button>
              ) : (
                <div>
                  <Link to="/Signin">
                    <Button>Sign in</Button>
                  </Link>
                  <Link to="/Signup">
                    <Button outlined>Get Started</Button>
                  </Link>
                </div>
              )}
            </TopAppBarSection>

          </TopAppBarRow>
        </TopAppBar>
      </div>
    );
  }
}

AppBar.propTypes = {
  loginSuccess: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};


export default AppBar;
