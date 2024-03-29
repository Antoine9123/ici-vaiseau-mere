const Residency = require("../models/residency");
const Event = require("../models/event");
const Content = require("../models/content");


const residency_index = (req, res) => {
  const id = req.params.id;

  Residency.findById(id)
    .then((residency) => {
      Event.find({ current_residencies: { $in: [id] } })
        .then((events) => {
          console.log(events)
          res.render("./main/residency", { residency: residency, events: events });
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
          res.render("./main/event", { events: event, safe_place: safePlace.content });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};



module.exports = {
  residency_index,
  event_index,
};
