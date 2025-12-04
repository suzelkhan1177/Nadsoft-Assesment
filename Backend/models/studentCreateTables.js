const pool = require("../config/database");

// Create Student table
async function createStudentTable() {
  try {
    const [rows] = await pool.query("SHOW TABLES LIKE 'Students';");

    if (rows.length === 0) {
      const query = `
        CREATE TABLE IF NOT EXISTS Students (
          StudentID BIGINT AUTO_INCREMENT PRIMARY KEY,
          Name VARCHAR(255) NOT NULL,
          Email VARCHAR(255) UNIQUE NOT NULL,
          Age INT NOT NULL
        ) ENGINE=InnoDB;
      `;
      await pool.query(query);
      console.log("✔ Students table created");
    }
  } catch (err) {
    console.error("❌ Error creating Students table:", err.message);
  }
}

// Create Marks table
async function createMarksTable() {
  try {
    const [rows] = await pool.query("SHOW TABLES LIKE 'Marks';");

    if (rows.length === 0) {
      const query = `
        CREATE TABLE IF NOT EXISTS Marks (
          MarkID BIGINT AUTO_INCREMENT PRIMARY KEY,
          StudentID BIGINT,
          Subject VARCHAR(255),
          Score INT,
          FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE
        ) ENGINE=InnoDB;
      `;
      await pool.query(query);
      console.log("✔ Marks table created");
    }
  } catch (err) {
    console.error("❌ Error creating Marks table:", err.message);
  }
}

createStudentTable();
createMarksTable();


