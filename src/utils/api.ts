import { BASE_URL } from "./contstants";
import { TEvent } from "./types";

// TODO: что делать с any
class API {
  private _url: string;

  constructor({ url }: { url: string }) {
    this._url = url;
  }

  _checkResponse(res: any) {
    if (res.status === 204) {
      return;
    }

    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res);
  }

  _request(url: string, options: {}) {
    return fetch(`${this._url}${url}`, options).then(this._checkResponse);
  }

  // Auth
  register(username: string, email: string, password: string) {
    return this._request("/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    }).then((res) => res);
  }

  login(identifier: string, password: string) {
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

  getCurrentUser(token: string) {
    return this._request("/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  // Users
  checkUserExists(email: string) {
    return this._request(`/taken-emails/${email}`, {
      method: "GET",
    }).then((data) => data);
  }

  getAllUsers(token: string) {
    return this._request("/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  // Events
  createEvent(token: string, eventData: {}) {
    return this._request("/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }).then((data) => data);
  }

  updateEventDataWithPhotos(token: string, eventData: TEvent) {
    return this._request(`/events/${eventData.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    }).then((data) => data);
  }

  deleteEvent(token: string, eventId: number) {
    return this._request(`/events/${eventId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  getEventsForPublic(startDate: string, endDate: string) {
    let finalURL;

    if (startDate && !endDate) {
      finalURL = `?populate=*&filters[dateStart][$gte]=${startDate}`;
    } else if (startDate && endDate) {
      finalURL = `?populate=*&filters[dateStart][$gte]=${startDate}&filters[dateStart][$lte]=${endDate}`;
    } else {
      finalURL = "";
    }

    return this._request(`/events${finalURL}`, {
      method: "GET",
    }).then((data) => data);
  }

  getEventsForAuth(token: string, startDate: string, endDate: string) {
    let finalURL;

    if (startDate && !endDate) {
      finalURL = `?populate=*&filters[dateStart][$gte]=${startDate}`;
    } else if (startDate && endDate) {
      finalURL = `?populate=*&filters[dateStart][$gte]=${startDate}&filters[dateStart][$lte]=${endDate}`;
    } else {
      finalURL = "";
    }

    return this._request(`/events${finalURL}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  joinEvent(token: string, eventId: number) {
    return this._request(`/events/${eventId}/join`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  leaveEvent(token: string, eventId: number) {
    return this._request(`/events/${eventId}/leave`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  // Files
  getFiles(token: string) {
    return this._request(`/upload/files`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((data) => data);
  }

  uploadFiles(token: string, files: FileList) {
    return this._request(`/upload/files`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": " multipart/form-data",
      },
      body: {
        files: files,
      },
    }).then((data) => data);
  }
}

export const api = new API({
  url: BASE_URL,
});
