/*
  Evan MacHale - N00150552
  20.04.19
  ArticlePage.js
*/

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// Material Components
import { Cell, Row } from '@material/react-layout-grid';
import { Headline3, Headline4, Headline6 } from '@material/react-typography';

/*
  ArticlePage renders an article for reading 👓
  I had planned to have comments down the bottom
*/

class ArticlePage extends Component {
  constructor() {
    super();
    this.state = {
      article: [],
      errorMessage: '',
    };
  }

  componentDidMount() {
    // From the URL, deconstruction is kinda weird for this one
    const { match } = this.props;
    axios.get(`/api/article/${match.params.id}`)
      .then(response => this.setState({ article: response.data }))
      .catch((error) => {
        this.setState({ errorMessage: error.response.data });
      });
  }

  render() {
    const { article, errorMessage } = this.state;
    return (
      <React.Fragment>
        <Row>
          <Cell desktopColumns={3} tabletColumns={1} />
          <Cell desktopColumns={6} tabletColumns={6} phoneColumns={4}>
            {errorMessage ? (
              <Row>
                <Cell desktopColumns={12} tabletColumns={8}>
                  <Headline4>{ errorMessage }</Headline4>
                </Cell>
              </Row>
            ) : (
              <div>
                <Row>
                  <Cell desktopColumns={1} />
                  <Cell desktopColumns={10} tabletColumns={8}>
                    <Headline3>{ article.title }</Headline3>
                  </Cell>
                  <Cell desktopColumns={1} />
                </Row>
                <Row>
                  <Cell desktopColumns={1} />
                  <Cell desktopColumns={10} tabletColumns={8}>
                    <Headline6 className="type-light">{ article.content }</Headline6>
                  </Cell>
                  <Cell desktopColumns={1} />
                </Row>
              </div>
            )}
          </Cell>
          <Cell desktopColumns={3} tabletColumns={1} />
        </Row>
      </React.Fragment>
    );
  }
}

/*
  Really odd here 'this.props.match.params.id' propTypes check
  Thought I'd use shape(), but seems a bit ridiculous
*/
ArticlePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default ArticlePage;
