const multer = require("multer");
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
   
    const folderName = format_name_folder(req.body.collective_name);
    createDirectory(`public/assets/residencies_img/${folderName}`);

    cb(null, `public/assets/residencies_img/${folderName}`);
  },
  filename: function (req, file, cb) {
    const fieldName = file.fieldname
    const fileName = fieldName + ".png";
    cb(null, fileName);
  },
});

const eventStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Create a folder based on the event name
    const folderName = req.body.event_name.replace(/ /g, "_");
    createDirectory(`public/assets/events_img/${folderName}`);


    cb(null, `public/assets/events_img/${folderName}`);
  },
  filename: function (req, file, cb) {

    const fileName = "img0.png";
    cb(null, fileName);

  },
});

// -----MIDDLEWARES ---------------------------------------------------------------->

const residencyUpload = multer({ storage: residencyStorage });
const eventUpload = multer({ storage: eventStorage });

module.exports = {
  residencyUpload,
  eventUpload,
};
