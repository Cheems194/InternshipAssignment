const connectToDatabase = require("./db");
const express=require("express");
const calculateDistance=require("./utils");

const app=express();
const port=8080;

let connection;

app.use(express.json());

connectToDatabase()
    .then((conn)=>{
        connection=conn;
    })
    .catch((err)=>{
        console.log(err);
    })

app.post('/addSchool', async (req, res) => {
  try{
    const {name,address,latitude,longitude}=req.body;
    if(
      !name || typeof name!=='string' || name.trim()==='' ||
      !address || typeof address!=='string' || address.trim()==='' ||
      typeof latitude!=='number' ||
      typeof longitude !=='number'
    ){
      return res.status(400).json({ message: 'Invalid input data.' });
    }
    const insertQuery = `
      INSERT INTO schools (name, address, latitude, longitude)
      VALUES (?, ?, ?, ?)
    `;
    await connection.execute(insertQuery, [name.trim(), address.trim(), latitude, longitude])
        .then(()=>{
            console.log('Successfully added school with the following details:');
            console.log('Name:', name);
            console.log('Address:', address);
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
            res.status(201).json({ message: 'School added successfully.' });

        })
  } catch (error) {
    console.error('Error adding school:', error);
  }
});


app.get('/listSchools', async (req, res) => {
  try {
    const userLatitude = 0;
    const userLongitude = 0;
    const [schools] = await connection.execute('SELECT * FROM schools');
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(userLatitude, userLongitude, school.latitude, school.longitude);
      return { ...school, distance };
    });
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    res.status(200).json(schoolsWithDistance);
  } catch (error) {
    console.error('Error fetching schools:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})