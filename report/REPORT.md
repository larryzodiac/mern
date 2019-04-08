# Project Report

Evan MacHale

N00150552 ~ Year 4 Creative Computing

Assessment: _develop a full web application stack using MongoDB, Express, React and Node (MERN)._

Site hosted with [Glitch](https://glitch.com/) @ [https://larryzodiac-mern.glitch.me/](https://larryzodiac-mern.glitch.me/).

# Introduction

This project is an attempt to mimic [Medium](https://medium.com/). An open publishing platform for writers around the world.

# User Stories

There are two types of users who use Medium. The first is a casual reader who browses and reads articles they enjoy; The second is a writer player who uses Medium as a platform for publishing their material.

Casual reader - conditions/satisfactions :

- As a casual reader, I want to browse _articles_, so that I can read them in my spare time.
- As a casual reader, I want to search for _articles_, so to better find reading material that interests me.

Writer - conditions/satisfactions :

- As a writer, I want to _create_ an account, so to _publish_ my material.
- As a writer, I want the option to _edit_ or _delte_ my material, if I'm not happy with it.

Broken down details :

- Provide list components for articles that readers may browse.
- Provide login/register functionality so writers may publish/store their material.
- Provide utility components that writers may use to update or delete articles.
- Provide navigation menus to travel between each section.

# Wireframe

Wireframe (pre-development) from stories depicts three pages :

- Home page
- Signin/Signup page
- Profile page

Each page will be wrapped within a number of top-level components that implement _React Router, React Context, MDC AppBar_ and _MDC Layout Grid._

# Application Description

The React application is composed of an _App.js, Index.js, Provider.js_ and a _components_ folder.

The components folder contains subfolders for each page’s components e.g `<Home/>` and `<Profile/>` and a collection of miscellaneous components for modular use e.g `<Text/>` form field and `<Article/>` viewing components.

Provider.js acts as a wrapper at top-level for React context. It defines a `<Context.Provider/>` component that allows consuming components to subscribe to context changes.

App.js contains the top-level wrapper components mentioned above. It is where the page components are imported and rendered based on browser URLs and using [react-router](https://reacttraining.com/react-router/core/guides/philosophy).

Index.js imports App.js and appends the application to the DOM.

### App.js

The primary function of `<App/>` is to keep track of whether a user is logged in or not, and if so, to store the user id.

App.js achieves this by holding a `setLoginSuccess()` function and `logout()` function. These are passed down to child components who's job it is to handle login/register operations.

On top of this, when App.js is mounted to the DOM, it makes an initial axios request to `/api/token` that checks for the existence of any web tokens from recently logged in users and sets login status accordingly.

```javascript
componentDidMount() {
  // Who goes there? Where is your token? 👮
  axios.get('/api/token')
    .then((response) => {
      if (response.status === 200) {
        this.setState({
          loginSuccess: true,
          id: response.data,
        });
      }
    })
    .catch(() => this.setState({ loginSuccess: false }));
}
```

If successful, this state id data is passed as a _prop_ to the `<Provider/>` component so to expose the user's id to any level of the application.

Lastly, App.js is responsible for holding `<AppBar/>`, `<BrowserRouter/>` and `<Grid/>` components for a site navigation, declarative routing and grid systems respectively.

Pseudo-code:

```javascript
class App {

  <Provider>
    <BrowserRouter>
      <AppBar />
      <TopAppBarFixedAdjust>
        <Grid>
          <Switch>
            <Route component={Home} />
            <Route component={Profile} />
            // ...More awesome pages
          </Switch>
        </Grid>
      </TopAppBarFixedAdjust>
    </BrowserRouter>
  </Provider>

}

export App;
```

### AppBar.js

The `<AppBar/>` component exists solely to cut down the size of `<App/>`. It utilises [Material Design Components(MDC) React](https://github.com/material-components/material-components-web-react)’s `<TopAppBar/>` component for site navigation.

_AppBar.js_ accepts a single boolean prop from _App.js_ indicating if a user is logged in or not. A conditional will render either icons to indicate login/register or logout.

### Provider.js

As mentioned, the `<Provider/>` component acts as a top-level wrapper component for React's Context API.

_Provider.js_ is a functional component that returns a context _Provider_ component based on an initialised context. Inside this component is rendered `{props.children}` which enables other components down the tree to access the provider(at the top-level).

To access this data we must use what is known as a _Consumer_ in our other components.

```javascript
const MyContext = React.createContext(defaultValue);
// ...
<MyContext.Provider>
  { props.children }
</MyContext.Provider>
// ... ->
<MyContext.Consumer />
```

Now, wherenever a consumer is rendered, a respective component will have access to context.

The context provider also takes a value prop which passes down the context:

```javascript
<MyContext.Provider
  value={{
    globalUserId,
    // ...
  }}
>
  { props.children }
</MyContext.Provider>
```

This is especially useful as we want the user's id to be accessible throughout the application for conditional UI rendering and in Express request parametres.

### Article.js

The `<Article/>` component is used in both `<Home/>` and `<Profile/>` page components as both render a list of articles.

_Article.js'_ primary function is to provide users a link to an article, or provide _edit_ or _delete_ options for logged in users. Specifically, on a user's own _articles._

_Article.js_ uses React's _Context API_ to achieve this.

Previously mentioned in _App.js_, if a user is logged in, their id is passed as a prop to the `<Provider/>` wrapper component. The id is defined as `globaUserId` and is accessible throughout the application.

Note, when an `<Article/>` is rendered, both it's `id` and the `userId` are passed as props:

```javascript
<Article
  id={a._id}
  userId={a.user_id}
  // ...
/>
```

Context is invoked to access `globalUserId` in `<Article/>` by importing the context and specifying class `contextType`:

```javascript
import { MyContext } from '../../Provider';

class Article extends Component {
  static contextType = MyContext;
  // ...
  const { globalUserId } = this.context;
  // ...
}
```

Then a condition checking if the article's `userId` matches the `globalUserId` is specified in render:

```javascript
if (globalUserId === userId) {
  articleOptions = (
    <MyContext.Consumer /> //...
  );
} else {
  articleOptions = <React.Fragment />;
}
```

Therefore, if a user is logged and their id is specified in context as `globalUserId`, _and_, any article's `userId` props match it; a user may see rendered both _edit_ and _delete_ options for a respective `<Article/>` component.

The update opperation is a React Router link to a route with an optional id parametre:

```javascript
<Link to={`/publish/${id}`}>
  <IconButton /> //...
</Link>
```

The delete operation is stored in context and is accessed the same way as before except via a callback:

```javascript
articleOptions = (
  <MyContext.Consumer>
    {context => (
      <React.Fragment>
        <Link to={`/publish/${id}`}>
          <IconButton />
        </Link>
        <IconButton onClick={() => context.handleArticleDelete(id, getArticles)} />
      </React.Fragment>
    )}
  </MyContext.Consumer>
);
```

```javascript
<div>
  <Link to={`/article/${id}`}>
    <Headline4>{ title }</Headline4>
    <Body2>{ blurb }</Body2>
  </Link>
  { articleOptions }
</div>
```

Note `getArticles()` is passed to the `handleArticleDelete()` function, we'll discuss that next.

### Home.js

The `<Home/>` component is rendered based on App's routes and acts as a landing page for the application. The page contains a list of all articles on the site.

_Home.js_ makes a get request for the entire _articles collection_ in the database and simply renders them using a map function on the `<Article/>` component, a sort of template for previewing an article's data.

Note however, that this operation is held in a seperate function `getArticles()`.

This is used as a means to trigger re-renders on list of `<Article/>` components when, specifically, a delete operation is carried out.

The `getArticles()` function is passed to every `<Article/>` to implement this.

```javascript
getArticles() {
  axios.get('/api/home')
    .then(response => this.setState({ articles: response.data }));
}

render() {
  const { articles } = this.state;
  const articlesList = articles.map(a => (
    <Article
      id={a._id}
      userId={a.user_id}
      getArticles={this.getArticles}
      // ...
    />
  ));
  // ...
}
```

# References

- [JWT with Passport authentication](https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314)
- [IADT Advanced JavaScript](https://iadt-advancedjs.github.io/)
- [Redirecting in React](https://medium.com/@anneeb/redirecting-in-react-4de5e517354a)
- [Authentication For Your React and Express Application w/ JSON Web Tokens](https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0)
- [Wes Bos ~ Context API](https://www.youtube.com/watch?v=XLJN4JfniH4)
- [Adding a Sass Stylesheet](https://facebook.github.io/create-react-app/docs/adding-a-sass-stylesheet)
