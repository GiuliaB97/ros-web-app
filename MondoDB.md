__ROS USEFUL commands to check if it alright__
* ***Activate mongo server***:
  ```shell_session
   sudo systemctl start mongod
  ```
  or
  ```shell_session
    mongod
  ```
  if some errors occur:
  ```shell_session
    sudo systemctl daemon-reload
  ```
  
  * ***Check if mongo server is running***:
  ```shell_session
  sudo systemctl daemon-reload
  ```
  You can optionally ensure that MongoDB will start following a system reboot by issuing the following command:
  ```shell_session
  sudo systemctl enable mongod
  ```

  * ***Stop mongo***:
  ```shell_session
  sudo systemctl stop mongod
  ```

  * ***Restart MongoDB***:
  ```shell_session
  sudo systemctl restart mongod
  ```

  * ***Start MongoDB***:
  ```shell_session
  mongo
  ```  

  * ***Show db***:
  ```shell_session
  show dbs
  ```  

  * ***Choose db***:
  ```shell_session
  use aws-ros-web-app
  ``` 

  * ***Show collections***:
  ```shell_session
  show collections
  ``` 

* ***Show collections data ***:
  ```shell_session
  db.users.find().pretty()
  ``` 