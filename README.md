# franky
Franky employee profile aggregator

## How to run

### Frontend

In the `fronted` directory, you can run:

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
