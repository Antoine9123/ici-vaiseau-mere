const Project = require("../models/project");
const Event = require("../models/event");
const Content = require("../models/content");


const project_index = (req, res) => {
  const id = req.params.id;

  Project.findById(id)
    .then((project) => {
      Event.find({ current_projects: { $in: [id] } })
        .then((events) => {
          console.log(events)
          res.render("./project", { project: project, events: events });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const event_index = (req, res) => {
  const id = req.params.id;
  Event.findById(id)
  .then((event) => {
      Content.findOne({ page: "safeplace" })
        .then((safePlace) => {
          res.render("./event", { events: event, safe_place: safePlace.content });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};



module.exports = {
  project_index,
  event_index,
};
