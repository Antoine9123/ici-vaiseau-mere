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

const event_index = (req,res) => {
  const id = req.params.id;

  Event.findById(id)
  .then((event) => {

    let residencies = [];

    event.current_residencies.forEach((residencyId) => {
      Residency.findById(residencyId)
      .then((residency)=>{
        if (residency !== null){
          residencies.push(residency)
        }
        
      }).catch((err) => console.log(err));
    })
    Content.findOne({ page: "safeplace" })
    .then((safePlace) => {
      res.render("./main/event", { events: event, safe_place: safePlace.content, residencies:residencies});
    })
    .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
}

const next_event = (req, res) => {
  const currentDate = new Date(); 
  
  Event.find({ date_end: { $gt: currentDate } }) 
    .sort({ date_end: 1 }) 
    .limit(1) 
    .then((result) => {
      if (result.length > 0) {
        console.log(result[0]);
        res.status(201).json(result[0]); 
      } else {
        res.status(404).json({ message: "Aucun événement futur trouvé." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
    });
}



module.exports = {
  residency_index,
  event_index,
  next_event
};
