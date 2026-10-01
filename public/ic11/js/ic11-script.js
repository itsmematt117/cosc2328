// IC11 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis

console.log(" ---- Greet ---- ");

let name = "Matthew";
function greet(name) { return "Hello, " + name + "!"; }
// console.log(greet(name));

function area(width, height) { return width * height; }
console.log(greet(name) + " Area of 5 and 10: " + area(5, 10));

const multiply = function (a,b) { return a * b; }
const divide = (a,b) => {return a / b;}
const square = n => n * n;
console.log("Multiply 5 and 10: " + multiply(5, 10));
console.log("Divide 10 by 5: " + divide(10, 5));
console.log("Square of 5: " + square(5));

function greetUser(name, greeting = "Hello") {
    return greeting + ", " + name + "!";
}

console.log(" ______Default Params______");
console.log(greetUser("Matthew"));
console.log(greetUser("Smith", "Welcome"));

function sumAll(...numbers){
    let total = 0;
    for (const n of numbers) { total += n; }
    return total;
}

console.log("sumall(1,2,3) = " + sumAll(1,2,3));

function processNumber(value, callback){
    console.log("proccessing value: " + value + "...");
    return callback(value);
}
//arrow functions
const double = n => n * 2;
const triple = n => n * 3;

console.log("double -> " + processNumber(5, double));
console.log("triple -> " + processNumber(5, triple));

console.log(" --- Object Methods (this) ---");

const product = {
    brand: "Apple",
    price: 999,
    quantity: 2,
    total() { return this.price * this.quantity; },
    describe() { return this.quantity + " x " + this.brand + " @ $" + this.price
        + " + $" + this.total().toFixed(2); 
    }
}

console.log("Total: $" + product.total().toFixed(2));
console.log(product.describe());