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
  Run this also if you have the following error
  ```shell_session
  MongoDB shell version v4.4.7
  connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
  Error: couldn't connect to server 127.0.0.1:27017, connection attempt failed: SocketException: Error connecting to 127.0.0.1:27017 :: caused by :: Connection refused :
  connect@src/mongo/shell/mongo.js:374:17
  @(connect):2:6
  exception: connect failed
  exiting with code 1
  ```

  * ***Start mongo***:
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
  * ***Show collections data***:
  ```shell_session
  db.users.find().pretty()
  ```


* ***Remove element from a collection***:
 ```shell_session
  db.users.remove({element_to_delete})
```
* ***Remove all items from a collection***:
 ```shell_session
  db.users.remove({})
```

***PROJECT SETUP***
* ***Import mongo collection***:
 ```shell_session
  mongoimport --collection users --db aws-ros-web-app users.json 
  ```
Be careful if you change the name of the collection (and, or the db) the project will no longer work.