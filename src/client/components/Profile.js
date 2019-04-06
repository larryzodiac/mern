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
import { Headline4 } from '@material/react-typography';
// My Components
import Article from './misc/Article';

/*
  Profile is only available to authenticated users 🔒
*/

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      profile: 'Loading...',
      articles: [],
      redirect: false,
    };
    this.getArticles = this.getArticles.bind(this);
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles() {
    axios.get('/api/profile')
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            profile: response.data.user,
            articles: response.data.articles,
          });
        }
      })
      .catch(() => this.setState({ redirect: true }));
  }

  render() {
    const { profile, articles, redirect } = this.state;
    const articlesList = articles.map(a => (
      <Article
        key={a._id}
        id={a._id}
        userId={a.user_id}
        title={a.title}
        blurb={a.blurb}
        getArticles={this.getArticles}
      />
    ));
    return (
      <React.Fragment>
        { redirect && <Redirect to="/Signin" /> }
        <Row>
          <Cell desktopColumns={4} tabletColumns={1} />
          <Cell desktopColumns={4} tabletColumns={6} phoneColumns={4}>
            <Row>
              <Cell desktopColumns={12} tabletColumns={8}>
                <Headline4>{ `${profile.username}'s Articles` }</Headline4>
              </Cell>
            </Row>
            <Row>
              <Cell desktopColumns={10} tabletColumns={8}>
                <hr />
                <br />
              </Cell>
            </Row>
            <Row>
              <Cell desktopColumns={10} tabletColumns={8}>
                {/* Rows in here per articles */}
                { articlesList }
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
