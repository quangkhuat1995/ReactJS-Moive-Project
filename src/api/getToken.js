export function getToken() {
  let token = "";
  const local =
    localStorage.getItem("userUser") || localStorage.getItem("userAdmin");
  if (localStorage.getItem("userUser")) {
    token = JSON.parse(localStorage.getItem("userUser")).accessToken;
  }
  if (localStorage.getItem("userAdmin")) {
    token = JSON.parse(localStorage.getItem("userAdmin")).accessToken;
  }
  if (local) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return token;
}
