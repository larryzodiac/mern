/*
  Evan MacHale - N00150552
  20.04.19
  New.js
*/

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
// Material Components
import { Cell, Row } from '@material/react-layout-grid';
import { Headline3, Headline4, Headline6 } from '@material/react-typography';

/*
  New is where users submit new articles
*/

class New extends Component {
  constructor() {
    super();
    this.state = {
      title: 'Title',
      content: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    // axios.get(`/api/article/${match.params.id}`)
    //   .then(response => this.setState({ article: response.data }))
    //   .catch((error) => {
    //     this.setState({ errorMessage: error.response.data });
    //   });
  }

  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Cell desktopColumns={3} tabletColumns={1} />
          <Cell desktopColumns={6} tabletColumns={6} phoneColumns={4}>
            <Row>
              <Cell desktopColumns={1} />
              <Cell desktopColumns={10} tabletColumns={8}>
                <Headline3>TITLE</Headline3>
              </Cell>
              <Cell desktopColumns={1} />
            </Row>
            <Row>
              <Cell desktopColumns={1} />
              <Cell desktopColumns={10} tabletColumns={8}>
                <Headline6 className="type-light">Content</Headline6>
              </Cell>
              <Cell desktopColumns={1} />
            </Row>
          </Cell>
          <Cell desktopColumns={3} tabletColumns={1} />
        </Row>
      </React.Fragment>
    );
  }
}

New.propTypes = {};

export default New;
