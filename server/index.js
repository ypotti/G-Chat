const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

var jsonParser = bodyParser.json();

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(cors(corsOptions));

const dbPath = path.join("database.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(8080, () => {
      console.log("Server Running at http://localhost:8080/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

app.get("/", (req, res) => {
  res.send("Hi All");
});

app.post("/register/", jsonParser, async (request, response) => {
  const { email } = request.body;
  const hashedPassword = await bcrypt.hash(request.body.password, 10);
  const selectUserQuery = `SELECT * FROM user WHERE email = '${email}';`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    const createUserQuery = `
          INSERT INTO
            user (email, password)
          VALUES
            (
              '${email}',
              '${hashedPassword}'
            );`;
    const dbResponse = await db.run(createUserQuery);
    const newUserId = dbResponse.lastID;
    response.send(`Created new user with ${newUserId}`);
  } else {
    response.status = 400;
    response.send(`User already exists`);
  }
});

app.post("/login", jsonParser, async (request, response) => {
  console.log(request.query);
  response.send("Done");
  
});
