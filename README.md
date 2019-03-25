# Franky
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
