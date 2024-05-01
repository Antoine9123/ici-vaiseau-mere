const multer = require("multer");
const cloudinary = require('../../utils/cloudinary');

// -----STORAGE---------------------------------------------------------------->

// Custom storage configurations for residency and event uploads
const residencyStorage = multer.memoryStorage();
const eventStorage = multer.memoryStorage();

// -----MIDDLEWARES ---------------------------------------------------------------->

// Multer middleware with Cloudinary storage for residency uploads
const residencyUpload = multer({ storage: residencyStorage });

// Multer middleware with Cloudinary storage for event uploads
const eventUpload = multer({ storage: eventStorage });

module.exports = {
  residencyUpload,
  eventUpload,
};
