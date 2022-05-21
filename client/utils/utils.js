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
  let loggedIn = false;
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}/auth/decode`, {
    method: "GET",
    headers: {
      'credentials': 'include',
      'x-access-token': cookie.get("token")
    }
  }).then(async(res) => {
    const result = await res.json();
    loggedIn = result.code == 200 ? true : false;
  });

  return loggedIn;
}