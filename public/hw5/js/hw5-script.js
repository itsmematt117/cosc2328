// HW5 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis

console.log("=== BOOKSTORE INVENTORY CALCULATOR ===");
const book1 = {
    title: "Between Two Fires",
    author: "Christopher Buehlman",
    price: 22.99
};

const book2 = {
    title: "Black Tongue Thief",
    author: "Christopher Buehlman",
    price: 20.99
};

const book3 = {
    title: "God Emperor of Dune",
    author: "Frank Herbert",
    price: 12.50
};

const TAX_RATE = 0.0825;
let isMember = false;

const booksList = [book1, book2, book3]

console.log("--- Book Inventory ---");
console.log(book1.title + ", " + book1.author + " " + book1.price);
console.log(book2.title + ", " + book2.author + " " + book2.price);
console.log(book3.title + ", " + book3.author + " " + book3.price);

function calculateSubtotal(price, quantity) {return price*quantity;}

function formatCurrency(amount) {return ("$"+ amount.toFixed(2))}

console.log("\n--- Function Declarations Test ---");
console.log(calculateSubtotal(10.88,3));
console.log(formatCurrency(32.64));

const calculateTax = subtotal => subtotal * TAX_RATE;

const applyMemberDiscount = (subtotal, isMember) => {
    return isMember ? subtotal * 0.9 : subtotal;
}

console.log("\n---Arrow Functions Test ---");
console.log(calculateTax(1));
console.log(applyMemberDiscount(4,true));
console.log(applyMemberDiscount(4,false));

const calculateTotal = function(price, quantity=1, isMember = false){
    let newTotal = 0;
    newTotal = calculateSubtotal(price,quantity);
    newTotal = applyMemberDiscount(newTotal, isMember);
    newTotal = newTotal + (calculateTax(newTotal));
    return newTotal;
}

console.log("\n--- Function Expression with Defaults ---");
console.log(calculateTotal(1, 1, true));
console.log(calculateTotal(1,1));
console.log(calculateTotal(1));

function calculateBulkOrder(...prices) {
    let total = 0;
    for (const p of prices) { total += p; }
    return total;
}

console.log("\n--- Rest Operator Test ---");
console.log("bulk order: " + calculateBulkOrder(1,2,3));
console.log("bulk order: " + calculateBulkOrder(1,2,66,3,22));

function processOrder(book, quantity, callback) {
   let tempPrice = callback(book.price, quantity);
   let toReturn = formatCurrency(tempPrice);
   return (book.title + " " + toReturn);
}

const standardPricing = (price, quantity) => {
    return price * quantity;
}

const memberPricing = (price, quantity) => {
    let tempPrice = price * quantity;
    return applyMemberDiscount(tempPrice, true);
}
console.log("\n--- Callback Functions ---");
console.log(processOrder(book1, 1, standardPricing));
console.log(processOrder(book1, 1, memberPricing));

function addItem(book, quantity){

}

orderSummary = {
    customerName : "",
    items: [],
    addItem(book, quantity) {
        for (i=0; i<quantity;i++){
            this.items.push(book)
        }
    },
    getTotal(){
        let runningTotal = 0;
        for (i=0; i<this.items.length;i++){
            runningTotal += this.items[i].price;
        }
        return runningTotal;
    },
    displaySummary() {
        let theOutput = "";
        theOutput += (this.customerName + " is purchasing these titles: ");
        for(i=0;i<this.items.length;i++){
            theOutput += (this.items[i].title + ", ");
           }
        theOutput += ("for a total of: $" + orderSummary.getTotal() + "!");
        return theOutput;
    }

}
console.log("\n--- Object Methods ---");
orderSummary.customerName = "Matt";
orderSummary.addItem(book1,1);
orderSummary.addItem(book2,1);
console.log(orderSummary.displaySummary());

function validateDiscount(code){
    if(code){
        let tempCode = code.toUpperCase();
        if(tempCode == "MEMBER10"){
            return 0.10;
        }
        else if (tempCode == "SAVE20"){
            return 0.20;
        }
    } 
    return 0;
}

console.log("\n--- Truthy/Falsy Validation ---")
console.log(validateDiscount("MEMBER10"));
console.log(validateDiscount("SAVE20"));
console.log(validateDiscount(""));
console.log(validateDiscount("INVALID"));

function createOrderProcessor(storeName){
    let localTaxRate = 0.0125;

    function processStoreOrder(book, quantity){
        let totalInner = (book.price * quantity);
        totalInner += totalInner * localTaxRate;

        let returnString = "Store: " + storeName + ", Book: " + book.title + 
        " x " + quantity + ", Total: " + formatCurrency(totalInner);
        return returnString;
    }

    return processStoreOrder;
}

console.log("\n--- Nested Functions & Closures ---");
const myProcessor = createOrderProcessor("Walmart");
console.log(myProcessor(book3,1));
console.log(myProcessor(book2,1));



