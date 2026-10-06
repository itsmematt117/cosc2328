// IC12 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis


const statBox = document.getElementById('status-box');
statBox.textContent = 'Status: 2 EZ';
console.log("--------- Element Selection by ID ---------");
console.log("Status = " + statBox);

// ---- query selector ----
const firstCard = document.querySelector(".card");
firstCard.querySelector("p".textContent = "Selected using querySelector");
console.log("First Card = " + firstCard);

// --- class list ---

firstCard.classList.add("highlight");
statBox.classList.add("active");

// ---- query select all & forEach ----
const listItems = document.querySelectorAll(".list-item");
listItems.forEach((item, index) => {
    if (index % 2 ===0) {
        item.classList.add("highlight");
    }
});

// ---- classList.toggle and classList.remove ----
const thirdCard = document.querySelector("#card-3");
thirdCard.classList.toggle("hidden");

const secondCard = document.querySelector("#card-2");
secondCard.classList.remove("card");


// ---- textContent ssvs innerHTML safety ----
const secondCardParagraph = secondCard.querySelector("p");
secondCardParagraph.textContent = "Safe update: even text like yatta yatta";
