const path = require("path");
let PORT = process.env.PORT || 3100;
let express = require("express");
let app = express();

// bring your controller
const { IdGeneratorForm } = require("./public/js/userform.js");

// ROUTES (mapped like your original)
const routes = {
  "/": "index.html",
  "/about": "about.html",
  "/stack": "stack.html",
  "/projects": "projects.html",
  "/login": "login.html",
  "/projects/login": "loginSimple.html",
  "/projects/submit": "submit.html",
  "/users": "users.html",
};

// serve static (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// to handle POST body (important)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// assign GET routes
function assignRoutes(routes) {
  for (let route in routes) {
    app.get(route, (req, res) => {
      const filePath = path.join(__dirname, "views", routes[route]);

      res.sendFile(filePath, (err) => {
        if (err) {
          return res
            .status(404)
            .sendFile(path.join(__dirname, "views", "fserr.html"), (err) => {
              if (err) {
                res.status(500).send("Even 404-fserr file not working!, hehe");
              }
            });
        }
      });
    });
  }
}

assignRoutes(routes);

// POST route (your special logic)
app.post("/projects/submit", (req, res) => {
  return IdGeneratorForm(req, res);
});

// catch-all (same as your routeError)
app.use((req, res) => {
  let filePath = path.join(__dirname, "views", "4042.html");

  res.status(404).sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send("Even the Route-Error page not found! hehe :)");
    }
  });
});

// start server
app.listen(PORT, startmsg);

function startmsg() {
  console.log(`server is running on: http://localhost:${PORT}`);
}

// =============================================================================================

const http = require("http");
const fs = require("fs");
const path = require("path");
const { IdGeneratorForm } = require("./public/js/userform.js");

const PORT = process.env.PORT || 3000;

const routes = {
  "/": "views/index.html",
  "/about": "views/about.html",
  "/stack": "views/stack.html",
  "/projects": "views/projects.html",
  "/login": "views/login.html",
  "/projects/login": "views/loginSimple.html",
  "/projects/submit": "views/submit.html",
  "/public/css/style.css": "public/css/style.css",
  "/users": "views/users.html",
};

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".json": "application/json",
};

const server = http.createServer((req, res) => {
  if (req.method == "POST") {
    if (req.url == "/projects/submit") {
      return IdGeneratorForm(req, res);
    }
  }

  const filePath = routes[req.url];
  console.log(filePath);

  // console.log(req.url, extname, contentType);

  if (filePath) {
    const extname = path.extname(`${filePath}`);
    const contentType = mimeTypes[extname] || "text/plain";

    res.setHeader("content-type", contentType);
    res.statusCode = 200;
    sendfile(res, filePath);
  } else {
    routeError(res);
  }
});

server.listen(PORT, startMsg);

function startMsg() {
  console.log(`Server is running on http://localhost:${PORT}`);
}

// functions * * * * * * * * * * * * * * * * * * * * *

function sendfile(res, filePath) {
  fs.readFile(filePath, "utf-8", (fserr, fileData) => {
    if (fserr) {
      fsError(res);
      return;
    }
    res.end(fileData);
  });
}

function routeError(res) {
  res.statusCode = 404;

  fs.readFile("views/4042.html", "utf-8", (errOfrouteErr, routeErrData) => {
    res.setHeader("content-type", "text/html");
    if (errOfrouteErr) {
      res.end("Even the Route-Error page not found! hehe :)");
      return;
    }
    res.end(routeErrData);
    return;
  });
}

function fsError(res) {
  fs.readFile("views/fserr.html", "utf-8", (errOferrorData, errorData) => {
    res.statusCode = 404;
    if (errOferrorData) {
      res.end("Even the 404 // FILE_READ_ERROR page not found! :(");
      return;
    }
    res.end(errorData);
  });
}
