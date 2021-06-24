# ISSUES FILE SOLVER

* If trying to run the application using the command: `node app-name.js` you get the following error: `Error: Cannot find module './lib/compat'`: 
  try to unistall and re-install `express.js`. 
  ```shell session
  npm uninstall express
  npm install express --save
  
  ```
