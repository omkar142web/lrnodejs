const http = require("http");
const fs = require("fs");
const path = require("path");
const { IdGeneratorForm } = require("./userform.js");

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
