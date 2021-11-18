export default {
  firebase: {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  },
  routes: {
    index: {
      pathname: "/",
      isCaseSensitive: true,
      isProtected: false
    },
    login: {
      pathname: "/login",
      isCaseSensitive: false,
      isProtected: false
    },
    register: {
      pathname: "/register",
      isCaseSensitive: false,
      isProtected: false
    },
    chat: {
      pathname: "/chat",
      isCaseSensitive: false,
      isProtected: true
    },
  }
};

