# Tools and Utilities:

### ngrok

https://ngrok.com/

follow the instructions there, get an account

### flask

https://flask.palletsprojects.com/en/1.1.x/

```
➜ pip install Flask
```

doing quickstart from here:

https://flask.palletsprojects.com/en/1.1.x/quickstart/


### running the server

```
➜ export FLASK_APP=basic.py
➜ flask run
```

### testing the server with simple post requests

curl is a command line tool used to send simple http requests

https://ec.haxx.se/http/http-post

try using this and posting to localhost:5000 to do some simpler local testing

### chrome extension

Based off https://developer.chrome.com/extensions/getstarted

## To load

- open chrome and go to chrome://extensions/
- select "Load unpacked" and navigate to this folder + /extension
- profit
- click the reload circle arrow button to reload any changes you make while developing
- it should add a button in the toolbar that is only active while at "bridgebase.com"


## working with git
- `git pull` -> update local branch with changes in the repository

### making local changes
- `git status` -> see the state of staged and unstaged changes
- `git add .` -> stage files you have modified
- `git commit -m "my message here"` -> create a commit (version) that includes changes you've added with `git add`
- `git push origin master` -> push your local changes (that are commited) to the repo for others to see
