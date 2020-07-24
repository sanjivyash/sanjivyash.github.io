const auth = {
  "Client-ID": "8b1addb973c6b3b79df5",
  "Client-Secret": "63d9f814d2a769e2f984305e5cdc01e56e89bcd9",
};

class UI {
  static displayError(msg = "User not found") {
    if (this.error) UI.removeError();

    this.error = true;
    const errorMsg = document.createElement("div");
    const errorDiv = document.querySelector("#error");
    errorDiv.style.display = "block";
    errorMsg.textContent = msg;
    errorMsg.className = "alert alert-danger";
    errorDiv.appendChild(errorMsg);
  }

  static removeError() {
    const errorDiv = document.querySelector("#error");
    errorDiv.innerHTML = "";
    errorDiv.style.display = "none";
    this.error = false;
  }

  static displayUser(userDetails) {
    for (let row of ["name", "email", "location", "login"]) {
      document.getElementById(row).textContent = userDetails[row];
    }

    const date = new Date(userDetails["created_at"]);
    document.getElementById("date").textContent = new String(date).substring(
      0,
      24
    );
    document
      .querySelector("img")
      .setAttribute("src", userDetails["avatar_url"]);
    document
      .getElementById("profile")
      .setAttribute("href", `https://github.com/${userDetails["login"]}`);
    document.getElementById(
      "repos"
    ).textContent = `Public Repos: ${userDetails["public_repos"]}`;
    document.getElementById(
      "gists"
    ).textContent = `Public Gists: ${userDetails["public_gists"]}`;
    document.getElementById(
      "followers"
    ).textContent = `Followers: ${userDetails["followers"]}`;
    document.getElementById(
      "following"
    ).textContent = `Following: ${userDetails["following"]}`;
    document.querySelector("p").textContent = userDetails["bio"];
    document.getElementById("info").style.display = "block";
  }

  static displayRepos(userRepos) {
    const repoDiv = document.querySelector("#repo");

    Array.from(repoDiv.children).forEach((repo) => {
      if (repo.className === "card-body") repoDiv.removeChild(repo);
    });

    userRepos.forEach((repo) => {
      const el = document.createElement("div");
      el.className = "card-body";
      el.style.border = "1px solid #e5e5e5";

      el.innerHTML = `<a href="${repo["html_url"]}" target="_blank">${repo["name"]}</a><button class="btn btn-warning btn-sm float-right" style="margin-right: 10px" disabled>Forks: ${repo["forks"]}</button><button class="btn btn-success btn-sm float-right" style="margin-right: 10px" disabled>Watchers: ${repo["watchers"]}</button><button class="btn btn-primary btn-sm float-right" style="margin-right: 10px" disabled>Stars: ${repo["stargazers_count"]}</button>`;

      repoDiv.appendChild(el);
    });

    repoDiv.style.display = "block";
  }
}

UI.error = false;

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