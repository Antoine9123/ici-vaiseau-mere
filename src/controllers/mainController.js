const Project = require("../models/project");

const project_index = (req, res) => {
  const id = req.params.id;
  Project.findById(id)
    .then((result) => {
      res.render("./project", { project: result });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  project_index,
};
