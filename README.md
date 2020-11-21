# Bank of IIT Jamdoli
a Bank Management System web app
___

BOIJ is a node application connected to a PostrgreSQL database with Sequelize ORM

## Install
`npm install`
### Configuration
Open your Psql shell and create a database namely 'BOIJ'.

Run this command on your CLI
`psql -U <username> -d BOIJ -f <path to CreateSchema.sql>`.
Enter your password if prompted.


Inside **services/database.js** replace environment variables with appropriate PSQL credentials.
```
const username = process.env.DB_USERNAME;
const database = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
```

## Run
`node index.js`


#### License
[MIT](LICENSE)