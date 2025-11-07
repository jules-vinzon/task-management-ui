import axios from 'axios';
const timeout = 30000;

const apiUrl = process.env.REACT_APP_API_URL;
console.log("API URL:", apiUrl);

let headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  // 'Authorization': authHeader,
};

export function* get(uri) {
  return yield fetch(`${apiUrl}${uri}`, {
    headers: headers,
    method: "GET",
  });
}

export function* postWithReqId(uri, data, trxId) {
  return yield fetch(`${apiUrl}${uri}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Request-ID": `${trxId}`,
    },
    method: "POST",
    data,
  });
}

export function* post(uri, data) {
  return yield fetch(`${apiUrl}${uri}`, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function* patch(uri, data) {
  return yield fetch(`${apiUrl}${uri}`, {
    headers: headers,
    method: "PATCH",
    data,
  });
}

export function* PUT(uri, data) {
  return yield fetch(`${apiUrl}${uri}`, {
    headers: headers,
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function* fetchWithForbidden(url, options) {
  const result = yield axios
    .request({
      ...options,
      url,
      baseURL: apiUrl,
      timeout: timeout,
      onDownloadProgress: (progress) => {},
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });

  if (result.status) {
    return result;
  } else {
    if (result.response.status === 401) {
      localStorage.removeItem('idToken');
    } else {
      if (result.response) {
        return result.response;
      }
    }
  }
}
