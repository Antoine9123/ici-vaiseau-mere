class ArtistManager {
  static pathfile = "database/artists.json";

  static async generateTable() {
    const section = document.getElementById("artists-list");
    const response = await fetch(this.pathfile);
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

  static generateForm() {
    const section = document.getElementById("artists-create");
    const form = document.createElement("form");

    const fields = [
      "Name",
      "Project Name",
      "Art Fields",
      "Short Description",
      "Long Description",
      "Thumbnail",
      "Picture",
      "Mail",
      "Facebook",
      "Instagram",
      "Website",
    ];

    // This forEach should be changed. Cause the input type shouldn't be "text" for all fields. 
    // Take a look at line 65-66.
    fields.forEach((fieldName) => {
      const label = document.createElement("label");
      label.innerText = fieldName;

      const input = document.createElement("input");
      // Just under this line.
      input.type = "text";
      // this regex replace all name field to match the ones line 82>92. Not good I guess.
      input.name = fieldName.toLowerCase().replace(/\s+/g, "_");

      form.appendChild(label);
      form.appendChild(input);
      form.appendChild(document.createElement("br"));
    });

    const submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Submit";

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      ArtistManager.createArtist(
        form.elements["name"].value,
        form.elements["project_name"].value,
        form.elements["art_fields"].value,
        form.elements["short_description"].value,
        form.elements["long_description"].value,
        form.elements["thumbnail"].value,
        form.elements["picture"].value,
        form.elements["mail"].value,
        form.elements["facebook"].value,
        form.elements["instagram"].value,
        form.elements["website"].value)
    });

    form.appendChild(submitButton);

    section.appendChild(form);
  }

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


// !!!! ATTENTION, FS doesn't work cause nodejs is used with server side only not browser.
// We will need to change it for the database later
    const existingData = fs.readFileSync(pathfile, "utf-8");
    const existingArtists = JSON.parse(existingData);
    console.log(existingArtists);
    existingArtists.push(newArtist);
    const updatedData = JSON.stringify(existingArtists, null, 2);
    fs.writeFileSync(pathfile, updatedData, "utf-8");
  }
}

// Generate table + Form as soon as the thml is read by the browser.
ArtistManager.generateTable();
ArtistManager.generateForm();
