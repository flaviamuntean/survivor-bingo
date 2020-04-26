import axios from "axios";

const csrfToken = document.querySelector("meta[name=csrf-token]");
if (csrfToken) {
  axios.defaults.headers.common["X-CSRF-Token"] = csrfToken.content;
}

const parseErrors = (error) => {
  const errors = [];
  const { response } = error;
  if (response && response.data.error) {
    errors.push(response.data.error);
  }
  if (response && response.data.errors) {
    return response.data.errors;
  }
  if (errors.length === 0) {
    errors.push("unknown error");
  }
  return errors;
};

const isUnauthenticated = (error) =>
  error.response && error.response.status === 401;

const redirectToSignIn = () => window.location.replace("/users/sign_in");

class HTTPWrapper {
  patch = (url, dataPatch) =>
    new Promise((resolve, reject) => {
      axios
        .patch(url, dataPatch)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (isUnauthenticated(error)) {
            redirectToSignIn();
          } else {
            const errors = parseErrors(error);
            reject(errors);
          }
        });
    });

  get = (url, params = {}) =>
    new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (isUnauthenticated(error)) {
            redirectToSignIn();
          } else {
            const errors = parseErrors(error);
            reject(errors);
          }
        });
    });

  delete = (url) =>
    new Promise((resolve, reject) => {
      axios
        .delete(url)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (isUnauthenticated(error)) {
            redirectToSignIn();
          } else {
            const errors = parseErrors(error);
            reject(errors);
          }
        });
    });

  post = (url, params) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          if (isUnauthenticated(error)) {
            redirectToSignIn();
          } else {
            const errors = parseErrors(error);
            reject(errors);
          }
        });
    });
}

export default new HTTPWrapper();
