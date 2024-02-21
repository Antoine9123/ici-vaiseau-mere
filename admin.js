const fs = require("fs");

function showContent(contentId) {
  var contents = document.querySelectorAll(".primary-title");
  contents.forEach(function (content) {
    content.style.display = "none";
  });

  var selectedContent = document.getElementById(contentId);
  if (selectedContent) {
    selectedContent.style.display = "block";
  }
}

class ArtistManager {
  static pathfile = "database/artists.json";

  static createArtist(
    name,
    projectName,
    artFields,
    shortDesc,
    longDesc,
    thumbnail,
    picture,
    mail,
    facebook,
    instagram,
    website
  ) {
    let newArtist = {};
    newArtist["name"] = name;
    newArtist["projectName"] = projectName;
    newArtist["artFields"] = artFields;
    newArtist["shortDescription"] = shortDesc;
    newArtist["longDescription"] = longDesc;
    newArtist["thumbnail"] = thumbnail;
    newArtist["picture"] = picture;
    newArtist["mail"] = mail;
    newArtist["facebook"] = facebook;
    newArtist["instagram"] = instagram;
    newArtist["website"] = website;

    const existingData = fs.readFileSync(ArtistManager.pathfile, "utf-8");
    const existingArtists = JSON.parse(existingData);
    console.log(existingArtists)
    existingArtists.push(newArtist);
    const updatedData = JSON.stringify(existingArtists, null, 2);
    fs.writeFileSync(ArtistManager.pathfile, updatedData, "utf-8");
  }
}

// ArtistManager.createArtist(
//     "Nicolas", 
//     "Bourlingueur du dimanche",
//     "chanteur",
//     "Courte chansonnette",
//     "Ca fait lonftemps que je l'attends, cette princesse aux yeux d'or",
//     "tinytiny",
//     "pictureguitar.jpg",
//     "nico@mail.com",
//     "nico.fb",
//     "nico.insta",
//     "nico.be")