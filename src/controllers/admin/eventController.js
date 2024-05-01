const Event = require("../../models/event");
const Residency = require("../../models/residency");
const fs = require("fs");
const tmp = require("tmp");
const cloudinary = require("../../utils/cloudinary");

const tl = require("../../../function");

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

const event_add_post = async (req, res) => {
  try {
    // If file has been uploaded
    if (req.file) {
      const file = req.file;
      const tempFile = tmp.fileSync();
      require("fs").writeFileSync(tempFile.name, file.buffer);

      cloudinary.uploader.upload(tempFile.name, function (error, result) {
        if (error) {
          console.error("Error uploading image:", error);
          res.status(500).send("Error uploading image.");
          tempFile.removeCallback();
        } else {
          console.log("Image uploaded successfully:", result);
          req.body.image = result.secure_url;

          // Create event object and save it
          const event = new Event(req.body);
          event
            .save()
            .then(() => {
              tempFile.removeCallback();
              res.redirect("/admin/events-list");
            })
            .catch((err) => {
              console.error("Error saving event:", err);
              res.status(500).send("Error saving event.");
              tempFile.removeCallback();
            });
        }
      });
    } else {
      // If no file is uploaded, create event object and save it
      const event = new Event(req.body);
      await event.save();
      res.redirect("/admin/events-list");
    }
  } catch (error) {
    console.error("Error uploading image or saving event:", error);
    res.status(500).send("Error uploading image or saving event.");
  }
};

const event_delete_post = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      const publicId = event.image[0].split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);

      const deletedEvent = await Event.findByIdAndDelete(req.params.id);

      if (!deletedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.redirect("/admin/events-list");
    } else {
      return res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const event_modification_get = (req, res) => {
  const eventId = req.params.id;

  Event.findById(eventId)
    .then((event) => {
      Residency.find({ _id: { $in: event.current_residencies } })
        .then((currentResidencies) => {
          Residency.find()
            .then((allResidencies) => {
              res.render("./admin/admin", {
                content: "./partials/events-mod",
                event: event,
                residencies: allResidencies,
                currentResidencies: currentResidencies,
              });
            })
            .catch((err) => {
              console.error("Error finding all residencies:", err);
              res.status(500).send("Server error");
            });
        })
        .catch((err) => {
          console.error("Error finding residencies:", err);
          res.status(500).send("Server error");
        });
    })
    .catch((err) => {
      console.error("Error finding event:", err);
      res.status(500).send("Server error");
    });
};

const event_update_post = (req, res) => {
  const { id } = req.params;
  const updatedEvent = req.body;

  Event.findById(id)
    .then((event) => {
      if (!event) {
        return res.status(404).send("Event not found");
      }

      const oldEventName = event.event_name;
      const newEventName = updatedEvent.event_name;

      const oldFolderPath = `public/assets/events_img/${tl.format_name_folder(oldEventName)}`;
      const newFolderPath = `public/assets/events_img/${tl.format_name_folder(newEventName)}`;
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
  event_modification_get,
};
