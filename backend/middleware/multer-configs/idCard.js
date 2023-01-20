const multer = require("multer");
//multer is used to manage the file upload
//require the multer package

const fs = require("fs");
//fs is used to manage files
//require the fs package

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
//define the MIME_TYPES object

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = "imgs/idCards/" + req.body.lastName.split(" ").join("_") + "_" + req.body.firstName.split(" ").join("_");
    //define the directory where the file will be stored

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    //create the directory if it doesn't exist

    callback(null, dir);
    //call the callback function with null for the error and the directory for the destination
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    //define the name of the file

    const extension = MIME_TYPES[file.mimetype];
    //define the extension of the file

    callback(null, name + Date.now() + "." + extension);
    //call the callback function with null for the error and the file name with the extension
  },
});

module.exports = multer({ storage: storage }).array('idCard', 2);
//define the middleware with the storage options and the array of files