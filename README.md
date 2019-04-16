# Franky

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3cf99626afae49d6a01f039322c9c05a)](https://app.codacy.com/app/ITMO-Franky/franky?utm_source=github.com&utm_medium=referral&utm_content=itmo-cet-sem/franky&utm_campaign=Badge_Grade_Settings) [![Build Status](https://travis-ci.com/itmo-cet-sem/franky.svg?branch=dev)](https://travis-ci.com/itmo-cet-sem/franky)

Franky - employee profile aggregator.

## General concept
Franky is the web-service to collect all open information about person 
based on profile social networks such as:
* GitHub
* StackOverflow
* Dockerhub
* LinkedIn

Service can be used by HR managers to find out information and 
statistics about a potential job seekers.  
Also job seekers could use Franky as a tool for generating formatted CV.
 
### Collected information includes:
* activity statistics for each social networks for the last year
* active projects timeline for each social networks and in general
* the most popular tags from all social networks

Accumulated statistics should be available on a web-page, but it also 
can be downloaded as pdf-file.

## How to run

### Frontend

Requirements:
* nodejs 8+ (recommend 10 LTS)
* npm 6+ 

At first - go in the `frontend` directory and install deps

    cd frontend/
    npm install

Then you can:

Runs the app in the development mode. Running on `http://localhost:3000/`
    
    npm start

Builds the app for production to the `build` folder.

    npm run build

Launches the test runner in the interactive watch mode.

    npm test

### Backend

> Python 3.6

The following commands should be performed in `backend` directory.

The proper way to develop franky is to use virtualenv:

    python -m pip install virtualenv
    python -m virtualenv .env
    
    source .env/bin/activate

After the virtual environment is activated all the required packages can be installed:

    python -m pip install -r requirements.txt
    
Run unit tests using `pytest` command:

    export PYTHONPATH=$PYTHONPATH:$PWD/franky
    pytest tests/unit
    
Run unit tests using `pytest` command:

    export PYTHONPATH=$PYTHONPATH:$PWD/franky
    pytest tests/integration

Run backend server on http://localhost:5000 and test the [ping endpoint](http://localhost:5000/ping):

    python franky/server.py
    
    [WINDOWS]
    python franky\server.py
    
#### GitHub

GitHub integration requires a GitHub App to be created. Franky uses GitHub app installation authorization to request
GraphQL API.

Several environment variables are required for running the application and integration tests.

| Variable | Description |
| -------- | ----------- |
| GITHUB_APP_ID | GitHub App Id. |
| GITHUB_PRIVATE_PATH | Path to a GitHub App private key file. |
| GITHUB_INSTALLATION | GitHub App Installation id. |

### Run with Docker

As nginx proxy in development. Open `127.0.0.1`

    # Copy development config
    cp config/nginx/nginx.dev.conf config/nginx/nginx.conf
    # Build docker image
    docker build -t franky-static -f Dockerfile-nginx .
    # Run nginx server
    docker run -p 80:80 --network=host franky-static

As stage server

    # Init cluster
    docker swarm init
    # Copy development config
    cp config/nginx/nginx.prod.conf config/nginx/nginx.conf
    # Build images
    docker-compose build
    # Run containers
    docker stack deploy --compose-file docker-stack.yml franky

As production

    to be continued...

