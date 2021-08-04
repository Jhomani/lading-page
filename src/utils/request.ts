import { getOrCreateStore } from "./with-redux-store";
// import { expireSesion } from "./utils";

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
async function parseJSON(response) {
  return response.status === 204
    ? ""
    : await response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(status) {
  if (status >= 200 && status < 300) return;

  // if (response.status == 401) {
  //   return Router.replace(`/ingreso?goBack=${btoa(Router.asPath)}`);
  // }

  throw new Error(status);
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request(url, options) {
  // expireSesion();
  try {
    let encode = await fetch(url, options);
    checkStatus(encode.status);

    return parseJSON(encode);
  } catch (err) {
    throw new Error(err);
  }
}

export function postOptionsFormData(body = {}, method = "POST") {
  const { userToken } = getOrCreateStore().getState().auth;
  return {
    method,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    body,
  };
}

export function postOptionsWithoutToken(body = {}, method = "POST") {
  return {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
}

export function postOptionsWithoutTokenAndSocietyId(body = {}, method = "POST") {
  const { societyId } = getOrCreateStore().getState().auth;
  return {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...body, societyId }),
  };
}

export function postOptionsWithSocietyId(body = {}, method = "POST") {
  const { userToken, societyId } = getOrCreateStore().getState().auth;
  return {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
    body: JSON.stringify({ ...body, societyId }),
  };
}

export function getOptions(method = "GET") {
  const { userToken } = getOrCreateStore().getState().auth;
  return {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  };
}

export function getOptionsProvideToken(token = "", method = "GET") {
  return {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
}

export function getOptionsWithoutToken(method = "GET") {
  return {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
}

export function getOptionsWithToken(token = "", method = "GET") {
  return {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
}


export function postOptions(body = {}, method = "POST") {
  const store = getOrCreateStore().getState();
  return {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.auth.userToken}`,
    },
    body: JSON.stringify(body),
  };
}

export function putOptions(body = {}, method = "PUT") {
  const store = getOrCreateStore().getState();
  return {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${store.auth.userToken}`,
    },
    body: JSON.stringify(body),
  };
}

export function patchOptions(body = {}, method = "PATCH") {
  const store = getOrCreateStore().getState();
  return {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${store.auth.userToken}`,
    },
    body: JSON.stringify(body),
  };
}

export function deleteOptions(body, method = "DELETE") {
  const store = getOrCreateStore().getState();
  return {
    method,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${store.auth.userToken}`,
    },
    body: JSON.stringify(body),
  };
}
