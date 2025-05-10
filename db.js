const mysql = require('mysql2/promise');

const DB_NAME = 'school_management';
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Habibik@22345',
      multipleStatements: true
    });

    console.log('Connected to MySQL server.');

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``)
        .then(()=>{
            console.log(`Database '${DB_NAME}' is ready.`);
        });

    const dbConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Habibik@22345',
      database: DB_NAME
    });

    console.log(`Connected to database '${DB_NAME}'.`);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address VARCHAR(255),
        latitude FLOAT,
        longitude FLOAT
      )
    `;

    await dbConnection.query(createTableQuery)
        .then(()=>{
            console.log(`Table 'schools' is ready.`);
        });
    return dbConnection;
  } catch (error) {
    console.error('Database setup failed:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
