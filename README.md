# GitHub Finder
Clone the project inside a directory. Register yourself with the GitHub API, an get a secret key and id. Next run the following commands from your root directory:
```
mkdir config
cd config
touch auth.js
```
Next set up your auth file with the following:
```
const auth = {
  "Client-ID": {GitHub API ID},
  "Client-Secret": {GitHub API Secret Key}
};

export default auth;
```
You have successfully setup the application. Open the index.html file with your browser to enter the username and get the GitHub info.
