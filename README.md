<h1>InternshipAssignment</h1>
A simple Node.js + Express backend for managing a list of schools, using MySQL as the database.
<hr>
<h3>Features:-</h3>
Add School (POST /addSchool):<br>
Add a new school with name, address, latitude, and longitude.<br>
API Endpoint:- https://internshipassignment-production.up.railway.app/addSchool
<br><br>
List Schools (GET /listSchools):<br>
Fetch all schools sorted by distance from the user's location (currently fixed at (0,0)).<br>
API Endpoint:- https://internshipassignment-production.up.railway.app/listSchools
<hr>
Tech Stack:-<br>Node.js, Express.js, MySQL (with mysql2 library), Hosted on Railway
<hr>
<h3>Setup:-</h3>
Clone the repository:

```
git clone https://github.com/Cheems194/InternshipAssignment.git

cd InternshipAssignment
```
Install dependencies:
```
npm install
```
Create a .env file with your MySQL credentials:
```
DB_HOST=your-host
DB_USER=your-user
DB_PASSWORD=your-password
DB_NAME=your-database
```
Start the server:
```
node index.js
```




