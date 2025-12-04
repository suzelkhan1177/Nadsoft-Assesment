
# Student Management System (Nodejs + Reactjs + MySQL2)

A complete **Student Management CRUD Application** built using:


## Student List

<div> 
  <img src="https://github.com/user-attachments/assets/be8d88c4-7aaf-4385-9837-8af751426470" width="550" height="350px">
</div>


## Student Form
<div> 
  <img src="https://github.com/user-attachments/assets/b97f51b6-2a1b-4161-b0b9-40301b531013" width="350" height="700px">
</div>

## Student View

<div> 
  <img src="https://github.com/user-attachments/assets/33ef4ec7-a5bb-4f5a-9dd7-b0b2acec13d5" width="350" height="700px">
</div>

## Frontend

-   React.js
-   Axios
-   Bootstrap / Custom UI
-   React Router

## Backend

-   Node.js
-   Express.js
-   MySQL2 (Promise API)

This project manages: - Student basic info (Name, Email, Age) - Student
marks (Subject & Score)

## Features

### Student Module

-   Add new student
-   Update student details
-   Delete student
-   View list of students (auto serial numbers)

### Marks Module

-   Add multiple subjects with score
-   View marks on student profile
-   Update marks
-   Delete marks

## Project Structure

### Backend (Node + Express)

    Backend/
    │── config/
    │   └── database.js
    │── controllers/
    │   └── studentController.js
    │── routes/
    │   └── studentRoutes.js
    │── utils/
    │   └── studentFunction.js
    │── index.js
    │── package.json

### Frontend (React)

    Frontend/
    │── src/
    │   ├── components/
    │   │   ├── StudentForm.js
    │   │   ├── StudentList.js
    │   │   └── StudentView.js
    │   ├── App.js
    │   ├── index.js
    │── package.json

## Backend Installation

    cd Backend
    npm install
    npm start

Backend runs on:\
http://localhost:5000

## Frontend Installation

    cd Frontend
    npm install
    npm start

Frontend runs on:\
http://localhost:3000

## API Endpoints
### Student APIs


GET     /api/students      Get all students

GET     /api/students/:id  Get student + marks

POST    /api/students      Create student + marks
  
PUT     /api/students/:id  Update student

DELETE  /api/students/:id   Delete student


## Environment Variables

Create `.env` inside backend:

    MYSQL_USER=root
    MYSQL_PASSWORD=yourpassword
    DATABASE=studentdb

## How to Run

1.  Start MySQL server
2.  Import SQL tables
3.  Run backend (`npm start`)
4.  Run frontend (`npm start`)
5.  Open http://localhost:3000/
