const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const PORT = process.env.PORT || 3000;

const IdGeneratorForm = (req, res) => {
  let body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });
  req.on("end", () => {
    let rawdata = Buffer.concat(body).toString();
    let data = querystring.parse(rawdata);

    let name = data.name
      ?.trim()
      .split(" ")
      .map((l) => l.at(0).toUpperCase() + l.slice(1))
      .join(" ");

    let imgLink = data.imgLink?.trim().toLowerCase();
    let fallbackImgLink =
      "https://static.vecteezy.com/system/resources/thumbnails/023/981/222/small/close-up-white-luxury-car-on-black-background-with-copy-space-photo.jpg";

    let email = data.email?.trim().toLowerCase() || "N/A";

    const rawMsg = data.message?.trim();
    let message = rawMsg ? rawMsg[0].toUpperCase() + rawMsg.slice(1) : "N/A";

    fs.readFile("views/submit.html", "utf-8", (err, dataFile) => {
      res.setHeader("Content-Type", "text/html");
      res.statusCode = 200;

      dataFile = dataFile
        .replace("{{name}}", name)
        .replace("{{email}}", email)
        .replace("{{message}}", message)
        .replace("{{imgLink}}", imgLink)
        .replace("{{fallbackImgLink}}", fallbackImgLink);
      res.end(dataFile);
    });
  });
};

module.exports = { IdGeneratorForm };
