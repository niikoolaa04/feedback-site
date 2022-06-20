import { toast } from 'react-toastify';
import cookie from 'js-cookie';

export const errorBar = (message, closeTime = 5000, pos = "top-right") => toast.error(message, {
  position: pos,
  autoClose: closeTime,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
});

export const infoBar = (message, closeTime = 5000, pos = "top-right") => toast.info(message, {
  position: pos,
  autoClose: closeTime,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
});

export const successBar = (message, closeTime = 5000, pos = "top-right") => toast.success(message, {
  position: pos,
  autoClose: closeTime,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
});

export const warningBar = (message, closeTime = 5000, pos = "top-right") => toast.warning(message, {
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
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/decode`, {
    method: "GET",
    headers: {
      'credentials': 'include',
      'x-access-token': cookie.get("token")
    }
  }).then(async(res) => {
    const result = await res.json();
    return result.code == 200 ? true : false;
  });
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
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user}`, {
    method: "GET",
    headers: {
      'credentials': 'include',
      'Content-Type': 'application/json'
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const createPoll = async(data) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/polls/new`, {
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
}

export const createSurvey = async(data) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/surveys/new`, {
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
}

export const getPoll = async(id) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/polls/${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const getSurvey = async(id) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/surveys/${id}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
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
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const getAllSurveys = async() => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/surveys/list`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const getAllProfiles = async() => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/list`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const getAllComments = async(id) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/comments`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const getUserSurveys = async(id) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${id}/surveys`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const getAllUsers = async() => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
    method: "GET"
  }).then(async(res) => {
    let result = await res.json();
    return result;
  })
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

export const postReputation = async(repType, user, author) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user}/reputation/${repType}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      author
    })
  }).then(async(res) => {
    const result = await res.json();
    return result;
  });
}

export const deleteUser = async(user) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user}`, {
    method: "DELETE",
  }).then(async(res) => {
    const result = await res.json();
    return result;
  })
}

export const deletePoll = async(poll) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/polls/${poll}`, {
    method: "DELETE",
  }).then(async(res) => {
    const result = await res.json();
    return result;
  })
}

export const deleteSurvey = async(survey) => {
  return await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/surveys/${survey}`, {
    method: "DELETE",
  }).then(async(res) => {
    const result = await res.json();
    return result;
  })
}