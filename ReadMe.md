# Simple University Registration System 
---
## Project description
In this project we implemented a simple university registration system using node.js for backend, React Typescript on the Frontend and MySql Database to store data.

#### User Types:
- Database Manager
- Instructor
- Student

### How to start the Project ?
#### Database Initialization:
You need to use MySqlWorkBench or smilar tools to create database tables. To create table need to run the contents of sql file in `sql/CreateTables.sql ` as sql query.

#### Backend 
You need to create `config.js` file in `backend/` directory with filling related contents of this:
```
const config = {
    dbConfig: {
        host: "<host address>",
        user: "<database username>",
        password: "database password",
        database: "database name",
        port: <database port number>
    },
    port: <backend port number> 
};

module.exports = config;
```

After creating config file run this command in `backend/` directory to start backend server:
```
$ node server.js
```

#### Frontend
To start frontend server run this command in `frontend/` directory to install dependent modules:
```
$ npm install
```

After installing the modules, run this command to start frontend server:
```
npm start
```

