# Task Management App

A simple task management application built with React, Node.js, MySQL, and Tailwind CSS. This app allows users to add, edit, delete, complete, and filter tasks based on their status.

## Features

Add Task: Add new tasks with title and description.

Edit Task: Update task title and description.

Delete Task: Remove a task from the list.

Mark as Completed: Mark tasks as completed.

Filter Tasks: View tasks based on status ( Not Completed , Completed).

## Technologies Used

Frontend: React, Tailwind CSS

Backend: Node.js, Express, MySQL

Icons: React Icons

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/TharinduDesh/ToDo-app.git

cd task-management-app

### 2. Setup MySQL Database

Open MySQL and run the following commands to create the database and table:

CREATE DATABASE task_manager;

USE task_manager;





CREATE TABLE tasks (

  id INT AUTO_INCREMENT PRIMARY KEY,

  title VARCHAR(255),

  description TEXT,

  completed VARCHAR(15) DEFAULT 'Not Completed');

### 3. Configure Backend

1.Go to the backend directory:

cd todo-backend

2.Install backend dependencies:

npm install

3. Set up environment variables:

Create a .env file in the backend directory :

DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=task_manager
PORT=5000

4.Start the backend server:

node index.js

### 4.Configure Frontend

1.Go to the frontend directory:

cd todo-app

2.Install frontend dependencies:

npm install

3.Start the frontend:

npm start

### 5.Running the Full Application

Backend: Start the backend server with node index.js.

Frontend: Start the frontend with npm start in the frontend directory.
