/*
  Evan MacHale - N00150552
  05.04.19
  Provider.js
*/

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

/*
  Provider acts as a wrapper at top level for context 📚
  https://www.youtube.com/watch?v=XLJN4JfniH4
*/

export const MyContext = React.createContext();

const Provider = (props) => {
  /*
    globalUserId defined on login success from App
    It is then accessible thorughout the application through context
    It is used to match articles to users when performing HTTP methods
  */
  const { globalUserId } = props;
  const { children } = props;
  return (
    // value to be passed to each Provider.Consumer
    <MyContext.Provider
      value={{
        globalUserId,
        handleArticleDelete: (articleId, getArticles) => {
          axios
            .delete(`api/article/${articleId}`)
            .then((response) => {
              if (response.status === 200) {
                getArticles();
              }
            });
        },
      }}
    >
      { children }
    </MyContext.Provider>
  );
};

Provider.propTypes = {
  globalUserId: PropTypes.string.isRequired,
  children: PropTypes.shape().isRequired,
};

export default Provider;
