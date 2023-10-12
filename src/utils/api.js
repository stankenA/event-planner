// TODO: переписать на TS

import { BASE_URL } from "./contstants";

class API {
  constructor({ url }) {
    this._url = url;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }

  _request(url, options) {
    return fetch(`${this._url}${url}`, options).then(this._checkResponse);
  }

  // Auth
  register(username, email, password) {
    return this._request("/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    }).then((res) => res);
  }

  login(identifier, password) {
    return this._request("/auth/local", {
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
  }

  getCurrentUser(token) {
    return this._request("/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  // Users
  checkUserExists(email) {
    return this._request(`/taken-emails/${email}`, {
      method: "GET",
    }).then((data) => data);
  }

  getAllUsers(token) {
    return this._request("/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  // Events
  createEvent(token, eventData) {
    return this._request("/users/me", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }).then((data) => data);
  }

  updateEventDataWithPhotos(token, eventData) {
    return this._request(`/events/${eventData.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }).then((data) => data);
  }

  deleteEvent(token, eventId) {
    return this._request(`/events/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  getEventsForPublic(startDate, endDate) {
    let finalURL;

    if (startDate && !endDate) {
      finalURL = `?populate=filters[dateStart][$gte]=${startDate}&filters[dateStart][$lte]=${startDate}`;
    } else if (startDate && endDate) {
      finalURL = `?populate=filters[dateStart][$gte]=${startDate}&filters[dateEnd][$lte]=${endDate}`;
    }

    return this._request(`/events${finalURL}`, {
      method: "GET",
    }).then((data) => data);
  }

  getEventsForAuth(token, startDate, endDate) {
    let finalURL;

    if (startDate && !endDate) {
      finalURL = `?populate=filters[dateStart][$gte]=${startDate}&filters[dateEnd][$lte]=${startDate}`;
    } else if (startDate && endDate) {
      finalURL = `?populate=filters[dateStart][$gte]=${startDate}&filters[dateEnd][$lte]=${endDate}`;
    }

    return this._request(`events${finalURL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  joinEvent(token, eventId) {
    return this._request(`/events/${eventId}/join`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  leaveEvent(token, eventId) {
    return this._request(`/events/${eventId}/leave`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  // Files
  getFiles(token) {
    return this._request(`/upload/files`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  uploadFiles(token, file) {
    return this._request(`/upload/files`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }
}

export const api = new API({
  url: BASE_URL,
});
