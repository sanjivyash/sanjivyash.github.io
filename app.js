import auth from "./config/auth.js";
import UI from "./utils/ui-display.js";

const input = document.querySelector("#user");
input.addEventListener("keyup", requestUser);

async function requestUser(e) {
  const userName = input.value;

  if (userName == "") {
    document.getElementById("info").style.display = "none";
    document.getElementById("repo").style.display = "none";
    return;
  }

  const response = await fetch(
    `https://api.github.com/users/${userName}?client_id=${auth["Client-ID"]}&client_secret=${auth["Client-Secret"]}`
  );

  const userDetails = await response.json();

  if (response.status === 200) {
    UI.removeError();
    UI.displayUser(userDetails);
    requestRepos(userName);
  } else {
    UI.displayError();
  }
}

async function requestRepos(userName) {
  const response = await fetch(
    `https://api.github.com/users/${userName}/repos?client_id=${auth["Client-ID"]}&client_secret=${auth["Client-Secret"]}`
  );

  const userRepos = await response.json();

  if (response.status === 200) {
    UI.displayRepos(userRepos);
  } else {
    UI.displayError();
  }
}
