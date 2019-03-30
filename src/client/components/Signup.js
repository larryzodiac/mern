/*
  Evan MacHale - N00150552
  24.03.19
  Signup.js
  + + + + + + + + + + +
  + World Map 🌀 (Pages)
  + Index
  +   ¬ App
  +     ¬ Portal
  +       ¬ Signin
  +       ¬ Signup      <--- You are here 🚀
  +     ¬ World
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
      email: '',
      password: '',
      confirm: '',
      redirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const { email } = this.state;
    const { password } = this.state;
    const { confirm } = this.state;
    /*
      Validate Password 🔒
    */
    let passwordValid;
    if (password === confirm && password !== '' && confirm !== '') {
      passwordValid = true;
    } else {
      passwordValid = false;
    }
    /*
      Make POST Request 📮
    */
    if (passwordValid) {
      axios.post('api/signup', {
        username,
        email,
        password,
      })
        .then((response) => {
          if (response.status === 200) {
            this.setState(prevState => ({
              redirect: !prevState.redirect,
            }));
          } else {
            console.log('incorrect data');
          }
        })
        .catch(error => console.log(error));
    } else {
      console.log('incorrect data');
    }
  }

  render() {
    const { username } = this.state;
    const { email } = this.state;
    const { password } = this.state;
    const { confirm } = this.state;
    const { redirect } = this.state;
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
                  <Text name="username" label="Username" value={username} onChange={this.handleInputChange} />
                </Cell>
                <Cell columns={12}>
                  <Text name="email" label="Email" value={email} onChange={this.handleInputChange} />
                </Cell>
                <Cell columns={12}>
                  <Text name="password" label="Password" value={password} onChange={this.handleInputChange} />
                </Cell>
                <Cell columns={12}>
                  <Text name="confirm" label="Confirm" value={confirm} onChange={this.handleInputChange} />
                </Cell>
                <Cell columns={12}>
                  <Button unelevated type="submit" value="Submit">Sign up</Button>
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
