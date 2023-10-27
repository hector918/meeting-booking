const API = process.env.REACT_APP_API_URL;
let SINGLE_USER_MODE = undefined;
let default_fetch_options = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

function error_handle(error) {
  console.error(error);
}

function fetch_post(url, fetchOptions, callback, method = 'POST') {
  fetchOptions.method = method;
  fetchOptions.headers = {
    ...default_fetch_options,
    ...fetchOptions.headers
  }
  if (fetchOptions.headers['Content-Type'] === "delete")
    delete fetchOptions.headers['Content-Type'];
  //add cookies before fire
  fetchOptions.credentials = "include";
  fetch(url, fetchOptions)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch(error => {
      error_handle(error);
      callback(error);
    });
}
function fetch_patch(url, fetchOptions, callback) {
  fetch_post(url, fetchOptions, callback, 'PATCH');
}
function fetch_put(url, fetchOptions, callback) {
  fetch_post(url, fetchOptions, callback, 'PUT');
}

function fetch_get(url, callback) {
  const body = {
    method: "GET",
    headers: {
      ...default_fetch_options,
    },
    credentials: "include",
  }

  fetch(url, body)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch(error => {
      error_handle(error);
      callback({ error: "fetch error" });
    });
}
function fetch_delete(url, callback) {
  const body = {
    method: "DELETE",
    headers: {
      ...default_fetch_options,
    },
    credentials: "include",
  }

  fetch(url, body)
    .then((response) => response.json())
    .then((data) => {
      callback(data);
    })
    .catch(error => {
      error_handle(error);
      callback({ error: "fetch error" });
    });
}

async function fetch_get_async(url) {
  try {
    const body = {
      method: "GET",
      headers: {
        ...default_fetch_options,
      },
      credentials: "include",
    };
    const response = await fetch(url, body);
    const ret = await response.json();
    return ret;
  } catch (error) {
    error_handle(error);
    return error;
  }
}
async function fetch_post_async(url, body) {
  try {
    body.method = "POST";
    body.headers = {
      ...body.headers,
      ...default_fetch_options,
    }
    //add cookies when fired
    body.credentials = "include";
    const res = await fetch(url, body);
    return res;
  } catch (error) {
    error_handle(error);
    return false;
  }
}
////////////////////////////////////////////////////////
function getUserProfile(callback) {
  fetch_get(`${API}/is_auth`, callback);
  /**
   * {email
: 
"zoarcn@gmail.com"
email_verified
: 
true
given_name
: 
"Qi"
locale
: 
"zh-CN"
name
: 
"Qi"
nickname
: 
"zoarcn"
picture
: 
"https://lh3.googleusercontent.com/a/ACg8ocL5IRRQxIy7tdf5Uxp63Ao3FGK8QRNE6e7QGw0jfKD1I2Y=s96-c"
sid
: 
"qXXjULy3pmccWSgG_nQTetyHwkxvb2De"
sub
: 
"google-oauth2|111054304098293084418"
updated_at
: 
"2023-10-27T20:26:49.508Z"}
   */
}

////////////////////////////////////////////////////////
export default { getUserProfile }