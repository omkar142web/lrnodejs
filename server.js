// const http = require("http");
// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(`
//         <style>
//         body {
//         font-family: Arial, sans-serif;
//         background: #2e2e2e;
//         color: #fff6cf;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         height: 100vh;
//         }

//         </style>
//   `);
//     res.write(`<h3>This is a heading tag...</h3>`);
//     res.end("");
//   })
//   .listen(3000, startMsg);

// function startMsg() {
//   console.log("Server is running on http://localhost:3000");
// }

// // ! vr2
// const http = require("http");
// const fs = require("fs");
// http
//   .createServer((req, res) => {
//     if (req.url === "/") {
//       fs.readFile("index.html", (err, data) => {
//         res.writeHead(200, { "content-type": "text/html" });
//         res.end(data);
//       });
//     } else if (req.url === "/app.js") {
//       fs.readFile("app.js", (err, data) => {
//         res.writeHead(200, { "content-type": "text/javascript" });
//         res.end(data);
//       });
//     } else if (req.url === "/public/style.css") {
//       fs.readFile("public/style.css", (err, data) => {
//         res.writeHead(200, { "content-type": "text/css" });
//         res.end(data);
//       });
//     } else if (req.url === "/favicon.ico") {
//       fs.readFile("public/favicon.ico", (err, data) => {
//         res.writeHead(200, { "content-type": "image/x-icon" });
//         res.end(data);
//       });
//     } else {
//       res.writeHead(404, { "content-type": "text/html" });
//       res.end("<h3>Page Not Found</h3>");
//     }
//   })
//   .listen(3000, startMsg);
// function startMsg() {
//   console.log("Server is running on http://localhost:3000");
// }

// ========================================================================================
// ========================================================================================

// // ! vr3
// const http = require("http");
// const fs = require("fs");
// http
//   .createServer((req, res) => {
//     function sendFile(filePath, contentType) {
//       fs.readFile(filePath, (err, data) => {
//         res.writeHead(200, { "content-type": contentType });
//         res.end(data);
//       });
//     }

//     switch (req.url) {
//       case "/":
//         sendFile("./views/index.html", "text/html");
//         break;
//       case "/about":
//         sendFile("./views/about.html", "text/html");
//         break;
//       case "/404":
//         sendFile("./views/404.html", "text/html");
//         break;

//       case "/public/css/style.css":
//         sendFile("public/css/style.css", "text/css");
//         break;
//       case "/public/js/app.js":
//         sendFile("public/js/app.js", "text/javascript");
//         break;
//       case "/favicon.ico":
//         sendFile("public/favicon.ico", "image/x-icon");
//         break;

//       default:
//         sendFile("./views/404.html", "text/html");
//     }
//   })
//   .listen(3000, startMsg);
// function startMsg() {
//   console.log("Server is running on http://localhost:3000");
// }

// ========================================================================================
// ========================================================================================

// // ! vr4
// const http = require("http");
// const fs = require("fs");
// const contentData = JSON.parse(fs.readFileSync("./data/content.json", "utf-8"));
// http
//   .createServer((req, res) => {
//     function sendFile(filePath, contentType, pageKey) {
//       fs.readFile(filePath, "utf-8", (err, fileData) => {

//         if (pageKey) {
//           const page = contentData[pageKey];
//           fileData = fileData
//             .replace(/{{title}}/g, page.title)
//             .replace(/{{content}}/g, page.content);
//         }

//         res.writeHead(200, { "content-type": contentType });
//         res.end(fileData);
//       });
//     }

//     switch (req.url) {
//       case "/":
//         sendFile("./views/index.html", "text/html");
//         break;
//       case "/about":
//         sendFile("./views/about.html", "text/html", "about");
//         break;
//       case "/404":
//         sendFile("./views/404.html", "text/html");
//         break;

//       case "/public/css/style.css":
//         sendFile("public/css/style.css", "text/css");
//         break;
//       case "/public/js/app.js":
//         sendFile("public/js/app.js", "text/javascript");
//         break;
//       case "/favicon.ico":
//         sendFile("public/favicon.ico", "image/x-icon");
//         break;

//       default:
//         sendFile("./views/404.html", "text/html");
//     }
//   })
//   .listen(3000, startMsg);
// function startMsg() {
//   console.log("Server is running on http://localhost:3000");
// }

// ========================================================================================
// ========================================================================================

// ! vr4
const http = require("http");
const fs = require("fs");
const contentData = require("./data/content.js");
http
  .createServer((req, res) => {
    function sendFile(filePath, contentType, pageKey) {
      fs.readFile(filePath, "utf-8", (err, fileData) => {
        if (pageKey) {
          const page = contentData[pageKey] || {};

          const title = page.title || "Default Title";
          const blocks = page.blocks || [];

          let contentHTML = "";

          blocks.forEach((block) => {
            switch (block.type) {
              case "heading":
                contentHTML += `<h${block.level || 2}>${block.text}</h${block.level || 2}>`;
                break;

              case "para":
                contentHTML += `<p>${block.text}</p>`;
                break;

              case "example":
                contentHTML += `
        <div class="example">
          ${block.title ? `<strong>${block.title}</strong>` : ""}
          <p>${block.text}</p>
        </div>`;
                break;

              case "note":
                contentHTML += `
        <div class="note ${block.variant || ""}">
          ${block.text}
        </div>`;
                break;

              case "code":
                contentHTML += `<pre class="code-block">
<code class="language-${block.language}">${block.code}</code></pre>`;
                break;

              case "list":
                const tag = block.ordered ? "ol" : "ul";
                contentHTML += `<${tag}>`;
                block.items.forEach((item) => {
                  contentHTML += `<li>${item}</li>`;
                });
                contentHTML += `</${tag}>`;
                break;

              case "image":
                contentHTML += `
        <div class="image-block">
          <img src="${block.src}" alt="${block.alt || ""}" />
          ${block.caption ? `<p class="caption">${block.caption}</p>` : ""}
        </div>`;
                break;

              case "quote":
                contentHTML += `
        <blockquote>
          "${block.text}"
          ${block.author ? `<footer>~ ${block.author}</footer>` : ""}
        </blockquote>`;
                break;

              case "divider":
                contentHTML += `<hr />`;
                break;

              default:
                contentHTML += ``;
            }
          });

          fileData = fileData
            .replace(/{{title}}/g, title)
            .replace(/{{content}}/g, contentHTML);
        }

        res.writeHead(200, { "content-type": contentType });
        res.end(fileData);
      });
    }

    switch (req.url) {
      case "/":
        sendFile("./views/index.html", "text/html", "home");
        break;
      case "/about":
        sendFile("./views/about.html", "text/html", "about");
        break;
      case "/404":
        sendFile("./views/404.html", "text/html");
        break;

      case "/public/css/style.css":
        sendFile("public/css/style.css", "text/css");
        break;
      case "/public/js/app.js":
        sendFile("public/js/app.js", "text/javascript");
        break;
      case "/favicon.ico":
        sendFile("public/favicon.ico", "image/x-icon");
        break;

      default:
        sendFile("./views/404.html", "text/html");
    }
  })
  .listen(3000, startMsg);
function startMsg() {
  console.log("Server is running on http://localhost:3000");
}
