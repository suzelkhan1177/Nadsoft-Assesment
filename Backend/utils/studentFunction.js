const pool = require("../config/database");

async function checkStudentExists(id) {
    const [rows] = await pool.query(
        "SELECT * FROM Students WHERE StudentID = ?",
        [id]
    );

    if (rows.length === 0) {
        return null; 
    }

    return rows[0];
} 

module.exports = checkStudentExists;
