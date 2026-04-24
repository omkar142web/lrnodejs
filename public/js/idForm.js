// import fs from "fs";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IdGeneratorForm = async (data) => {
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

  let dataFile = await fs.readFile(
    path.join(__dirname, "../../views/submit.html"),
    "utf-8",
  );

  dataFile = dataFile
    .replace("{{name}}", name)
    .replace("{{email}}", email)
    .replace("{{message}}", message)
    .replace("{{imgLink}}", imgLink)
    .replace("{{fallbackImgLink}}", fallbackImgLink);

  return dataFile; // ✅ now it returns
};

export { IdGeneratorForm };
