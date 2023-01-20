const multer = require("multer");
const { PrismaClient } = require("@prisma/client");
const fs = require('fs');

// define the MIME types that can be uploaded
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// define the storage configuration
const storage = multer.diskStorage({
  // set the destination folder for the uploaded files
  destination: (req, file, callback) => {
    // create a folder named as the island's name
    const dir = "imgs/islands/" + req.body.name.split(" ").join("_");

    // check if a folder with this name already exists
    // if not, create it
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    // send the destination folder to the multer module
    callback(null, dir);
  },
  // set the file name
  filename: (req, file, callback) => {
    // get the original name of the file
    const name = file.originalname.split(" ").join("_");
    // get the extension of the file
    const extension = MIME_TYPES[file.mimetype];
    // send the file name to the multer module
    callback(null, name + Date.now() + "." + extension);
  }
});

// export the multer configuration
module.exports = multer({ storage: storage }).fields([
    { name: "weatherImg", maxCount: 1 },
    { name: "wildlifeImg", maxCount: 1 },
    { name: "activitiesImg", maxCount: 1 },
    { name: "document", maxCount: 1 },
    { name: "images", maxCount: 5 },
]);
