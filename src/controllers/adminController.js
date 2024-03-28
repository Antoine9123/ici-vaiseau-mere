
const Project = require("../models/project");
const Event = require("../models/event");



const admin_index = (req, res) => {
  res.render("./admin/admin", { content: "./partials/home-admin" });
};

// ----- ARTIST CTRL ----------------------------------------------------------------->

const project_list = (req, res) => {
  Project.find()
    .then((result) => {
      res.render("./admin/admin", { content: "./partials/projects-list", projects: result });
    })
    .catch((err) => console.log(err));
};

const project_add_get = (req, res) => {
  res.render("./admin/admin", { content: "./partials/projects-add" });
};

const project_add_post = (req, res) => {
  console.log("-----------------------------------------------------------")
  const project = new Project(req.body);
    project
      .save()
      .then((result) => {
        res.redirect("/admin/projects-list");  
      })
      .catch((err) => {
        console.log(err); 
      // });
  });
};

// ----- EVENTS CTRL ------------------------------------------------------------------>

const event_list = (req, res) => {
  Event.find()
    .then((result) => {
      res.render("./admin/admin", { content: "./partials/events-list", events: result });
    })
    .catch((err) => console.log(err));
};

const event_add_get = (req, res) => {
  Project.find()
  .then((result =>{
    res.render("./admin/admin", { content: "./partials/events-add" , projects : result});
  }))
  
};

const event_add_post = (req, res) => {
  const event = new Event(req.body);
  console.log("----------------------------------------------------")
  console.log(event)
  event
    .save()
    .then((result) => {
      res.redirect("/admin/events-list");
    })
    .catch((err) => {
      console.log(err);
    });
};

// ----- PAGES CTRL ------------------------------------------------------------------>
const agenda_get = (req, res) => {
  res.render("./admin/admin", { content: "./partials/agenda-content" });
};

const member_get = (req, res) => {
  res.render("./admin/admin", { content: "./partials/member-content" });
};

const contact_get = (req, res) => {
  res.render("./admin/admin", { content: "./partials/contact-content" });
};

const explore_get = (req, res) => {
  res.render("./admin/admin", { content: "./partials/explore-content" });
};

const index_get = (req, res) => {
  res.render("./admin/admin", { content: "./partials/index-content" });
};

const koi_get = (req, res) => {
  res.render("./admin/admin", { content: "./partials/koi-content" });
};

const vaisseau_get = (req, res) => {
  res.render("./admin/admin", { content: "./partials/vaisseau-content" });
};

module.exports = {
  admin_index,

  project_list,
  project_add_get,
  project_add_post,

  event_list,
  event_add_get,
  event_add_post,

  agenda_get,
  member_get,
  contact_get,
  explore_get,
  index_get,
  koi_get,
  vaisseau_get,
};
