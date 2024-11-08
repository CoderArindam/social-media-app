Social Media App
This repository contains a simple social media application with a MySQL database backend. Follow the steps below to set up the project and get it running locally.

Prerequisites
Ensure you have the following installed:

Node.js and npm
MySQL Server

1. Clone the Repository:

   $git clone https://github.com/CoderArindam/social-media-app.git
   $cd social-media-app

2. Database Setup:

2a. Create a new MySQL database:
Open MySQL and run:

    $CREATE DATABASE social_media_db;

2b. Import the database dump:
Import the provided SQL dump file to set up tables and initial data.

Run the following command, adjusting the path to the social_media_db_dump.sql file if needed:

    $mysql -u root -p social_media_db < /path/to/social_media_db_dump.sql

2c. Update Database Configuration:

In the server configuration file (.env), set up the following database credentials:

    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=social_media_db
    JWT_SECRET=your_jwt_secret_key

3. Server Setup

3a. Navigate to the Server Directory:
$cd server

3b. Install Server Dependencies:
$npm install

3c. Start the Server:
To start the server in development mode, run:
$npx nodemon

The server should start on http://localhost:5000.

4. Client Setup

4a. Navigate to the Client Directory:
$cd client

4b. Install Client Dependencies:
$npm install

4c. Start the Client:
$npm run dev
The client should start on http://localhost:3000.

5. Testing the Application
   Access the Application:
   Open your browser and navigate to http://localhost:3000 to view the app.
   Login/Registration:
   Test the login and registration features to verify that the database and server are connected.
   Summary
   You should now have a fully operational development environment for the social media app:

Database is set up with sample data.
Server is running via $npx nodemon.
Client is live via $npm run dev.
If you encounter any issues, please refer to the configuration settings and ensure MySQL is properly configured,If there are any issues with the database dump, a fresh database creation script (db_script.sql) is also provided to set up the database from scratch.
