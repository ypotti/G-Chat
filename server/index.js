const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

let chat = [
  {
    user_email: "admin@gmail.com",
    message: "Hello All",
  },
  {
    user_email: "intecher@gmail.com",
    message: "Hello Admin",
  },
  {
    user_email: "intecher@gmail.com",
    message: "are we all set for team lunch ?",
  },
  {
    user_email: "janster@gmail.com",
    message: "We are stuck in traffic",
  },
  {
    user_email: "admin@gmail.com",
    message: "Where were you stemmac?",
  },
  {
    user_email: "stammac@gmail.com",
    message: "I am with Janster",
  },
  {
    user_email: "stammac@gmail.com",
    message: "Will arrive in few minutes",
  },
  {
    user_email: "user@gmail.com",
    message: "I am already at the venue",
  },
];

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

const verifyToken = async (request, response, next) => {
  let jwtToken;
  const authHeader = request.headers["authorization"];
  if (authHeader !== undefined) {
    jwtToken = authHeader.split(" ")[1];
  }
  if (jwtToken === undefined) {
    response.status(401);
    response.send("Invalid JWT Token");
  } else {
    jwt.verify(jwtToken, process.env.secret, async (error, payload) => {
      if (error) {
        response.status(401);
        response.send("Invalid JWT Token");
      } else {
        next();
      }
    });
  }
};

app.post("/register/", jsonParser, async (request, response) => {
  const { email, isAdmin } = request.body;
  const hashedPassword = await bcrypt.hash(request.body.password, 10);
  const selectUserQuery = `SELECT * FROM user WHERE email = '${email}';`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    const createUserQuery = `
          INSERT INTO
            user (id,email, password,is_admin)
          VALUES
            (
              '${uuidv4()}',
              '${email}',
              '${hashedPassword}',
              '${isAdmin}'
            );`;
    const dbResponse = await db.run(createUserQuery);
    response.send(`User Created Successfully`);
  } else {
    response.status(400);
    response.send(`User already exists`);
  }
});

app.post("/login/", jsonParser, async (request, response) => {
  const { email, password } = request.body;
  const selectUserQuery = `SELECT * FROM user WHERE email = '${email}';`;
  const dbUser = await db.get(selectUserQuery);
  if (dbUser === undefined) {
    response.status(400);
    response.send("Invalid User");
  } else {
    const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
    if (isPasswordMatched === true) {
      const payload = {
        email: email,
      };
      const jwtToken = jwt.sign(payload, process.env.secret);
      response.send({
        user_email: dbUser.email,
        jwtToken: jwtToken,
        isAdmin: dbUser.is_admin,
      });
    } else {
      response.status(400);
      response.send("Invalid Password");
    }
  }
});

// get_all_users
app.get("/get_all_users", verifyToken, async (request, response) => {
  const getAllUsersQuery = `SELECT id, email, is_admin FROM user ;`;
  const users = await db.all(getAllUsersQuery);
  response.send(users);
});

// delete-user
app.delete(
  "/delete-user",
  jsonParser,
  verifyToken,
  async (request, response) => {
    const { email } = request.body;
    const deleteUserQuery = `DELETE FROM user WHERE email='${email}';`;
    try {
      const data = await db.run(deleteUserQuery);
      response.send(data);
    } catch (error) {
      console.log(error);
    }
  }
);

// Register a group
app.post("/new-group/", jsonParser, verifyToken, async (request, response) => {
  const { name, users } = request.body;
  const selectGroupQuery = `SELECT * FROM groups WHERE name = '${name}';`;
  const dbGroup = await db.get(selectGroupQuery);
  if (dbGroup === undefined) {
    const createGroupQuery = `
          INSERT INTO
            groups (id,name,users)
          VALUES
            (
              '${uuidv4()}',
              '${name}',
              '${JSON.stringify(users)}'
            );`;
    const dbResponse = await db.run(createGroupQuery);
    response.send(`Group Created Successfully`);
  } else {
    response.status(400);
    response.send(`Group already exists`);
  }
});

// get_all_groups
app.get("/get_all_groups", verifyToken, async (request, response) => {
  const getAllGroupsQuery = `SELECT * FROM groups ;`;
  const groups = await db.all(getAllGroupsQuery);
  response.send(groups);
});

// Get chat for a group
app.get("/chat/", verifyToken, async (request, response) => {
  response.send(JSON.stringify(chat));
});

// add a message
app.put("/chat", jsonParser, verifyToken, async (request, response) => {
  const { email, message } = request.body;
  chat.push({
    user_email: email,
    message: message,
  });
  response.send(chat);
});
