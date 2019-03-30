/*
  Evan MacHale - N00150552
  24.03.19
  Signin.js
  + + + + + + + + + + +
  + World Map 🌀 (Pages)
  + Index
  +   ¬ App
  +     ¬ Portal
  +       ¬ Signin      <--- You are here 🚀
  +       ¬ Signup
  +     ¬ World
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
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
      password: '',
      redirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username } = this.state;
    const { password } = this.state;
    const { setLoginSuccess } = this.props;
    /*
      react-router Route Component Props History 🔌
      Allows us to redirect by accessing the history prop!
      https://medium.com/@anneeb/redirecting-in-react-4de5e517354a
    */
    /*
      Make GET Request 📮
    */
    axios.post('/api/signin', { username, password })
      .then((response) => {
        if (response.status === 200) {
          setLoginSuccess();
          this.setState({
            redirect: true,
          });
        } else {
          console.log('incorrect data');
        }
        console.log(response);
      })
      .catch(error => console.log(error));
  }

  renderRedirect() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return <React.Fragment />;
  }

  render() {
    const { username } = this.state;
    const { password } = this.state;
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
                  <Text name="username" label="Username" value={username} onChange={this.handleInputChange} />
                </Cell>
                <Cell columns={12}>
                  <Text name="password" label="Password" value={password} onChange={this.handleInputChange} />
                </Cell>
                <Cell columns={12}>
                  <Button unelevated type="submit" value="Submit">Sign in</Button>
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

Signin.propTypes = {};

export default Signin;
