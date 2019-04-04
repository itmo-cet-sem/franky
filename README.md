# Franky

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3cf99626afae49d6a01f039322c9c05a)](https://app.codacy.com/app/ITMO-Franky/franky?utm_source=github.com&utm_medium=referral&utm_content=itmo-cet-sem/franky&utm_campaign=Badge_Grade_Settings)

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

The following command should be performed in `backend` directory.

The proper way to develop franky is to use virtualenv:

    python -m pip install virtualenv
    python -m virtualenv .env
    
    [LINUX]
    source .env/bin/activate
    
    [WINDOWS]
    .env\Scripts\activate

After the virtual environment is activated all the required packages can be installed:

    python -m pip install -r requirements.txt
    
Run all test using `pytest` command:

    pytest

Run backend server on http://localhost:5000 and test the [ping endpoint](http://localhost:5000/ping):

    [LINUX]
    python franky/server.py
    
    [WINDOWS]
    python franky\server.py
