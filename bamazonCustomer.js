require("dotenv").config();
var inquirer = require("inquirer");
var key = require("./key.js");
var connection = key.connect;

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start(){
    var query = "SELECT * FROM products";
    
    connection.query(query,
        function(err,res){
            if(err) throw err;
            console.log("\n")
            for (i=0; i < res.length; i++){
                console.log("ID: " + res[i].item_id + " || Product: " + res[i].productName + " || Price: $" + res[i].price + " || Available In Stock: " + res[i].stockQuantity + "\n");
            };
            inquirer.prompt([
                {
                    name: "next",
                    type: "list",
                    message: "Would you like to Buy something or Exit?",
                    choices: ["Buy", "Exit"]
                }
            ]).then(function(answer){
                if(answer.next == "Buy"){
                    buy();
                }else{
                    console.log("Have a great Day!")
                    connection.end();
                };
            });
        });
};

function buy(){
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the ID of the product you would like to buy?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?"
        }
    ]).then(function(answer){
        var query = "SELECT * FROM products WHERE ?";
        var quantity = answer.quantity;
        connection.query(query,{item_id: answer.id},function(err,res){
            if(res[0].stockQuantity >= parseInt(quantity)){
                var totalPrice = res[0].price * quantity;
                var newQuantity = res[0].stockQuantity - quantity;
                connection.query("UPDATE products SET ? WHERE ?",
                [
                {
                    stockQuantity: newQuantity
                },
                {
                    item_id: answer.id
                } 
                ],function(error){
                    if(error) throw error;
                    console.log("\nThe Total Price of your purchase is: $" + totalPrice + "\n");
                    question();
                });
            }else{
                console.log("Insufficient Quantity");
                question();
            };
        });
    });
};

function question(){
    inquirer.prompt([
        {
            name: "next",
            type: "list",
            message: "Would you like to see the Products again, or Exit?",
            choices: ["Product List", "Exit"]
        }
    ]).then(function(answer){
        if(answer.next == "Exit"){
            console.log("Have a great day!")
            connection.end();
        }else{
            start();
        }
    });
};