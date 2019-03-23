# MERN Development

Year 4 Advanced JavaScript Module Assignment w/ [MonogoDB](https://www.mongodb.com/), [Express](https://expressjs.com/), [React](https://reactjs.org/), [Node](https://nodejs.org/en/), [Three](https://threejs.org/) + [Material](https://material.io/)

Assessment: _develop a full web application stack using MongoDB, Express, React and Node (MERN)._

Site hosted with [Heroku](https://www.heroku.com/) @ [test]().

# Local Setup

This React application uses [MDC React](https://github.com/material-components/material-components-web-react) and requires a bit of extra setup to get started. To be able to run this locally you will need to [install Sass](https://sass-lang.com/install) using `npm install -g sass`.

Then clone the repository and install the app regularly with `npm install`.

To get MDC React Components to work with `create-react-app` you need to set a `SASS_PATH` environment variable that points to your `node_modules` directory. To quickly do this on OS X enter the following in your command line:

```sh
export SASS_PATH=./node_modules
```

If you're on Windows use the following:

```bat
SET SASS_PATH=.\node_modules
```

If you want to permanently add this to your environment, read this doc about [adding environment variables](https://github.com/material-components/material-components-web-react/blob/master/docs/adding-env-variables.md).

You should now be ready to go, navigate to the app in your command line and run `npm run dev`

# MongoDB

The project utilises Mongo's [Atlas](https://www.mongodb.com/cloud/atlas) cloud services so the database is ready to use out of the box and is configured to be accessible from any IP address.

If you want to run the database locally, you will need Mongo's [Community Edition](https://docs.mongodb.com/manual/administration/install-community/) installed on your machine. You can follow their instructions [here](https://docs.mongodb.com/manual/installation/). Note that you are required to create a folder `/data/db` on Mac or `C:\data\db` on Windows to act as a data store for Mongo. Once installed you need to have `mongod` running on your machine and listening for connections.

You can use [Robot3T](https://robomongo.org/) or [Compass](https://www.mongodb.com/products/compass) as a GUI to manage the data in MongoDB. If you want to use the Atlas cloud, details to connect to the database are found at `src/server/server.js`. If you want to use the local machine you should create a database that contains a collection named users.

Your local database connection URL will be similar to `mongodb://localhost:27017/your-db-name`

This readme is based on the MDC React getting started readme. If you have any problems refer to it [here](https://github.com/material-components/material-components-web-react/blob/master/README.md).

This readme also references the [IADT-AdvancedJS](https://github.com/IADT-AdvancedJS) GitHub mern-full-stack getting started readme. You can refer to it [here](https://github.com/IADT-AdvancedJS/mern-full-stack).
