import Index from "../pages/index"; 
import Login from "../pages/login"; 
import Register from "../pages/register"; 
import Chat from '../pages/chat';
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
      component:Index,
      isProtected: false
    },
    login: {
      pathname: "/login",
      isCaseSensitive: false,
      component:Login,
      isProtected: false
    },
    register: {
      pathname: "/register",
      isCaseSensitive: false,
      component:Register,
      isProtected: false
    },
    chat: {
      pathname: "/chat",
      isCaseSensitive: false,
      component:Chat,
      isProtected: true
    }
  }
};