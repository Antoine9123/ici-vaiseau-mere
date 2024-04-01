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
  req.session.uploadedImages = 0;
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

const event_modification_get = (req, res) => {
  req.session.uploadedImages = 0;
  const eventId = req.params.id;

  Event.findById(eventId)
    .then(event => {
      
      Residency.find({ _id: { $in: event.current_residencies } })
        .then(currentResidencies => {
          Residency.find()
            .then(allResidencies => {
              
              res.render("./admin/admin", { content: "./partials/events-mod", event: event, residencies: allResidencies, currentResidencies: currentResidencies });
            })
            .catch(err => {
              console.error('Error finding all residencies:', err);
              res.status(500).send('Server error');
            });
        })
        .catch(err => {
          console.error('Error finding residencies:', err);
          res.status(500).send('Server error');
        });
    })
    .catch(err => {
      console.error('Error finding event:', err);
      res.status(500).send('Server error');
    });
};


const event_update_post = (req, res) => {
  const { id } = req.params;
  const updatedEvent = req.body;

  // Récupérer l'ancien nom de l'événement depuis la base de données
  Event.findById(id)
    .then((event) => {
      if (!event) {
        return res.status(404).send("Event not found");
      }
      
      const oldEventName = event.event_name;
      const newEventName = updatedEvent.event_name;

      const oldFolderPath = `public/assets/events_img/${oldEventName.replace(/ /g, "_")}`;
      const newFolderPath = `public/assets/events_img/${newEventName.replace(/ /g, "_")}`;
      fs.renameSync(oldFolderPath, newFolderPath);

      return Event.findByIdAndUpdate(id, updatedEvent, { new: true });
    })
    .then((updatedEvent) => {
      res.redirect("/admin/events-list");
    })
    .catch((err) => {
      console.error("Error updating event:", err);
      res.status(500).send("Error updating event");
    });
};


module.exports = {
  event_list,
  event_add_get,
  event_add_post,
  event_delete_post,
  event_update_post,
  event_modification_get
};
