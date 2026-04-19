const http = require("http");
const fs = require("fs");
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("content-type", "text/html");
  res.statusCode = 200;

  if (req.url === "/") {
    // fs.readFile("../views/form.html", "utf-8", (err, fileData) => {
    //   if (err) {
    //     fsError(res);
    //     return;
    //   }
    //   res.end(fileData);
    // });

    sendfile(res, "views/index.html");

    // ==========================================
  } else if (req.url === "/about") {
    sendfile(res, "views/about.html");

    // ==========================================
  } else if (req.url === "/stack") {
    sendfile(res, "views/stack.html");

    // ==========================================
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
