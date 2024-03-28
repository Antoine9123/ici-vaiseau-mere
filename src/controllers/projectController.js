const Project = require("../models/project");

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

  const project_mod_get = (req, res) => {
    res.render("./admin/admin", { content: "./partials/projects-mod" });
  };

  const project_delete =(req, res) => {
    
  }


  module.exports = {
    project_list,
    project_add_get,
    project_add_post,
    project_mod_get,
  };