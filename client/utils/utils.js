import { toast } from 'react-toastify';
import cookie from 'js-cookie'
import Poll from '../../server/models/Poll';

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
  let poll = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/polls/new`, {
    method: "POST",
    headers: {
      'credentials': 'include',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });

  return poll;
}

export const createSurvey = async(data) => {
  let survey = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/surveys/new`, {
    method: "POST",
    headers: {
      'credentials': 'include',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });

  return survey;
}

export const getPoll = async(id) => {
  let poll = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/polls/${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });

  return poll;
}

export const submitPoll = async(poll, user, selOption) => {
  const voteDetails = {
    user: user ? user?.id : '-1',
    vote: selOption,
  };

  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/polls/${poll}/vote`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(voteDetails)
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}