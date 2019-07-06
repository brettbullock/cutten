# Cutten Server

Graphql server that analyzes WhatsApp chats.

## How to Develop

### Prerequisites

Make sure you have docker and docker compose installed. For information on how to install it for your dev system.

docker:  
&nbsp;&nbsp;&nbsp;&nbsp; Linux: <https://docs.docker.com/install/linux/docker-ce/ubuntu/>  
&nbsp;&nbsp;&nbsp;&nbsp; macOS: <https://docs.docker.com/docker-for-mac/install/>

docker-compose:  
&nbsp;&nbsp;&nbsp;&nbsp; All: <https://docs.docker.com/compose/install/>

### Server

Use the following instructions if you are looking to develop the server in isolation:

  1. Build the docker image locally:  `docker build -t cutten-server .`
  2. Run the image in a container:  `docker run --name cutten-server -d cutten-server`
  3. Start rolling.

### Full Stack

Coming soon.
