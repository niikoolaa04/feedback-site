import { toast } from 'react-toastify';
import cookie from 'js-cookie'

export const errorBar = (message, pos = "top-right", closeTime = 5000) => toast.error(message, {
  position: pos,
  autoClose: closeTime,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
});

export const infoBar = (message, pos = "top-right", closeTime = 5000) => toast.info(message, {
  position: pos,
  autoClose: closeTime,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
});

export const successBar = (message, pos = "top-right", closeTime = 5000) => toast.success(message, {
  position: pos,
  autoClose: closeTime,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
});

export const myLoader = ({ src }) => {
  return src;
}

export const isLogged = async() => {
  let logStatus = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}/auth/decode`, {
    method: "GET",
    headers: {
      'credentials': 'include',
      'x-access-token': cookie.get("token")
    }
  }).then(async(res) => {
    const result = await res.json();
    return result.code == 200 ? true : false;
  });

  return logStatus;
}

export const getCurrentUser = async(setUser) => {
  let logStatus = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}/auth/decode`, {
    method: "GET",
    headers: {
      'credentials': 'include',
      'x-access-token': cookie.get("token")
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });

  setUser(logStatus);
}

export const getProfile = async(user) => {
  let profile = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/users/${user}`, {
    method: "GET",
    headers: {
      'credentials': 'include',
      'Content-Type': 'application/json'
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });

  return profile;
}

export const createPoll = async(data) => {
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/polls/new`, {
    method: "POST",
    headers: {
      'credentials': 'include',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async(res) => {
    const result = await res.json();
    console.log(result);
  });
}