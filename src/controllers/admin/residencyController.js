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
    let img_url = []

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
      req.body.images = img_url
      const residency = new Residency(req.body);
      await residency.save();
      res.redirect("/admin/residencies-list");
    } catch (error) {
      console.error("Error uploading images or saving residency:", error);
      res.status(500).send("Error uploading images or saving residency.");
    }
  } else {
    try {
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

const residency_delete_post = (req, res) => {
  Residency.findById(req.params.id)
    .then((residency) => {
      const folderName = tl.format_name_folder(residency.collective_name);
      return new Promise((resolve, reject) => {
        fs.rm(`public/assets/residencies_img/${folderName}`, { recursive: true }, (err) => {
          if (err) {
            console.error("Erreur lors de la suppression du dossier:", err);
            reject(err);
          } else {
            console.log("Dossier supprimé avec succès");
            resolve();
          }
        });
      });
    })
    .then(() => {
      return Residency.findByIdAndDelete(req.params.id);
    })
    .then((deletedResidency) => {
      if (!deletedResidency) {
        return res.status(404).json({ message: "Residency not found" });
      }
      res.redirect("/admin/residencies-list");
    })
    .catch((error) => {
      console.error("Error deleting residency:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};

const residency_update_post = (req, res) => {
  
  const { id } = req.params;
  const updatedResidency = req.body;

  // Récupérer l'ancien nom du collectif depuis la base de données
  Residency.findById(id)
    .then((residency) => {
      if (!residency) {
        return res.status(404).send("Residency not found");
      }
      
      const oldCollectiveName = residency.collective_name;
      const newCollectiveName = updatedResidency.collective_name;

      const oldFolderPath = `public/assets/residencies_img/${tl.format_name_folder(oldCollectiveName)}`;
      const newFolderPath = `public/assets/residencies_img/${tl.format_name_folder(newCollectiveName)}`;
      fs.renameSync(oldFolderPath, newFolderPath);

      return Residency.findByIdAndUpdate(id, updatedResidency, { new: true });
    })
    .then((updatedResidency) => {
      res.redirect("/admin/residencies-list");
    })
    .catch((err) => {
      console.error("Error updating residency:", err);
      res.status(500).send("Error updating residency");
    });
};



module.exports = {
  residency_list,
  residency_add_get,
  residency_add_post,
  residency_modification_get,
  residency_delete_post,
  residency_update_post,
};
