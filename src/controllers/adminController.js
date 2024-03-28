const Content = require("../models/content");



const admin_index = (req, res) => {
  res.render("./admin/admin", { content: "./partials/home-admin" });
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

const safe_get = (req, res) => {
  Content.findOne({ page: "safeplace" })
  .then((result) => {
    if (!result) {
      return res.status(404).send('Contenu non trouvé');
    }

    res.render("./admin/admin", { content: "./partials/safe-content", data: result.content });
  })
  .catch((error) => {
    console.error('Erreur lors de la recherche du contenu par ID:', error);
    res.status(500).send('Une erreur est survenue lors de la recherche du contenu par ID.');
  });
};


module.exports = {
  admin_index,

  agenda_get,
  member_get,
  contact_get,
  explore_get,
  index_get,
  koi_get,
  vaisseau_get,
  safe_get,
};
