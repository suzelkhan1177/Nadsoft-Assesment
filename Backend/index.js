const express = require("express");
const cors = require("cors");
 require("./config/database");
 require("./models/studentCreateTables");
const studentRoutes = require("./routes/studentRoutes");


const app = express();
app.use(cors());
app.use(express.json());



app.use("/api/students", studentRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
