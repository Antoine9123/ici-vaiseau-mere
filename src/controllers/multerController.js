const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createDirectory = (directoryPath) => {
  if (!fs.existsSync(directoryPath)) {
    try {
      fs.mkdirSync(directoryPath, { recursive: true });
      console.log(`Directory created successfully at ${directoryPath}`);
    } catch (err) {
      console.error(`Error creating directory: ${err}`);
    }
  } else {
    console.log(`Directory already exists at ${directoryPath}`);
  }
};

// -----STORAGE---------------------------------------------------------------->

let uploadedImages = 0;

const projectStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.body.collective_name.replace(/ /g, "_");
    createDirectory(`public/assets/projects_img/${folderName}`);

    cb(null, `public/assets/projects_img/${folderName}`);
  },
  filename: function (req, file, cb) {
    uploadedImages++;
    const fileName = "img" + uploadedImages + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const eventStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.body.collective_name.replace(/ /g, "_");
    createDirectory(`public/assets/events_image/${folderName}`);

    cb(null, `public/assets/events_image/${folderName}`);
  },
  filename: function (req, file, cb) {
    const fileName = "img" + uploadedImages + path.extname(file.originalname);
    uploadedImages++;
    cb(null, fileName);
  },
});

// -----MIDDLEWARES ---------------------------------------------------------------->

const projectUpload = multer({ storage: projectStorage });
const eventUpload = multer({ storage: eventStorage });

module.exports = {
  projectUpload,
  eventUpload,
};
