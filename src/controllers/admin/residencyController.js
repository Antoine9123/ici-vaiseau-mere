const Residency = require("../../models/residency");
const fs = require("fs");
const tmp = require('tmp');
const cloudinary = require('../../utils/cloudinary');

const tl = require("../../../function")

const residency_list = (req, res) => {
  Residency.find()
    .then((result) => {
      res.render("./admin/admin", { content: "./partials/residencies-list", residencies: result });
    })
    .catch((err) => console.log(err));
};

const residency_add_get = (req, res) => {
  res.render("./admin/admin", { content: "./partials/residencies-add" });
};


// -----------------------------------------------------------------------------------------
const residency_add_post = async (req, res) => {
  // If files have been uploaded
  if (req.files) {
    const images = req.files;
    const uploadPromises = [];
    const img_url = []; // Using const instead of let

    for (const field in images) {
      images[field].forEach(file => {
        const tempFile = tmp.fileSync();
        require('fs').writeFileSync(tempFile.name, file.buffer);
        uploadPromises.push(
          new Promise((resolve, reject) => {
            cloudinary.uploader.upload(tempFile.name, function (error, result) {
              if (error) {
                console.error("Error uploading image:", error);
                reject(error);
              } else {
                console.log("Image uploaded successfully:", result);
                img_url.push(result.secure_url);
                resolve();
              }
              tempFile.removeCallback();
            });
          })
        );
      });
    }

    try {
      await Promise.all(uploadPromises);
      req.body.images = img_url;
      const residency = new Residency(req.body); // Create residency object
      await residency.save();
      res.redirect("/admin/residencies-list");
    } catch (error) {
      console.error("Error uploading images or saving residency:", error);
      res.status(500).send("Error uploading images or saving residency.");
    }
  } else {
    // If no files are uploaded, create residency object and save it
    try {
      const residency = new Residency(req.body);
      await residency.save();
      res.redirect("/admin/residencies-list");
    } catch (error) {
      console.error("Error saving residency:", error);
      res.status(500).send("Error saving residency.");
    }
  }
};



// ----------------------------------------------------------------------------------------->

const residency_modification_get = (req, res) => {
  Residency.findById(req.params.id)
    .then(residency => {
      res.render("./admin/admin", { content: "./partials/residencies-mod", residency: residency });
    })
    .catch(err => {
      console.error('Error finding residency:', err);
      res.status(500).send('Server error');
    });
};

const residency_delete_post = async (req, res) => {
  try {

    const residency = await Residency.findById(req.params.id);
    
    if (residency) {
      
      for (const imageUrl of residency.images) {
        
        const publicId = imageUrl.split("/").pop().split(".")[0];
        
        await cloudinary.uploader.destroy(publicId);
      }

      
      const deletedResidency = await Residency.findByIdAndDelete(req.params.id);
      
     
      if (!deletedResidency) {
        return res.status(404).json({ message: "Residency not found" });
      }
      
      res.redirect("/admin/residencies-list");
    } else {
     
      return res.status(404).json({ message: "Residency not found" });
    }
  } catch (error) {
    console.error("Error deleting residency:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const residency_update_post = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedResidency = req.body;

    const residency = await Residency.findById(id);
    if (!residency) {
      return res.status(404).send("Residency not found");
    }
    updatedResidency.images = residency.images 

    // Check if files are uploaded
    if (req.files) {
      const newImagesPromises = Object.keys(req.files).map(async (fieldName) => {
        const file = req.files[fieldName][0]; 
        const index = parseInt(fieldName.replace("img", "")); 
        console.log("index = " + index)

        // Create a temporary file to write the buffer
        const tempFile = tmp.fileSync();
        require('fs').writeFileSync(tempFile.name, file.buffer);

        // Upload file from temporary file path
        const result = await cloudinary.uploader.upload(tempFile.name);
        console.log("--RESULT-------------------------------------")
        console.log(result)

        if (residency.images[index]) {
          console.log("CAN BE HERE -----------------------------------------")
          const publicId = residency.images[index].split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        }
        
        updatedResidency.images[index] = result.secure_url;

        // Remove temporary file
        tempFile.removeCallback();

        // Delete old picture in that index in Cloudinary if it exists
        
      });

      await Promise.all(newImagesPromises);
    }

    // Update the residency data in the database
    const updatedResidencyData = await Residency.findByIdAndUpdate(id, updatedResidency, { new: true });

    res.redirect("/admin/residencies-list");
  } catch (err) {
    console.error("Error updating residency:", err);
    res.status(500).send("Error updating residency");
  }
};




module.exports = {
  residency_list,
  residency_add_get,
  residency_add_post,
  residency_modification_get,
  residency_delete_post,
  residency_update_post,
};
