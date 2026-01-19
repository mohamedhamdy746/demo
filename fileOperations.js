const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "students.json");

// sync operations

function writeStudentsSync(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("Students written (sync)");
}

function readStudentsSync() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function addStudentSync(newStudent) {
  const students = readStudentsSync();
  const maxId = Math.max(0, ...students.map(s => s.id));
  newStudent.id = maxId + 1;
  students.push(newStudent);
  writeStudentsSync(students);
}

// async operations

async function writeStudentsAsync(data) {
  await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2));
  console.log("Students written (async)");
}

async function readStudentsAsync() {
  const data = await fsPromises.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

async function addStudentAsync(newStudent) {
  const students = await readStudentsAsync();
  const maxId = Math.max(0, ...students.map(s => s.id));
  newStudent.id = maxId + 1;
  students.push(newStudent);
  await writeStudentsAsync(students);
}

// tests

// Sync read
console.log("Students (sync):", readStudentsSync());

// Async add + read
(async () => {
  await addStudentAsync({
    name: "mohamed hamdy",
    age: 23,
    course: "open source",
    grades: { networks: 85, security: 90 },
  });

  const updatedStudents = await readStudentsAsync();
  console.log("Students after add:", updatedStudents);
})();
