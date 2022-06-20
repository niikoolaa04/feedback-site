import { successBar } from '../../utils/utils'
import Router from 'next/router'
import cookie from 'js-cookie'

const initialState = {
  id: null,
  username: null,
  profileName: null,
  mail: null,
  picture: null,
  role: 0,
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case "REGISTER_SUCCESS":
      successBar("Registration successful, redirecting in 3 seconds.");
      setTimeout(function() {
         Router.push("/")
      }, 3000);
      return state;
    case "LOGIN_SUCCESS":
      cookie.set("token", action.payload.token, {
        expires: 1,
      });
      successBar("Login successful, redirecting in 3 seconds.", 3000);
      setTimeout(function() {
        Router.push("/")
      }, 3000);

      return {
        id: action.payload.user.id,
        username: action.payload.user.username,
        profileName: action.payload.user.profileName,
        mail: action.payload.user.mail,
        picture: action.payload.user.picture,
        role: action.payload.user.role || 0
      }
    case "LOAD_SUCCESS":
      console.log(action.payload)
      return {
        id: action.payload.id,
        username: action.payload.username,
        profileName: action.payload.profileName,
        mail: action.payload.mail,
        picture: action.payload.profilePicture,
        role: action.payload.role
      }
    case "LOAD_ERROR":
      return state
    default:
      return state;
  }
}

export default authReducer;