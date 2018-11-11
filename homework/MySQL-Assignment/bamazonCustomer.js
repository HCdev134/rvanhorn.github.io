// Required
let mysql = require("mysql");
const inquirer = require('inquirer');

// MySQL Connection Info
let connection = mysql.createConnection({

	host: "localhost",
	port: 3306,
	user: "root",
	password: "root",
	database: "bamazon"
});

connection.connect(function (err) {

	console.log("connected as id " + connection.threadId);
	console.log("---------------------------------------");
	console.log("Hello, here is a list of all our items.");
	console.log("---------------------------------------");

	if (err) throw err;

	connection.query("SELECT * FROM products", function (err, res) {

		if (err) throw err;

		// Get current inventory.
		for (let i = 0; i < res.length; i++) {

			console.log("ID: " + res[i].id);
			console.log("Product Name: " + res[i].product_name);
			console.log("Department: " + res[i].department_name);
			console.log("Price: $" + res[i].price);
			console.log("Stock: " + res[i].stock_quantity);
			console.log("---------------------------------------");

		}

		userPrompt();

	});
});


function userPrompt() {
	inquirer
		.prompt([{
			name: "itemID",
			message: "Please input the ID for the product you wish to purchase.",
		},
			{
				name: "itemAmt",
				message: "How many would you like to purchase?",
			},

		])

		.then((userInput) => {

			connection.query("SELECT * FROM products", function (err, res) {

					if (err) throw err;

					for (let i = 0; i < res.length; i++) {

						// Check the Item ID the user inputted for a match.
						if (parseInt(userInput.itemID, 0) === res[i].id) {

							// Check to make sure the item amount being requested is less than or equal to available stock.
							if (userInput.itemAmt <= res[i].stock_quantity) {

								console.log("---------------------------------------");
								console.log('Thank You. Your order has been received.');
								console.log(`You bought ${userInput.itemAmt} ${res[i].product_name} at ${res[i].price} per item.`);
								console.log(`Your total ${res[i].price * parseFloat(userInput.itemAmt)}`);
								console.log("---------------------------------------");

								updateStore(userInput.itemAmt, userInput.itemID);

							} else {

								console.log("---------------------------------------");
								console.log("Sorry, we are unable to fulfill your order with the quantity selected.");
								console.log("---------------------------------------");

								userPrompt();
								return;

							}

						} else if (res[i] === res.length) {

							console.log("---------------------------------------");
							console.log('Item Not Found.');
							console.log("---------------------------------------");

							userPrompt();

						}
					}
				}
			);
		});
}

function updateStore(itemAmt, itemID) {

	connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE id =?", [itemAmt, itemID], function (err, res) {

		if (err) throw err;

		nextItem();

	});
}

function nextItem() {

	inquirer
		.prompt([{
			name: "nextItemValue",
			message: "Would you like to purchase another item?",
		},
		])

		.then((userInput) => {

			if (userInput.nextItemValue === "YES" || userInput.nextItemValue === "Yes") {

				userPrompt();

			} else {

				connection.end();

			}

		})
}
