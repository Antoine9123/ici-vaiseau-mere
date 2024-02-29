const Artist = require("../models/artist");

const artist_index = (req, res) => {
  const id = req.params.id;
  Artist.findById(id)
    .then((result) => {
      res.render("./artist", { artist: result });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  artist_index,
};
