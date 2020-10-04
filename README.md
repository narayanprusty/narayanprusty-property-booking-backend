<h1 align="center">Property Management Backend</h1>

## ❯ Run the project locally

### Step 1: Setup

Then setup your application environment.

```bash
yarn run setup
```

> This installs all dependencies with yarn. After that it migrates the database and seeds some test data into it. So after that your development environment is ready to use.

### Step 2: Tests

Go to the project dir and run tests with yarn script.

```bash
yarn test
```

### Step 3: Serve your App

Go to the project dir and start your app with this yarn script.

```bash
yarn start serve
```

> This starts a local server using `nodemon`, which will watch for any file changes and will restart the server according to these changes.
>
> The server address will be displayed to you as `http://0.0.0.0:3000`.
>
> Make sure PostgreSQL is running locally and `HERE_API_KEY` is set. 

## ❯ Building the project and run it

- Run `yarn start build` to generated all JavaScript files from the TypeScript sources (There is also a vscode task for this called `build`).
- To start the builded app located in `dist` use `yarn start`.

## ❯ API Documentation

After the server is running you can access the Swagger API documentation in browser using URL: `http://admin:1234@localhost:3000/swagger`

