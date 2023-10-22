# Exercise Tracker

Public Link to Repl: https://replit.com/@ShashankShekh38/ExerciseTracker

Tech Stack Used: MongoDB, Mongoose, Express.js, and Node.js

Description:
The Exercise Logger Backend project is a robust web application built on the MongoDB, Mongoose, Express.js, and Node.js stack. This powerful backend system handles incoming requests from the client side, processing and storing user exercise data efficiently in the database.

Key Features:

User Registration:
The backend API receives user information, including a unique username and exercise data, from the client side.
It verifies if the username already exists in the database. If not, it registers the user and stores their exercise data securely.

Log Retrieval:
The system allows users to retrieve their exercise logs by providing their ID or username.
If the user is found, the backend fetches and returns their exercise data.

Error Handling:
If a user is not found during log retrieval, the system responds with a "User not found" message.

Database Management:
MongoDB, a NoSQL database, is employed to efficiently store and manage user information and exercise data.

Mongoose Integration:
Mongoose, an ODM (Object Document Mapper) for MongoDB, provides an elegant and structured approach to interact with the database.

RESTful API Design:
The backend employs RESTful API design principles for seamless communication with the client side.

Logging and Error Handling:
Comprehensive logging is implemented to track API requests, enabling efficient debugging and monitoring.

Overall, the Exercise Logger Backend project is a reliable and efficient solution for managing user exercise data. Its use of the MEN stack ensures a powerful and responsive experience for both users and developers alike.