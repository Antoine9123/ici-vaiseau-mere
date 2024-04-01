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

const residencyStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.body.collective_name.replace(/ /g, "_");
    createDirectory(`public/assets/residencies_img/${folderName}`);

    // Retrieve uploadedImages count from session or set it to 0 if not exists
    req.session.uploadedImages = req.session.uploadedImages || 0;

    cb(null, `public/assets/residencies_img/${folderName}`);
  },
  filename: function (req, file, cb) {
    // Increment uploadedImages count stored in session
    

    const fileName = "img" + req.session.uploadedImages + path.extname(file.originalname);
    cb(null, fileName);
    req.session.uploadedImages++;
  },
});

const eventStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create a folder based on the event name
    const folderName = req.body.event_name.replace(/ /g, "_");
    createDirectory(`public/assets/events_img/${folderName}`);

 
    req.session.uploadedEventImages = req.session.uploadedEventImages || 0;

    cb(null, `public/assets/events_img/${folderName}`);
  },
  filename: function (req, file, cb) {

    const fileName = "img" + req.session.uploadedEventImages + path.extname(file.originalname);
    cb(null, fileName);


    req.session.uploadedEventImages++;
  },
});

// -----MIDDLEWARES ---------------------------------------------------------------->

const residencyUpload = multer({ storage: residencyStorage });
const eventUpload = multer({ storage: eventStorage });

module.exports = {
  residencyUpload,
  eventUpload,
};
