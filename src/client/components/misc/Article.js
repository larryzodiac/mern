/*
  Evan MacHale - N00150552
  02.04.19
  Article.js - Miscellaneous modular components folder🔨
*/

/* eslint max-len: ["error", { "code": 200 }] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Material Components
import { Cell, Row } from '@material/react-layout-grid';
import { Body2, Headline4, Overline } from '@material/react-typography';

/*
  AppBar used for navigation 🚩
*/

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      id,
      title,
      blurb,
    } = this.props;
    return (
      <Row>
        <Cell desktopColumns={12} tabletColumns={8}>
          <Overline className="type-light">tag</Overline>
          <Link to={`/article/${id}`}>
            <Headline4 className="title">{ title }</Headline4>
            <Body2 className="type-light">{ blurb }</Body2>
          </Link>
          <Body2>author</Body2>
        </Cell>
      </Row>
    );
  }
}

Article.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
};

export default Article;
