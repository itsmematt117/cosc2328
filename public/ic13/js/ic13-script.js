// IC13 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis

let selectedProduct = null;
let currentQuantity = 1;
let discountRate = 0;


// --- update display func ----
function updateOrderSummary() {
    const summaryProduct = document.querySelector("#summary-product");
    const summaryTotal = document.querySelector("#summary-total");

    if (selectedProduct) {
        summaryProduct.textContent = "Product: " + selectedProduct.name;
        const total = selectedProduct.price * currentQuantity * (1-discountRate);
        summaryTotal.textContent = "Total: $" + total.toFixed(2);
    } else {
        summaryProduct.textContent = "No product selected";
        summaryTotal.textContent = "Total: $0";
    }
}

// --- Mouse Events: Product Selection (event delegatioin + dataset) ---

const productGallery = document.querySelector("#product-gallery");
const productNameInput = document.querySelector("#product-name");

productGallery.addEventListener("click", function(e) {
    const card = e.target.closest(".product-card");
    if (card) {
        selectedProduct = {
            name: card.dataset.productName,
            price: parseFloat(card.dataset.price)
        };
        productNameInput.value = selectedProduct.name;
        updateOrderSummary();
        }
    });


    // --- Keyboard Event ---
    const promoCodeInput = document.querySelector("#promo-code");
    const promoMessage = document.querySelector("#promo-message");

    promoCodeInput.addEventListener("keyup", function(e) {
        const code = e.target.value.trim().toUpperCase();
        if (code === "") {
            promoMessage.textContent = "";
            discountRate = 0;
        } else if (code === "SAVE10") {
            promoMessage.textContent = "Valid promo code!";
            discountRate = 0.10;
        } else {
            promoMessage.textContent = "Invalid promo code.";
            discountRate = 0;;
        }
        updateOrderSummary();
    });

    // --- Form Events: submit val --- 

    const orderForm = document.querySelector("#order-form");
    orderForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!selectedProduct) {
            alert("Please select a product before placing your order.");
            return;
        }

        const total = selectedProduct.price * currentQuantity* (1-discountRate);

        const orderDetails = "Order Placed Successfully!\n" + 
        "Product: " + selectedProduct.name + "\n" + 
        "Quantity: " + currentQuantity + "\n" +
        "Total: $" + total.toFixed(2);

        alert(orderDetails);
        });
