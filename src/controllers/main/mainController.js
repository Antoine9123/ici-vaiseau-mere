const Residency = require("../../models/residency");
const Event = require("../../models/event");
const Content = require("../../models/content");


const residency_index = (req, res) => {
  const id = req.params.id;

  Residency.findById(id)
    .then((residency) => {
      Event.find({ current_residencies: { $in: [id] } })
        .then((events) => {
      
          res.render("./main/residency", { residency: residency, events: events });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

const getResidency = async (residencyId) => {
  let residency = await Residency.findById(residencyId);
  return residency;
}

const event_index = async (req, res) => {
  const id = req.params.id;
  let residencyList = [];
  let event;
  let safePlace;
  try {
      event = await Event.findById(id);
  } catch (err) {
      console.log(err);
  }

  if (event) {
      try {
        for (let i = 0; i < event.current_residencies.length; i++) {
          const residency = await getResidency(event.current_residencies[i]);
          if (residency !== null){
            residencyList.push(residency);
          }
        }
      } catch (err) {
          console.log(err);
      }
  }
  try {
      safePlace = await Content.findOne({ page: "safeplace" });
      console.log("Safe place:", safePlace); // Log the safe place content
  } catch (err) {
      console.log(err);
  }

  console.log("Residency list:", residencyList); // Log the residency list
  
  res.render("./main/event", { events: event, safe_place: safePlace ? safePlace.content : "", residencies: residencyList });
};

module.exports = {
  residency_index,
  event_index,
};
