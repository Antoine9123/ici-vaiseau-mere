const Project = require("../models/project");
const Event = require("../models/event");

const project_index = (req, res) => {
  const id = req.params.id;
  Project.findById(id)
    .then((result) => {
      res.render("./project", { project: result });
    })
    .catch((err) => console.log(err));
};

const event_index = (req, res) => {
  const id = req.params.id;
  Event.findById(id)
    .then((result) => {
      res.render("./event", { event: result });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  project_index,
  event_index,
};
