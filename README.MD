# DotCom Store E-commerce Webpage

## Requirements
- Have git installed
- Node version ^16.x and up
- Npm version ^5.x and up  

## 1. Clone Repo
```
$ git@github.com:jorge-dev/Seng-513-Project.git
$ cd Seng-513-Project
```
## 2. Create an .env file in the root backend folder
- Duplicate the .env-template file and name it .env
- Get the MongoDb connection string from the MongoDb Atlas instance or an admin with access to the database and update the MONGO_DB_URI variable

## 3. Install Mongo Db atlas desktop client (optional)
  - Download the app from [MongoDb Compass](https://www.mongodb.com/try/download/compass) site
  - In the mongoD Compass app, click on the "Connect to MongoDB Atlas" button and paste the link you got from your admin in the "Connection String" field
## 4. Setup
- Init backend and frontend servers by running `make init-servers`
  - this will initialized and create the node modules on for each server 
- Start the backend server by running `make start-backend`
  - if you need to see the logs and more debug information about the backend server then run `make start-backend-dev` instead
- Start the frontend server by running `make start-frontend`
  - This will start the React frontend server and open a browser page on port 3000

##

