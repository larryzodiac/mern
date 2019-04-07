/*
  Evan MacHale - N00150552
  20.04.19
  New.js
*/

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// Material Components
import { Cell, Row } from '@material/react-layout-grid';
import TextField, { Input } from '@material/react-text-field';
import Button from '@material/react-button';
import { Button as Btn } from '@material/react-typography';
// Context
import { MyContext } from '../Provider';

/*
  Publish is where users submit new articles ✒️
  This component takes an optional URL parametre ':id?' from react-router
  Depending on whether the id exists or not
  Publish displays a article template(create) or populated article(update) for submission
*/

class Publish extends Component {
  static contextType = MyContext;

  constructor() {
    super();
    this.state = {
      title: 'Title',
      blurb: 'Give the reader a summary..',
      content: 'Tell your story..',
      error: '',
      update: false,
      redirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // If an article is found, populate the form + set update true
  componentDidMount() {
    const { match } = this.props;
    axios.get(`/api/article/${match.params.id}`)
      .then((response) => {
        this.setState({
          title: response.data.title,
          blurb: response.data.blurb,
          content: response.data.content,
          update: true,
        });
      })
      .catch(() => this.setState({ update: false }));
  }

  handleInputChange(event) {
    const { target } = event;
    const { value, name } = target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { globalUserId } = this.context;
    const { match } = this.props;
    const {
      title,
      blurb,
      content,
      update,
    } = this.state;
    /*
      Make POST Request 📮
      If update is true set the appropriate api endpoint URL(for create or update)
    */
    let url;
    if (update) {
      url = `/api/article/${match.params.id}`;
    } else {
      url = `/api/user/${globalUserId}/article`;
    }
    axios.post(url, {
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

Publish.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

// :id? is optional, default it to a blank string
Publish.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};

export default Publish;
