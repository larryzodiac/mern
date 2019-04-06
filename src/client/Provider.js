/*
  Evan MacHale - N00150552
  05.04.19
  Provider.js
*/

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

/*
  Provider acts as a wrapper at top level for context
  https://www.youtube.com/watch?v=XLJN4JfniH4
*/

export const MyContext = React.createContext();

const Provider = (props) => {
  const { globalUserId } = props;
  const { children } = props;
  return (
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
            })
            .catch(error => console.log(error));
        },
      }}
    >
      { children }
    </MyContext.Provider>
  );
};

Provider.propTypes = {
  globalUserId: PropTypes.string.isRequired,
};

export default Provider;
