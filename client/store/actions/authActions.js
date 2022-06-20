const { errorBar, successBar, decodeToken, getProfile } = require("../../utils/utils")
 
export const loadUser = () => {
  return async(dispatch) => {
    await decodeToken().then(async(res) => {
      await getProfile(res?.id).then(async(usr) => {
        if(!usr) return dispatch({
          type: "LOAD_ERROR",
          payload: {}
        });
        
        dispatch({
          type: "LOAD_SUCCESS",
          payload: usr
        });
      })
    })
  }
}

export const signIn = (details) => {
  return async(dispatch) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        'credentials': 'include',
        'Content-Type': 'application/json'
      }
    }).then(async(res) => {
      const result = await res.json();
      if(process.browser) {
        if(result.code == 401) {
          errorBar("You have provided invalid password, please recheck it.");
          dispatch({
            type: "LOGIN_ERROR",
            payload: result
          });
          return;
        } else if(result.code == 200) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: result
          });
        } else if(result.code == 404 && result.type == "user") {
          errorBar("User with provided credentials couldn't be found.");
          dispatch({
            type: "LOGIN_ERROR",
            paylaod: result
          })
        }
      }
    })
  }
}

export const signUp = (details) => {
  return async(dispatch) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    }).then(async(res) => {
      let result = await res.json();
      if(result.code == 409 && result.type == "username") {
        dispatch({
          type: "REGISTER_ERROR",
          payload: result
        });
        errorBar("Username already exist, try the new one.");
        return;
      }
      if(result.code == 409 && result.type == "mail") {
        dispatch({
          type: "REGISTER_ERROR",
          payload: result
        });
        errorBar("Email already exist, try the new one.");
        return;
      }
      if(result.code == 201) {
        dispatch({
          type: "REGISTER_SUCCESS",
          payload: result
        });
      }
    })
  }
}

export const signOut = () => {
  return (dispatch) => {
    dispatch({
      type: "LOGOUT",
      paylaod: {}
    })
  }
}