FROM ros:melodic-perception

RUN DEBIAN_FRONTEND=noninteractive apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    ros-${ROS_DISTRO}-web-video-server=0.2.1* \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 8080
