# ToDo-app

## Step 1: Set Up Your Node.js Server
### 1.	Initialize a Node.js project:

cd todo-backend 
npm init -y

### 2.	Install required packages:

npm install express mysql2 body-parser cors

## Step 2: Create the MySQL Database and Table

1.	Open MySQL command line or a GUI like MySQL Workbench.
2.	Run the following commands:

CREATE DATABASE task_manager;

USE task_manager;




CREATE TABLE tasks (

  id INT AUTO_INCREMENT PRIMARY KEY,

  title VARCHAR(255),

  description TEXT,

  completed VARCHAR(15) DEFAULT 'Not Completed'

);


## Step 3: Update the React Frontend

1.	Install Axios for API calls:
npm install axios


## Step 4: Testing the Server
### 1.	Start the server:

node index.js

## Step 5: Run Your Project

Now, start your project 

npm start




