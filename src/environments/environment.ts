// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBqTSilSuWXzYMMDnckvPnezBJeaIUaANw",
    authDomain: "sosofish-12c6b.firebaseapp.com",
    databaseURL: "https://sosofish-12c6b.firebaseio.com",
    projectId: "sosofish-12c6b",
    storageBucket: "sosofish-12c6b.appspot.com",
    messagingSenderId: "44026798473"
  },
  mapbox: {
    accessToken: 'pk.eyJ1IjoieXVsYW5nY2hhbyIsImEiOiJjamI4c3lhcjUwOXBnMzNtcnJyc20yYmR0In0.b8G8FMBQvQbGVeeZwQloFQ'
  }
};
