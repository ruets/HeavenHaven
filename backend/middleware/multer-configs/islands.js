const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const fs = require('fs');

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = "imgs/islands/" + req.body.name.split(" ").join("_");

    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    callback(null, dir);
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  }
});

module.exports = multer({ storage: storage }).fields([
    { name: "weatherImg", maxCount: 1 },
    { name: "wildlifeImg", maxCount: 1 },
    { name: "activitiesImg", maxCount: 1 },
    { name: "document", maxCount: 1 },
    { name: "images", maxCount: 5 },
]);
