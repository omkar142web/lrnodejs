// ! vr4
const PORT = process.env.PORT || 3000;
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
                contentHTML += `
    <div class="code-container">
      <div class="code-header">
            <span>
            ${block.filename || "code"}
            </span>
            <button onclick="copyCode(this)">Copy</button>
      </div>
      <pre class="line-numbers"><code class="language-${block.language}">${block.code}</code></pre>
    </div>
  `;
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
      case "/public/js/copy.js":
        sendFile("public/js/copy.js", "text/javascript");
        break;
      case "/favicon.ico":
        sendFile("public/favicon.ico", "image/x-icon");
        break;

      default:
        sendFile("./views/404.html", "text/html");
    }
  })
  .listen(PORT, startMsg);
function startMsg() {
  console.log(`Server is running on http://localhost:${PORT}`);
}
