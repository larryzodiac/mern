/*
  Evan MacHale - N00150552
  24.03.19
  Signin.js
*/

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// Material Design Components
import { Cell, Row } from '@material/react-layout-grid';
import Button from '@material/react-button';
import { Headline4 } from '@material/react-typography';
// My Components
import Text from './misc/Text';

/*
  Signin renders a form + handles POST requests 🔒
*/

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameError: '',
      password: '',
      passwordError: '',
      redirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const { setLoginSuccess } = this.props;
    /*
      Make POST Request 📮
    */
    axios.post('/api/signin', { username, password })
      .then((response) => {
        if (response.status === 200) {
          setLoginSuccess();
          this.setState({ redirect: true });
        }
      })
      .catch((error) => {
        /*
          Validate 🔒
        */
        switch (error.response.data.message.message) {
          case 'Missing credentials':
            this.setState({
              usernameError: error.response.data.message.message,
              passwordError: error.response.data.message.message,
            });
            break;
          case 'Incorrect username':
            this.setState({
              usernameError: error.response.data.message.message,
              passwordError: '',
            });
            break;
          case 'Incorrect password':
            this.setState({
              usernameError: '',
              passwordError: error.response.data.message.message,
            });
            break;
          default:
        }
      });
  }

  renderRedirect() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return <React.Fragment />;
  }

  render() {
    const {
      username,
      usernameError,
      password,
      passwordError,
    } = this.state;
    return (
      <React.Fragment>
        {this.renderRedirect()}
        <Row>
          <Cell columns={5} />
          <Cell columns={2}>
            <form onSubmit={this.handleSubmit}>
              <Row>
                <Cell columns={12}>
                  <Headline4>Welcome Back</Headline4>
                </Cell>
                <Cell columns={12}>
                  <Text name="username" label="Username" value={username} error={usernameError} onChange={this.handleInputChange} />
                </Cell>
                <Cell columns={12}>
                  <Text name="password" type="password" label="Password" value={password} error={passwordError} onChange={this.handleInputChange} />
                </Cell>
                <Cell columns={12}>
                  <Button type="submit" value="Submit">Sign in</Button>
                </Cell>
              </Row>
            </form>
          </Cell>
          <Cell columns={5} />
        </Row>
      </React.Fragment>
    );
  }
}

Signin.propTypes = {
  setLoginSuccess: PropTypes.func.isRequired,
};

export default Signin;
