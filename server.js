const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const url = require("url");

const PORT = 3000;
const filePath = path.join(__dirname, "students.json");

// Read students file
const getStudents = async () =>
  JSON.parse(await fs.readFile(filePath, "utf-8"));

const server = http.createServer(async (req, res) => {
  try {
    const { pathname, query } = url.parse(req.url, true);

    // students 
    if (pathname === "/students" && req.method === "GET") {
      let students = await getStudents();

      if (query.name) {
        students = students.filter(s =>
          s.name.toLowerCase().includes(query.name.toLowerCase())
        );
      }

      return sendJSON(res, {
        success: true,
        count: students.length,
        data: students,
      });
    }

    // stats 
    if (pathname === "/stats" && req.method === "GET") {
      const students = await getStudents();
      const averageAge =
        students.reduce((sum, s) => sum + s.age, 0) / students.length;

      return sendJSON(res, {
        success: true,
        data: {
          totalStudents: students.length,
          averageAge: averageAge.toFixed(2),
        },
      });
    }

    // courses
    if (pathname === "/courses" && req.method === "GET") {
      const students = await getStudents();
      const courses = [...new Set(students.map(s => s.course))];

      return sendJSON(res, {
        success: true,
        count: courses.length,
        data: courses,
      });
    }

    // root
    if (pathname === "/" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/html" });
      return res.end("hello world");
    }

    // 404
    sendJSON(res, {
      success: false,
      error: "Not Found",
      message: "Try GET /students, /stats, or /courses",
    }, 404);

  } catch (err) {
    sendJSON(res, {
      success: false,
      error: "Server Error",
      message: err.message,
    }, 500);
  }
});

function sendJSON(res, data, status = 200) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

server.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
