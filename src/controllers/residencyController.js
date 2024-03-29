const Residency = require("../models/residency");

const residency_list = (req, res) => {
    Residency.find()
      .then((result) => {
        res.render("./admin/admin", { content: "./partials/residencies-list", residencies: result });
      })
      .catch((err) => console.log(err));
  };
  
  const residency_add_get = (req, res) => {
    res.render("./admin/admin", { content: "./partials/residencies-add" });
  };
  
  const residency_add_post = (req, res) => {
    console.log("-----------------------------------------------------------")
    const residency = new Residency(req.body);
      residency
        .save()
        .then((result) => {
          res.redirect("/admin/residencies-list");  
        })
        .catch((err) => {
          console.log(err); 
        // });
    });
  };

  const residency_mod_get = (req, res) => {
    res.render("./admin/admin", { content: "./partials/residencies-mod" });
  };

  const residency_delete =(req, res) => {
    
  }


  module.exports = {
    residency_list,
    residency_add_get,
    residency_add_post,
    residency_mod_get,
  };