// let climateChangeData;

// document.addEventListener("DOMContentLoaded", () => {
//   const searchButton = document.getElementById("search-button");

//   searchButton.addEventListener("click", () => {
//     // get the value from the dropdown
//     const value = document.querySelector("#Information").value;

//     console.log(value);

//     // create an if statement to check if the value is equal to something
//     if (value === "EF") {
//       getEffectsOfClimateChange();
//     } else if (value === "NO") {
//       getWhatWillHappenIfWeDoNotTakeAction();
//     } else {
//       return ("Please select an option");
//     }
//   });
// });

// function getOption() {
//   selectElement = document.querySelector("#Information");
//   output = selectElement.value;
//   document.querySelector(".output").textContent = output;
// }

// function onLoad() {
//   getEffectsOfClimateChange();
//   getWhatWillHappenIfWeDoNotTakeAction();

// }
// onLoad();

// async function getEffectsOfClimateChange() {
//   const options = {
//     method: "GET",
//     mode: "cors",
//   };

//   fetch(
//     "https://global-warming.org/api/ocean-warming-api",

//     options
//   )
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));

//   fetch(
//     "https://global-warming.org/api/methane-api",

//     options
//   )
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));
// };

// async function getWhatWillHappenIfWeDoNotTakeAction() {
//   const options = {
//     method: "GET",
//     headers: {
//       "X-RapidAPI-Key": "01fa9544c8msh08b8a0d883a4ebdp1ff8a8jsne3e68d563a72",
//       "X-RapidAPI-Host": "real-time-climate-index.p.rapidapi.com",
//     },
//   };

//   fetch(
//     "https://real-time-climate-index.p.rapidapi.com/api/climate-data",
//     options
//   )
//     .then((response) => response.json())
//     .then(data => console.log(data))
//     .then(renderAction)
//     .catch((err) => console.error(err));
// }

// function renderAction(action) {
//   const changes = document.getElementById(".NO");
//   console.log(changes);
//   const firstElement = action.splice(0, 1);

//   console.log(firstElement);

//   action.forEach((data) => {
//     const metadata = data[0].metadata;
//     console.log(metadata);
//     const card = document.createElement("div");
//     card.className = "card";

//     card.innerHTML = `
//     <p>${metadata.author}</p>
//    <p>${metadata.fullDescription}</p>
//    `;
//     //  console.log(action)
//     changes.append(card);
//   });
// }


const select = document.querySelector("#Information");
const output = document.querySelector(".output");
const cards = document.querySelectorAll(".card");
const form = document.querySelector("#suggestion-form");
const input = document.querySelector("#suggestion-input");

// Define the API endpoints
const endpoints = {
  EF: "https://global-warming.org/api/ocean-warming-api",
  MF: "https://global-warming.org/api/methane-api",
  NO: "https://real-time-climate-index.p.rapidapi.com/api/climate-data",
};

// Define a function to fetch and display data
async function fetchData(endpoint) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    // Find the card corresponding to the selected option
    const option = select.value;
    const card = document.querySelector(`.card.${option}`);
    // Display the data in the card
    card.innerHTML = JSON.stringify(data);
  } catch (error) {
    console.error(error);
  }
}

// Add an event listener to the search button
document.querySelector("#search-button").addEventListener("click", () => {
  const option = select.value;
  if (option) {
    output.innerText = `Showing ${option} information...`;
    fetchData(endpoints[option]);
  } else {
    output.innerText = "Please select an option.";
  }
});

// Add an event listener to the suggestion form
form.addEventListener("submit", (event) => {
  event.preventDefault(); // prevent the default form submission
  output.innerText = `Your suggestion: ${input.value}`;
  input.value = ""; // clear the input field
});