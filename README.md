# ros-web-app


## Set-up

### To establish the connection between ROS and the web page
python -m SimpleHTTPServer 7000
roslaunch rosbridge_server rosbridge_websocket.launch

### To run turtlesim
roscore
rosrun turtlesim turtlesim_node

#usefull command to check if it alright
rostopic echo /turtle1/cmd_vel
rostopic list



