
const gameContainer = document.getElementById("game");
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

//here is a helper function to shuffle an array
//it returns the same array with values shuffled
//it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;
 // While there are elements in the array
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

//this function loops over the array of colors
//it creates a new div and gives it a class with the value of the color
//it also adds an event listener for a click for each card

function createDivsForColors(colorArray) {
//this function loops over the array of colors
//it creates a new div and gives it a class with the value of the color
//it also adds an event listener for a click for each card
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let selectedCards = [];
let clickable = true; // Indicates whether cards can be clicked

function handleCardClick(event) {
  // Check if it's currently allowed to click
  if (!clickable) {
    return;
  }

  const clickedDiv = event.target;

  // Check if the clicked element is a div and if it is not already selected
  if (clickedDiv.tagName.toLowerCase() === "div" && selectedCards.length < 2 && !selectedCards.includes(clickedDiv)) {
    const colorClassName = clickedDiv.classList.item(0);
    clickedDiv.style.backgroundColor = colorClassName;

    // Add the clicked card to the list of selected cards
    selectedCards.push(clickedDiv);

    // Check if two cards are selected
    if (selectedCards.length === 2) {
      // Disable further clicks while checking for a match
      clickable = false;

      // Perform matching logic
      const [card1, card2] = selectedCards;
      const color1 = card1.classList.item(0);
      const color2 = card2.classList.item(0);

      if (color1 === color2) {
        // Cards match
        console.log("Match!");
        selectedCards.forEach(card => card.classList.add("matched")); // Mark cards as matched
        selectedCards = []; // Clear the list
        clickable = true; // Allow clicking again
      } else {
        // Cards do not match, reset the cards after a 1 second delay
        setTimeout(() => {
          selectedCards.forEach(card => {
            card.style.backgroundColor = ""; // Reset the background color
          });
          selectedCards = []; // Clear the list
          clickable = true; // Allow clicking again
        }, 1000); // Adjust the delay as needed
      }
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
