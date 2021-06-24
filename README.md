# ros-web-app


## Set-up

### Web page
#### To establish the connection between ROS and the web page
_npm_ acts as server so there is no need to run a proper server
### ROS
####  Mandatory
Before anything ROS Master should be executed to allow communication among the different nodes:
```shell_session
roscore
 ```
Next a WebSocket to communicate from outside with ROS ecosystem need to be run:
```shell_session
roslaunch rosbridge_server rosbridge_websocket.launch
 ```
Finally ROS Web video server node needs to be executed to stream camera topic
```shell_session
rosrun web_video_server web_video_server _port:=11315
 ```

#### Simulation 
**To run Leo Rover simulation**
```shell_session
roslaunch leo_gazebo leo_marsyard.launch
 ```
_**NB** Becareful you should have download and setup correctly the following repository:_ [GitHub](https://github.com/alma-x/ERC-Remote-Navigation-Simulation)

#### Webpage
* First reach the following address: `http://localhost:7000/` to see the webpage
* Next, when you are asked for a Websocket server address the following address needs to be typed `ws://localhost:9090/` to connect to ros-web-server

__ROS USEFUL commands to check if it alright__
* ***to check velocity Leo Rover***:
    ```shell_session
    rostopic echo /cmd_vel
     ```
* ***to print topic list***   
     ```shell_session
    rostopic list
     ```
