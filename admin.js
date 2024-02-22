function showSubmenu(contentId) {
  var contents = document.querySelectorAll(".primary-title");
  contents.forEach(function (content) {
    content.style.display = "none";
  });

  var selectedContent = document.getElementById(contentId);
  if (selectedContent) {
    selectedContent.style.display = "block";
  }
}

function showContent(contentId) {
  var contents = document.querySelectorAll(".content");
  contents.forEach(function (content) {
    content.style.display = "none";
  });

  var selectedContent = document.getElementById(contentId);
  if (selectedContent) {
    selectedContent.style.display = "flex";
  }
}




// function createArtist(
//   name,
//   projectName,
//   artFields,
//   shortDesc,
//   longDesc,
//   thumbnail,
//   picture,
//   mail,
//   facebook,
//   instagram,
//   website
// ) {
//   let newArtist = {};
//   newArtist["name"] = name;
//   newArtist["projectName"] = projectName;
//   newArtist["artFields"] = artFields;
//   newArtist["shortDescription"] = shortDesc;
//   newArtist["longDescription"] = longDesc;
//   newArtist["thumbnail"] = thumbnail;
//   newArtist["picture"] = picture;
//   newArtist["mail"] = mail;
//   newArtist["facebook"] = facebook;
//   newArtist["instagram"] = instagram;
//   newArtist["website"] = website;

//   const existingData = fs.readFileSync(pathfile, "utf-8");
//   const existingArtists = JSON.parse(existingData);
//   console.log(existingArtists);
//   existingArtists.push(newArtist);
//   const updatedData = JSON.stringify(existingArtists, null, 2);
//   fs.writeFileSync(pathfile, updatedData, "utf-8");
// }
