const multer = require('multer');
const path = require('path');
const fs = require('fs');

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
}

let uploadedImages = 0; 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folderName = req.body.collective_name
    createDirectory(`public/assets/projects_image/${folderName}`)

    cb(null, `public/assets/projects_image/${folderName}`); 
  },
  filename: function (req, file, cb) {
    uploadedImages++; 
    const fileName = 'img' + uploadedImages + path.extname(file.originalname); 
    cb(null, fileName); 
  }
});

const upload = multer({ storage: storage });

module.exports = upload;