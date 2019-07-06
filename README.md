# Cutten

WhatsApp Chat Analyzer for the Cutten Club Crew

## Development Instructions

### Prerequisites

Make sure you have docker and docker compose installed. For information on how to install it for your dev system.

docker:  
&nbsp;&nbsp;&nbsp;&nbsp; Linux: <https://docs.docker.com/install/linux/docker-ce/ubuntu/>  
&nbsp;&nbsp;&nbsp;&nbsp; macOS: <https://docs.docker.com/docker-for-mac/install/>
  
docker-compose:  
&nbsp;&nbsp;&nbsp;&nbsp; All: <https://docs.docker.com/compose/install/>

## Isolated Developement

  1. First make sure the images are built locally. Run from the root directory: `docker-compose build`
  2. To run in isolation: `docker-compose up <service-name>` e.g `docker-compose up cutten-server`

## Full Stack Development
  
  1. First make sure the images are built locally. Run from the root directory:  `docker-compose build`
  2. To run full stack: `docker-compose up`