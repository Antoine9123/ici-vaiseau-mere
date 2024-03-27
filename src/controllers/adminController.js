const multerUpload = require('./multer');


const Artist = require("../models/artist");
const Event = require("../models/event");



const admin_index = (req, res) => {
  res.render("./admin/admin", { content: "./partials/home-admin" });
};

// ----- ARTIST CTRL ----------------------------------------------------------------->

const artist_list = (req, res) => {
  Artist.find()
    .then((result) => {
      res.render("./admin/admin", { content: "./partials/artists-list", artists: result });
    })
    .catch((err) => console.log(err));
};

const artist_add_get = (req, res) => {
  res.render("./admin/admin", { content: "./partials/artists-add" });
};

const artist_add_post = (req, res) => {
  console.log("-----------------------------------------------------------")
  const artist = new Artist(req.body);




  // Utilise Multer pour gérer le téléchargement des images
  // multerUpload.array('image1', 1)(req, res, function (err) {
  //   if (err instanceof multer.MulterError) {
  //     console.log("Une erreur Multer s'est produite lors du téléchargement des fichiers :", err);
  //   } else if (err) {
  //     console.log("Une erreur s'est produite lors du téléchargement des fichiers :", err);
  //   }
  //   if (req.files.length > 0) {
  //     console.log("OK -------------------------------------------");
  //   } else {
  //     console.log("Une erreur s'est produite lors du téléchargement des fichiers :", err);
  //   }
    artist
      .save()
      .then((result) => {
        res.redirect("/admin/artists-list"); // Redirige vers la liste des artistes après l'enregistrement réussi
      })
      .catch((err) => {
        console.log(err); // Affiche une erreur s'il y a un problème lors de l'enregistrement
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
  res.render("./admin/admin", { content: "./partials/events-add" });
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

  artist_list,
  artist_add_get,
  artist_add_post,

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
