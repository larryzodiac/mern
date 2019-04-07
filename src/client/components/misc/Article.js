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
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
// Context
import { MyContext } from '../../Provider';

/*
  Article acts as a gateway to an individual article page 🔌
  It offers options based on login status + context
  Can also trigger re-renders in parents when an action is performed on an Article
*/

class Article extends Component {
  static contextType = MyContext;

  /*
    Article needs to be a class as it uses context
  */
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      id,
      userId,
      title,
      blurb,
      getArticles,
    } = this.props;
    const { globalUserId } = this.context;
    let articleOptions;
    if (globalUserId === userId) {
      articleOptions = (
        <MyContext.Consumer>
          {/* Render prop passed as a child */}
          {context => (
            <React.Fragment>
              <Cell desktopColumns={1} tabletColumns={1} phoneColumns={1}>
                <Link to={`/publish/${id}`}>
                  <IconButton>
                    <MaterialIcon icon="create" />
                  </IconButton>
                </Link>
              </Cell>
              <Cell desktopColumns={1} tabletColumns={1} phoneColumns={1}>
                {/* This took FOREVORRRRRRR.. make sure to comment for Andrew */}
                <IconButton onClick={() => context.handleArticleDelete(id, getArticles)}>
                  <MaterialIcon icon="delete" />
                </IconButton>
              </Cell>
            </React.Fragment>
          )}
        </MyContext.Consumer>
      );
    } else {
      articleOptions = <React.Fragment />;
    }
    return (
      <Row>
        <Cell desktopColumns={12} tabletColumns={8}>
          <Overline className="type-light">tag</Overline>
          <Link to={`/article/${id}`}>
            <Headline4 className="title">{ title }</Headline4>
            <Body2 className="type-light">{ blurb }</Body2>
          </Link>
          <Row>
            <Cell desktopColumns={10} tabletColumns={6} phoneColumns={2}>
              <Body2>author</Body2>
            </Cell>
            { articleOptions }
          </Row>
        </Cell>
      </Row>
    );
  }
}

Article.propTypes = {
  id: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
  getArticles: PropTypes.func.isRequired,
};

export default Article;
