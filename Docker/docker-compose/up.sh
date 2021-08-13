 docker network create -d bridge local_network
 docker run  -itd  --network local_network  -p 27017-27019:27017-27019  --name mongodb mymongo
 docker run -itd --rm --network local_network --name nodejsapp -p 7000:7000 nodejsapp
