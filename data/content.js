module.exports = {
  home: {
    title: "Welcome Home",
    blocks: [
      {
        type: "heading",
        level: 2,
        text: "Custom Node.js Server",
      },
      {
        type: "para",
        text: "This is a custom Node.js server rendering static files with style.",
      },
      {
        type: "divider",
      },
      {
        type: "quote",
        text: "Simplicity is the soul of efficiency.",
        author: "Austin Freeman",
      },
    ],
  },
  about: {
    title: "About Project",
    blocks: [
      {
        type: "heading",
        level: 2,
        text: "Project Overview",
      },
      {
        type: "para",
        text: "This project explores the core fundamentals of Node.js by building a web server from scratch without using any frameworks.",
      },
      {
        type: "example",
        title: "Manual Routing",
        text: "Handling routes manually using the 'http' module and 'fs' to serve index.html.",
      },
      {
        type: "code",
        language: "js",
        filename: "server.js",
        code: `const http = require('http');
const fs = require('fs');

http.createServer(() => {
  console.log("Server running");
});`,
      },
      {
        type: "note",
        variant: "info",
        text: "It focuses on understanding how things work behind the scenes — including HTTP handling, file systems, routing, and static file serving.",
      },
      {
        type: "list",
        ordered: false,
        items: [
          "HTTP Request/Response cycle",
          "File system operations",
          "MIME type handling",
          "Static asset serving",
        ],
      },
      {
        type: "para",
        text: "The goal is to build a strong backend foundation and move from basic scripting to real-world application development.",
      },
    ],
  },
};
