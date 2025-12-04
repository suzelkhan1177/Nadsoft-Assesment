const pool = require("../config/database");
const StudentExists = require("../utils/studentFunction");


// CREATE Student
exports.createStudent = async (req, res) => {
  try {
    const { Name, Email, Age, Marks } = req.body;

    // 1. Check if email exists
    const [existing] = await pool.query(
      "SELECT * FROM Students WHERE Email = ?",
      [Email]
    );

    if (existing.length > 0) {
      return res.status(400).json({
        status: false,
        statusCode: 400,
        message: "Email already exists. Please use a different email."
      });
    }

    // 2. Insert Student
    const [result] = await pool.query(
      "INSERT INTO Students (Name, Email, Age) VALUES (?, ?, ?)",
      [Name, Email, Age]
    );

    const studentId = result.insertId;

    // 3. Insert Marks if provided
    if (Array.isArray(Marks)) {
      for (let m of Marks) {
        await pool.query(
          "INSERT INTO Marks (StudentID, Subject, Score) VALUES (?, ?, ?)",
          [studentId, m.Subject, m.Score]
        );
      }
    }

    res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Student created successfully",
      StudentID: studentId
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      error: err.message
    });
  }
};




// GET Students with Pagination
exports.getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const [countRows] = await pool.query("SELECT COUNT(*) AS total FROM Students");
    const total = countRows[0].total;

    const [students] = await pool.query(
      "SELECT * FROM Students LIMIT ? OFFSET ?",
      [limit, offset]
    );

    res.status(200).json({
      status: true,
      statusCode: 200,
      data: students,
      total,
      page,
      limit
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      error: err.message
    });
  }
};




// GET Student by ID with Marks
exports.getStudentById = async (req, res) => {
  try {
    const id = req.params.id;

    const [student] = await pool.query(
      "SELECT * FROM Students WHERE StudentID = ?",
      [id]
    );

    if (student.length === 0) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Student not found"
      });
    }

    const [marks] = await pool.query(
      "SELECT * FROM Marks WHERE StudentID = ?",
      [id]
    );

    res.status(200).json({
      status: true,
      statusCode: 200,
      student: student[0],
      marks
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      error: err.message
    });
  }
};




// UPDATE Student
exports.updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const { Name, Email, Age } = req.body;

    const student = await StudentExists(id);
    if (!student) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Student not found"
      });
    }

    await pool.query(
      "UPDATE Students SET Name = ?, Email = ?, Age = ? WHERE StudentID = ?",
      [Name, Email, Age, id]
    );

    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Student updated successfully"
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      error: err.message
    });
  }
};




// DELETE Student
exports.deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const student = await StudentExists(id);
    if (!student) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Student not found"
      });
    }

    await pool.query("DELETE FROM Students WHERE StudentID = ?", [id]);

    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Student deleted successfully"
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      statusCode: 500,
      error: err.message
    });
  }
};
