

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

// function showContent(contentId) {
//   var contents = document.querySelectorAll(".content");
//   contents.forEach(function (content) {
//     content.style.display = "none";
//   });

//   var selectedContent = document.getElementById(contentId);
//   if (selectedContent) {
//     selectedContent.style.display = "block";
//   }
// }

let pathfile = "database/artists.json";


class ArtistManager {
    static async generateTable() {
      const section = document.querySelector(".content");
      const response = await fetch(pathfile);
      const artists = await response.json();
  
      const headers = ["Name", "Project", "Art Fields"];
      const table = document.createElement("table");
  
      const headerRow = document.createElement("tr");
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.innerText = header;
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);
  
      artists.forEach((artist) => {
        const row = document.createElement("tr");
  
        const name = document.createElement("td");
        const project = document.createElement("td");
        const artFields = document.createElement("td");

        name.innerText = artist["name"]; 
        project.innerText = artist["projectName"]; 
        artFields.innerText = artist["artFields"]; 
       
        row.appendChild(name);
        row.appendChild(project);       
        row.appendChild(artFields);
  
        table.appendChild(row);
      });
      section.appendChild(table);
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