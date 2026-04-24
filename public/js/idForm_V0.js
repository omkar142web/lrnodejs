import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IdGeneratorForm = (req, res) => {
  const data = req.body; // ✅ Express already parsed it

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

  fs.readFile(
    path.join(__dirname, "../../views/submit.html"), // ✅ fixed path
    "utf-8",
    (err, dataFile) => {
      if (err) {
        return res.status(500).send("File read error");
      }

      dataFile = dataFile
        .replace("{{name}}", name)
        .replace("{{email}}", email)
        .replace("{{message}}", message)
        .replace("{{imgLink}}", imgLink)
        .replace("{{fallbackImgLink}}", fallbackImgLink);

      res.send(dataFile); // ✅ Express way
    },
  );
};

export { IdGeneratorForm };
