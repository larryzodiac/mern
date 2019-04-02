/*
  Evan MacHale - N00150552
  24.03.19
  Signup.js
*/

import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// Material Design Components
import { Cell, Row } from '@material/react-layout-grid';
import Button from '@material/react-button';
import { Headline4 } from '@material/react-typography';
// My Components
import Text from './misc/Text';

/*
  Signup renders a form + handles POST requests 🔒
*/

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameError: '',
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      confirm: '',
      confirmError: '',
      redirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      username,
      email,
      password,
      confirm,
    } = this.state;
    /*
      Make POST Request 📮
    */
    axios.post('api/signup', {
      username,
      email,
      password,
      confirm,
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ redirect: true });
        }
      })
      .catch((error) => {
        /*
          Validate 🔒
        */
        console.log(error.response)
        switch (error.response.data) {
          case 'Missing credentials':
            this.setState({
              usernameError: error.response.data,
              emailError: error.response.data,
              passwordError: error.response.data,
              confirmError: error.response.data,
            });
            break;
          case 'Invalid email':
            this.setState({
              usernameError: '',
              emailError: error.response.data,
              passwordError: '',
              confirmError: '',
            });
            break;
          case 'Passwords do not match':
            this.setState({
              usernameError: '',
              emailError: '',
              passwordError: error.response.data,
              confirmError: error.response.data,
            });
            break;
          default:
        }
      });
  }

  render() {
    const {
      username,
      email,
      password,
      confirm,
      redirect,
    } = this.state;
    const {
      usernameError,
      emailError,
      passwordError,
      confirmError,
    } = this.state;
    return (
      <React.Fragment>
        { redirect && <Redirect to="/Signin" /> }
        <Row>
          <Cell columns={5} />
          <Cell columns={2}>
            <form onSubmit={this.handleSubmit}>
              <Row>
                <Cell columns={12}>
                  <Headline4>Create an Account</Headline4>
                </Cell>
                <Cell columns={12}>
                  <Text name="username" label="Username" value={username} error={usernameError} onChange={this.handleInputChange} />
                </Cell>
                <Cell columns={12}>
                  <Text name="email" label="Email" value={email} error={emailError} onChange={this.handleInputChange} />
                </Cell>
                <Cell columns={12}>
                  <Text name="password" type="password" label="Password" value={password} error={passwordError} onChange={this.handleInputChange} />
                </Cell>
                <Cell columns={12}>
                  <Text name="confirm" type="password" label="Confirm" value={confirm} error={confirmError} onChange={this.handleInputChange} />
                </Cell>
                <Cell columns={12}>
                  <Button type="submit" value="Submit">Sign up</Button>
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

export default Signup;
