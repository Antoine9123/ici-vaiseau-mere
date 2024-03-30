const Event = require("../../models/event");
const Residency = require("../../models/residency");
const fs = require("fs");

const event_list = (req, res) => {
  Event.find()
    .then((result) => {
      res.render("./admin/admin", { content: "./partials/events-list", events: result });
    })
    .catch((err) => console.log(err));
};

const event_add_get = (req, res) => {
  Residency.find().then((result) => {
    res.render("./admin/admin", { content: "./partials/events-add", residencies: result });
  });
};

const event_add_post = (req, res) => {
  const event = new Event(req.body);
  event
    .save()
    .then((result) => {
      res.redirect("/admin/events-list");
    })
    .catch((err) => {
      console.log(err);
    });
};

const event_delete_post = (req, res) => {
  Event.findById(req.params.id)
    .then((event) => {
      const folderName = event.event_name.replace(/ /g, "_");
      return new Promise((resolve, reject) => {
        fs.rm(`public/assets/events_img/${folderName}`, { recursive: true }, (err) => {
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
      return Event.findByIdAndDelete(req.params.id);
    })
    .then((deletedEvent) => {
      if (!deletedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.redirect("/admin/events-list");
    })
    .catch((error) => {
      console.error("Error deleting event:", error);
      res.status(500).json({ message: "Internal server error" });
    });
};

module.exports = {
  event_list,
  event_add_get,
  event_add_post,
  event_delete_post,
};
