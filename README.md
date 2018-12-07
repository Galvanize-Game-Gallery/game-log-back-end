# game-log-back-end
Back end database and server for our Q2 Project

Start by cloning the repo and run
```npm install```
```npm run knex migrate:latest```
 ```npm run knex seed:run```

From there you'll have to load in a .env file
refer to env.example for the env variables you'll need

This Back-End utilizes the IGDB API and you will need to register and acquire your own API key for the .env file

Refer to the knexfile.js for swapping database location (heroku vs locally)

Refer to the ERD to understand how the database relationships work, test.sql contains query examples
