const Project = require("../models/project");

const project_index = (req, res) => {
  const id = req.params.id;

  Project.findById(id)
    .then((result) => {
      res.render("residency", { residency: result });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  project_index,
};
