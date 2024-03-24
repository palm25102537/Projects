function getToken() {
  return localStorage.getItem("token");
}

function setToken(value: string) {
  return localStorage.setItem("token", value);
}

function clearToken() {
  return localStorage.removeItem("token");
}

const auth = { getToken, setToken, clearToken };

export default auth;
