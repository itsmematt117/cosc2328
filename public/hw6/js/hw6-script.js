/* HW6 – COSC 2328 – Professor McCurry
   Implemented by: Matthew Davis */
let selectedProduct = null;
let prodQuantity = 0;
let discCode = "";
const resultsContainer = document.querySelector(".results-hidden");
resultsContainer.classList.toggle("hidden");

const productPrices = {
    Laptop: 2399.50,
    Tablet: 999.99,
    Phone: 1200.99,
    Monitor: 499.50
   };

const discountCodes = {
    SAVE10 : 0.10,
    SAVE20: 0.20,
    STUDENT: 0.15,
    MILITARY: 0.90
   };

let subtotal = 0;
const TAX_RATE = 0.0825;
const calculateTax = subtotal => subtotal * TAX_RATE;

//let discountCode = "";
let discountRate = 0;

const applyDiscount = function (subtotal, code){
    let modifiedCode = code.trim().toUpperCase();

    if (modifiedCode === "") {
        discountRate = 0;
    } else if (modifiedCode === "SAVE10") {
        discountRate = discountCodes.SAVE10;
    } else if (modifiedCode ==="SAVE20") {
        discountRate = discountCodes.SAVE20;
    } else if (modifiedCode === "STUDENT") {
        discountRate = discountCodes.STUDENT;
    } else if (modifiedCode === "MILITARY") {
        discountRate = discountCodes.MILITARY;
    } else {
        discountRate = 0;
    }

    let discountAmount = subtotal * discountRate;
    return discountAmount;
}

const orderForm = document.querySelector("#orderForm");
const formProduct = document.getElementById("product");
const formQuantity = document.getElementById("quantity");
const formDiscountCode = document.getElementById("discountCode");
const resultsProduct = document.getElementById("results-product");
const resultsQuantity = document.getElementById("results-quantity");
const resultsSubtotal = document.getElementById("results-subtotal"); 
const resultsDiscount = document.getElementById("results-discount"); 
const resultsTax = document.getElementById("results-tax"); 
const resultsTotal = document.getElementById("results-total");

orderForm.addEventListener("submit", function(event) {
    event.preventDefault();
    selectedProduct = formProduct.value;
    resultsProduct.textContent = selectedProduct;

    prodQuantity = parseInt(formQuantity.value);
    resultsQuantity.textContent = prodQuantity;

    discCode = formDiscountCode.value.trim();

    if (!productPrices[selectedProduct] || (prodQuantity < 1)) {
        alert("Please verify you have selected an available product "
            + "and the quantity is atleast 1!");
        return;      
    }

    subtotal = productPrices[selectedProduct] * prodQuantity;

    resultsSubtotal.textContent = "$" + subtotal.toFixed(2);

    let discAmount = applyDiscount(subtotal, discCode);
    resultsDiscount.textContent = "-$" + discAmount.toFixed(2);
    subtotal -= discAmount;


    let taxAmount = calculateTax(subtotal);
    resultsTax.textContent = "$" + taxAmount.toFixed(2);

    let total = subtotal + taxAmount;
    resultsTotal.textContent = "$" + total.toFixed(2);

    resultsContainer.classList.remove("results-hidden");
  
} );

