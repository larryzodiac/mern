/*
  Evan MacHale - N00150552
  24.03.19
  Home.js
*/

import React, { Component } from 'react';
import axios from 'axios';
// Material Components
import { Cell, Row } from '@material/react-layout-grid';
import { Headline4 } from '@material/react-typography';
// My Components
import Article from './misc/Article';

/*
  Home acts as a dashboard. Browse content or sign in 🏠
*/

class Home extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
    };
    this.getArticles = this.getArticles.bind(this);
  }

  componentDidMount() {
    this.getArticles();
  }

  getArticles() {
    axios.get('/api/home')
      .then(response => this.setState({ articles: response.data }));
  }

  render() {
    const { articles } = this.state;
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
        <Row>
          <Cell desktopColumns={3} tabletColumns={1} />
          <Cell desktopColumns={6} tabletColumns={6} phoneColumns={4}>
            <Row>
              <Cell desktopColumns={12} tabletColumns={8}>
                <Headline4>Search Articles</Headline4>
              </Cell>
            </Row>
            <Row>
              <Cell desktopColumns={12} tabletColumns={8}>
                <hr />
                <br />
              </Cell>
            </Row>
            <Row>
              <Cell desktopColumns={7} tabletColumns={5}>
                {/* Rows in here per articles */}
                { articlesList }
              </Cell>
              <Cell desktopColumns={1} tabletColumns={1} />
              <Cell desktopColumns={4} tabletColumns={2}>
                {/* Rows in here per input */}
                <p>selects</p>
              </Cell>
            </Row>
          </Cell>
          <Cell desktopColumns={3} tabletColumns={1} />
        </Row>
      </React.Fragment>
    );
  }
}

export default Home;
