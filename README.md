# :construction_worker: Template API
 Base template API to quick start api projects

## :sparkles: Features
* Basic users module with email activation, avatar, jwt authorization middleware;
* Persistence with PostgreSQL;
* Storage provider;
* Mail provider;
* Logger;
* Graceful shutdown;
* Connections rate limiter middleware for DDoS protection;
* Dynamic role-permissions system;
* Decent unit tests coverage;

## :wrench: Installation
You need [Git](https://git-scm.com/), [Node.js](https://nodejs.org/), [Yarn](https://yarnpkg.com/), [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) in order to run the project.

First of all, clone the repository:
```bash
git clone https://github.com/kortkamp/template-node-api.git
```
Then enter the folder and install dependencies
```bash
cd template-node-api
yarn install
```
Create your .env file and put there your configs
```bash
cp .env.example .env
```

Pull and build the docker images
```bash
docker-compose up
```
