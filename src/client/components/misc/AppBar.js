/*
  Evan MacHale - N00150552
  24.03.19
  AppBar.js - Miscellaneous modular components folder🔨
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Material Components
import { Cell, Grid, Row } from '@material/react-layout-grid';
import Button from '@material/react-button';
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

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
    return (
      <div>
        <TopAppBar className="top-app-bar-custom">
          <Grid className="top-app-bar-grid">
            <Row>
              <Cell desktopColumns={2} tabletColumns={1} />
              <Cell desktopColumns={8} tabletColumns={6} phoneColumns={4}>
                <TopAppBarRow>

                  <TopAppBarSection align="start">
                    <Link to="/">
                      <TopAppBarTitle>MERN</TopAppBarTitle>
                    </Link>
                  </TopAppBarSection>

                  <TopAppBarSection align="end">
                    <Link to="/profile">
                      <TopAppBarIcon actionItem tabIndex={0}>
                        <MaterialIcon
                          aria-label="account_circle"
                          hasRipple
                          icon="account_circle"
                        />
                      </TopAppBarIcon>
                    </Link>
                    {loginSuccess ? (
                      // <Button onClick={logout}>logout</Button>
                      <Link to="/logout">
                        <Button>logout</Button>
                      </Link>
                    ) : (
                      <div>
                        <Link to="/signin">
                          <Button>Sign in</Button>
                        </Link>
                        <Link to="/signup">
                          <Button outlined>Get Started</Button>
                        </Link>
                      </div>
                    )}
                  </TopAppBarSection>

                </TopAppBarRow>
              </Cell>
              <Cell desktopColumns={2} tabletColumns={1} />
            </Row>
          </Grid>
        </TopAppBar>
      </div>
    );
  }
}

AppBar.propTypes = {
  loginSuccess: PropTypes.bool.isRequired,
};

export default AppBar;
