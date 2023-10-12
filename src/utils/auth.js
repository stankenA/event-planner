import { BASE_URL } from "./contstants";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res);
}

function request(endpoint, options) {
  return fetch(`${BASE_URL + endpoint}`, options).then(checkResponse);
}

export const register = (username, email, password) => {
  return request(`/auth/local/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  }).then((res) => {
    return res;
  });
};

export const authorize = (identifier, password) => {
  return request(`/auth/local`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  }).then((data) => {
    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
      return data;
    }
  });
};

export const checkToken = (token) => {
  return request(`/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => data);
};
