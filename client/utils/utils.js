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

export const warningBar = (message, pos = "top-right", closeTime = 5000) => toast.warning(message, {
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
  let logStatus = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/decode`, {
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

export const decodeToken = async() => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/decode`, {
    method: "GET",
    headers: {
      'credentials': 'include',
      'x-access-token': cookie.get("token")
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const getProfile = async(user) => {
  let profile = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user}`, {
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
  let poll = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/polls/new`, {
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
  let survey = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/surveys/new`, {
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
  let poll = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/polls/${id}`, {
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

export const getSurvey = async(id) => {
  let survey = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/surveys/${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });

  return survey;
}

export const submitPoll = async(poll, user, selOption) => {
  const voteDetails = {
    user: user ? user?.id : '-1',
    vote: selOption,
  };

  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/polls/${poll}/vote`, {
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

export const submitSurvey = async(survey, user, answersList) => {
  const surveyDetails = {
    user: user ? user?.id : '-1',
    answers: answersList,
  };

  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/surveys/${survey}/vote`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(surveyDetails)
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const createComment = async(commentDetails) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/comments/new`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentDetails)
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const editProfile = async(profileDetails, user) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(profileDetails)
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const getAllPolls = async() => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/polls/list`, {
    headers: {
      method: "GET",
      'Content-Type': 'application/json',
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const getAllSurveys = async() => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/surveys/list`, {
    headers: {
      method: "GET",
      'Content-Type': 'application/json',
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const getAllComments = async(id) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/comments`, {
    headers: {
      method: "GET",
      'Content-Type': 'application/json',
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const getUserSurveys = async(id) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/surveys`, {
    headers: {
      method: "GET",
      'Content-Type': 'application/json',
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const getUserPolls = async(id) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/polls`, {
    headers: {
      method: "GET",
      'Content-Type': 'application/json',
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}