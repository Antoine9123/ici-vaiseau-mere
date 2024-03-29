const Event = require("../models/event");
const Project = require("../models/project");


const event_list = (req, res) => {
  Event.find()
    .then((result) => {
      res.render("./admin/admin", { content: "./partials/events-list", events: result });
    })
    .catch((err) => console.log(err));
};

const event_add_get = (req, res) => {
  Project.find().then((result) => {
    res.render("./admin/admin", { content: "./partials/events-add", projects: result });
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

module.exports = {
  event_list,
  event_add_get,
  event_add_post,
};
