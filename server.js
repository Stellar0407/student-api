const express = require("express");
const app = express();

app.use(express.json());

const PORT = 3000;
let students = [];

app.post("/students", (req, res) => {
  const student = req.body;

  students.push(student);

  res.status(201).json(student);
});

app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.json(student);
});

app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  student.name = req.body.name;
  student.age = req.body.age;
  student.course = req.body.course;

  res.json(student);
});

app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const studentIndex = students.findIndex((student) => student.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(studentIndex, 1);

  res.json(deletedStudent[0]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});