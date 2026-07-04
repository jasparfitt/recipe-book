# Coook Mobile App
Built with React Native and Expo.

## Development
To start make sure you have the eas cli setup. Then install packages with `npm install` in the `/native` and `/shared` folder. Then link up the local shared code with `npm link ../shared/`. Then run `npm run build-dev` once that has finished building download and install the dev version of the app. Then run `npm start` to start the development server.

## Build
The app will build on every commit to main, but if you need to build it manually run the [Github action](https://github.com/jasparfitt/recipe-book/actions/workflows/mobileApp.yml). Or you can build locally with `eas build`.
