// Exercise 1: Online Store Inventory

// Task 1: Define Product Objects
// - Create an object template for products with properties like 'name', 'price', and 'quantity'.
let product = {
    name: "",
    price:0,
    quantity:0,

};
// Task 2: Create an Inventory Array
// - Create an empty array to represent the store's inventory.
let inventory = [];

// Task 3: Add Products to Inventory
// - Write a function that adds product objects to the inventory array.
function addProducts() {
    let apples = {
        name: "Apples",
        price: 2,
        quantity: 4,
    }
    let bananas = {
      name: "Bananas",
      price: 3,
      quantity: 3,
    
    }  
    
    let grapes = {
        name: "Grapes",
        price: 4,
        quantity: 2,
    };
    inventory.push(apples);
    inventory.push(bananas);
    inventory.push(grapes); 
}
// Task 4: Display Inventory: Create a function to display the current inventory in the console.
function consoleLog() {
    console.log(inventory);
}
// Task 5: Update Inventory: Implement a function to update the quantity of a specific product in the inventory.
function updateQuantity(product, quantity) {
    (product.quantity = quantity) 
    console.log(`You have: ${product.quantity} ${product.name} in your inventory`); 
}
// Task 6: Calculate Total Value: Develop a function that calculates the total value of the inventory (sum of price * quantity for all products).
function totalValue() {
  let sum = 0;
  inventory.forEach((product) => {
    sum += product.price * product.quantity;
  });
  return sum;
}
