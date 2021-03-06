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
* local ws
```shell_session
roslaunch leo_gazebo leo_marsyard.launch
 ```
_**NB** Becareful you should have download and setup correctly the following repository:_ [Almax-erc-simulation-repository](https://github.com/alma-x/ERC-Remote-Navigation-Simulation)
* docker
```shell_session
systemctl start docker
host +local:root

docker pull ghcr.io/europeanroverchallenge/erc-remote-navigation-sim:latest
docker tag ghcr.io/europeanroverchallenge/erc-remote-navigation-sim:latest erc_navigation_sim

 docker run --rm -it -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY --name erc_sim --privileged --net=host erc_navigation_sim
 ```


 ```
git clone https://github.com/RobotWebTools/web_video_server
docker build docker_bridge .
docker run --rm -it -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY --name bridge --privileged --net=host docker_bridge
 ```
si apre una shell
 ```
 roslaunch rosbridge_server rosbridge_websocket.launch
  ```

 ```
https://github.com/roboception/docker_ros-web-video-server/blob/master/Dockerfile
docker build -t ros_video_server .
docker run --rm -it -v /tmp/.X11-unix:/tmp/.X11-unix -e DISPLAY --name video --net=host ros_video_server

 ```
si apre una shell
 ```
rosrun web_video_server web_video_server _port:=11315
  ```
#### Webpage
* First reach the following address: `http://localhost:7000/` to see the webpage
* Next, when you are asked for a Websocket server address the following address needs to be typed `ws://localhost:9090/` to connect to ros-web-server

 ```
 http://wiki.ros.org/docker/Tutorials/Compose
https://github.com/toddsampson/ros-docker/blob/master/docker-compose.yml
 ```
