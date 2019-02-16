require("dotenv").config();
var inquirer = require("inquirer");
var key = require("./key.js");
var connection = key.connect;

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start(){
    inquirer.prompt([
        {
            name: "first",
            type: "list",
            message: "Pick from options",
            choices: ["Veiw Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        }
    ]).then(function(answer){
        switch(answer.first) {
            case "Veiw Products for Sale":
                list();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addMore();
                break;
            case "Add New Product":
                newProduct();
                break;
            case "Exit":
            console.log("Have a wonderful day!");
            connection.end();
            break;
        }

    });
};

function list(){
    var query = "SELECT * FROM products";
    connection.query(query, function(err,res){
        console.log("\n-----------------------------------------------------");
        for(var i = 0; i<res.length; i++){
            console.log("ID: " + res[i].item_id + " || Product: " + res[i].productName + " || Department: $" + res[i].departmentName + " || Price: $" + res[i].price + " || Available In Stock: " + res[i].stockQuantity + "\n-----------------------------------------------------");
        };
        start();
    });
};

function lowInventory(){
    var query = "SELECT * FROM products WHERE stockQuantity BETWEEN 1 AND 5";
    connection.query(query, function(err,res){
        console.log("\n-----------------------------------------------------");
        for(var i = 0; i<res.length; i++){
            console.log("ID: " + res[i].item_id + " || Product: " + res[i].productName + " || Department: $" + res[i].departmentName + " || Price: $" + res[i].price + " || Available In Stock: " + res[i].stockQuantity + "\n-----------------------------------------------------");
        };
        start();
    });
};

function addMore(){

};

function newProduct(){
    inquirer.prompt([
        {
            name: "product",
            type: "intput",
            message: "Name of the Product?"
        },
        {
            name: "department",
            type: "intput",
            message: "What department will it fall under?"
        },
        {
            name: "price",
            type: "intput",
            message: "What is the price?"
        },
        {
            name: "quantity",
            type: "intput",
            message: "How many do you have in stock?"
        }
    ]).then(function(answer){
        connection.query("INSERT INTO products SET ?",
        {
            productName: answer.product,
            departmentName: answer.department,
            price: answer.price,
            stockQuantity: answer.quantity || 0
        },
        function(err, res){
            if(err) throw err;
            console.log("\nYour product has been added.\n")
            start();
        });
    });
};