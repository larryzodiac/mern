/*
  Evan MacHale - N00150552
  20.04.19
  New.js
*/

import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
// Material Components
import { Cell, Row } from '@material/react-layout-grid';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import { Button as Btn } from '@material/react-typography';
// Context
import { MyContext } from '../Provider';

/*
  New is where users submit new articles
*/

class New extends Component {
  static contextType = MyContext;

  constructor() {
    super();
    this.state = {
      title: 'Title',
      blurb: 'Give the reader a summary..',
      content: 'Tell your story..',
      error: '',
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
    const { globalUserId } = this.context;
    const {
      title,
      blurb,
      content,
    } = this.state;
    /*
      Make POST Request 📮
    */
    axios.post(`api/article/${globalUserId}`, {
      title,
      blurb,
      content,
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
        console.log(error.response);
        switch (error.response.data) {
          case "You've left something out.":
            this.setState({ error: error.response.data });
            break;
          default:
        }
      });
  }

  render() {
    const {
      title,
      blurb,
      content,
      error,
      redirect,
    } = this.state;
    return (
      <React.Fragment>
        { redirect && <Redirect to="/" /> }
        <Row>
          <Cell desktopColumns={3} tabletColumns={1} />
          <Cell desktopColumns={6} tabletColumns={6} phoneColumns={4}>
            <form onSubmit={this.handleSubmit}>
              {/* Title */}
              <Row>
                <Cell desktopColumns={1} />
                <Cell desktopColumns={10} tabletColumns={8}>
                  <TextField
                    className="full-width"
                    label="Label"
                    fullWidth
                  >
                    <Input
                      className="full-width-input"
                      name="title"
                      value={title}
                      onChange={this.handleInputChange}
                    />
                  </TextField>
                </Cell>
                <Cell desktopColumns={1} />
              </Row>
              {/* Blurb */}
              <Row>
                <Cell desktopColumns={1} />
                <Cell desktopColumns={10} tabletColumns={8}>
                  <TextField
                    className="full-width-text-area-blurb"
                    label="Label"
                    fullWidth
                    textarea
                  >
                    <Input
                      className="full-width-text-area-input"
                      name="blurb"
                      value={blurb}
                      onChange={this.handleInputChange}
                    />
                  </TextField>
                </Cell>
                <Cell desktopColumns={1} />
              </Row>
              {/* Content */}
              <Row>
                <Cell desktopColumns={1} />
                <Cell desktopColumns={10} tabletColumns={8}>
                  <TextField
                    className="full-width-text-area-content"
                    label="Label"
                    fullWidth
                    textarea
                  >
                    <Input
                      className="full-width-text-area-input"
                      name="content"
                      value={content}
                      onChange={this.handleInputChange}
                    />
                  </TextField>
                </Cell>
                <Cell desktopColumns={1} />
              </Row>
              {/* Button */}
              <Row>
                <Cell desktopColumns={1} />
                <Cell desktopColumns={10} tabletColumns={8}>
                  <br />
                  <br />
                  <Row>
                    <Cell desktopColumns={2}>
                      <Button
                        outlined
                        type="submit"
                        value="Submit"
                      >
                        Publish
                      </Button>
                    </Cell>
                    <Cell desktopColumns={10}>
                      <Btn className="error">{error}</Btn>
                    </Cell>
                  </Row>
                </Cell>
                <Cell desktopColumns={1} />
              </Row>
            </form>
          </Cell>
          <Cell desktopColumns={3} tabletColumns={1} />
        </Row>
      </React.Fragment>
    );
  }
}

New.propTypes = {};

export default New;
