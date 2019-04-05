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
                    {loginSuccess ? (
                      // Need to fix DRY
                      <div>
                        <Link to="/new">
                          <TopAppBarIcon actionItem tabIndex={0}>
                            <MaterialIcon
                              aria-label="add"
                              hasRipple
                              icon="add"
                            />
                          </TopAppBarIcon>
                        </Link>
                        <Link to="/profile">
                          <TopAppBarIcon actionItem tabIndex={0}>
                            <MaterialIcon
                              aria-label="account_circle"
                              hasRipple
                              icon="account_circle"
                            />
                          </TopAppBarIcon>
                        </Link>
                        <Link to="/logout">
                          <TopAppBarIcon actionItem tabIndex={0}>
                            <MaterialIcon
                              aria-label="exit_to_app"
                              hasRipple
                              icon="exit_to_app"
                            />
                          </TopAppBarIcon>
                        </Link>
                      </div>
                    ) : (
                      <React.Fragment>
                        <Link to="/profile">
                          <TopAppBarIcon actionItem tabIndex={0}>
                            <MaterialIcon
                              aria-label="account_circle"
                              hasRipple
                              icon="account_circle"
                            />
                          </TopAppBarIcon>
                        </Link>
                        <Link to="/signin">
                          <Button>Sign in</Button>
                        </Link>
                        <Link to="/signup">
                          <Button outlined>Get Started</Button>
                        </Link>
                      </React.Fragment>
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
