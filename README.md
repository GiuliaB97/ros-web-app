# ros-web-app


## Set-up

### Web page
#### To establish the connection between ROS and the web page
To run the server need for communication (this one should be replaced with npm in some way) 
```shell_session
python -m SimpleHTTPServer 7000
 ```
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
You should choose to run one of the following simulation:
1. **To run turtlesim simulation**
```shell_session
rosrun turtlesim turtlesim_node
 ```

2. **To run Turtlebot simulation**


3. **To run Leo Rover simulation**
```shell_session
roslaunch leo_gazebo leo_marsyard.launch
 ```
_ **NB** Becareful you should have download and setup correctly the following repository [GitHub](https://github.com/alma-x/ERC-Remote-Navigation-Simulation)_

__ROS USEFUL commands to check if it alright__
* **check velocity** 
  * command for turtlesim:
    ```shell_session
    rostopic echo /turtle1/cmd_vel
     ```
  * command for Turtlebot and Leo Rover:
    ```shell_session
    rostopic echo /cmd_vel
     ```
* **print topic list**   
     ```shell_session
    rostopic list
     ```
 
 * **Turtlesim** and **Turtlebot** have no camera therefore ROS video server is not needed.*
 
 
