const Residency = require("../models/residency");
const fs = require("fs");

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

const residency_add_post = (req, res) => {
  console.log("-----------------------------------------------------------");
  const residency = new Residency(req.body);
  residency
    .save()
    .then((result) => {
      res.redirect("/admin/residencies-list");
    })
    .catch((err) => {
      console.log(err);
      // });
    });
};

const residency_mod_get = (req, res) => {
  res.render("./admin/admin", { content: "./partials/residencies-mod" });
};

const residency_delete_post = (req, res) => {
  Residency.findById(req.params.id)
    .then((residency) => {
      const folderName = residency.collective_name.replace(/ /g, "_");
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

module.exports = {
  residency_list,
  residency_add_get,
  residency_add_post,
  residency_mod_get,
  residency_delete_post,
};
