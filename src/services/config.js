import Index from "../pages/index"; 
import Login from "../pages/login"; 
import Register from "../pages/register"; 
import Chat from '../pages/chat';
export default {

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