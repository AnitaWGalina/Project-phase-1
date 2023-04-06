let climateChangeData;

document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");

  searchButton.addEventListener("click", () => {
    // get the value from the dropdown
    const value = "CC";

    // create an if statement to check if the value is equal to something
    if (value === "EF") {
      getEffectsOfClimateChange();
    } else if (value === "NO") {
      getWhatWillHappenIfWeDoNotTakeAction();
    } else if (value=== "CC") {
      getWhatCanBeDoneToCombatTheEffects();
    } else {
      return "Please select an option";
    }
  });
});

function getOption() {
  selectElement = document.querySelector("#Information");
  output = selectElement.value;
  document.querySelector(".output").textContent = output;
}

function onLoad() {
  getEffectsOfClimateChange();
  getWhatWillHappenIfWeDoNotTakeAction();
  getWhatCanBeDoneToCombatTheEffects();
}

async function getEffectsOfClimateChange() {
  const options = {
    method: "GET",
    mode: "cors",
  };

  fetch(
    "https://global-warming.org/api/ocean-warming-api",

    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));

    fetch(
      "https://global-warming.org/api/methane-api",

      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));

}

async function getWhatWillHappenIfWeDoNotTakeAction() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "01fa9544c8msh08b8a0d883a4ebdp1ff8a8jsne3e68d563a72",
      "X-RapidAPI-Host": "real-time-climate-index.p.rapidapi.com",
    },
  };

  fetch(
    "https://real-time-climate-index.p.rapidapi.com/api/climate-data",
    options
  )
    .then((response) => response.json())
    //.then(data => console.log(data))
    .then(renderAction)
    .catch((err) => console.error(err));
}

function renderAction(action) {
  const changes = document.getElementById(".NO");
  console.log(changes);
  const firstElement = action.splice(0, 1);

  console.log(firstElement);

  action.forEach((data) => {
    const metadata = data[0].metadata;
    console.log(metadata);
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
    <p>${metadata.author}</p>
   <p>${metadata.fullDescription}</p>
   `;
    //  console.log(action)
    changes.append(card);
  });
}

async function getWhatCanBeDoneToCombatTheEffects() {
   const options = {
     method: "GET",
     headers: {
       "X-RapidAPI-Key": "01fa9544c8msh08b8a0d883a4ebdp1ff8a8jsne3e68d563a72",
       "X-RapidAPI-Host": "climate-change-news-scraper1.p.rapidapi.com",
     },
   };

   fetch("https://climate-change-news-scraper1.p.rapidapi.com/news", options)
     .then((response) => response.json())
     .then((response) => console.log(response))
     .catch((err) => console.error(err));
}
