/* IC10 – COSC 2328 – Professor McCurry
   Implemented by: Matthew Davis */

const city = "Mineola";
const country = "United States";
let population = 5500;
console.log("Location: " + (city + ", " + country));
console.log("Population: " + population);

if (population > 1000000) {
    console.log("This is a metropolis.");
} else {
    console.log("This is a growing city.");
}

let isLoggedIn = false;
if (isLoggedIn) {
    console.log("Welcome back!");
} else {
    console.log("Please log in");
}

let username = "";
if (!username) {
    console.log("Username is required");
} else {
    console.log("Username accepted: " + username);
}

let hasAccount = true;
let isEmailVerified = false;
let agreedToTerms = true;

if(hasAccount && agreedToTerms || isEmailVerified) {
    console.log("Registration allowed");
} else {
    console.log("Registration blocked");
}
