let connection = require('./connection.js');

let orm = {

	selectAll(table, selectedBurger) {

		let query = 'SELECT * FROM ??';
		connection.query(query, [table], function (err, result) {

			if (err) {
				throw err;
			}

			selectedBurger(result);

		});
	},

	insertOne(dbTable, burgerName, burgerStatus, burgerNameValue, devouredStatus, selectedBurger) {

		let query = 'INSERT INTO ??(??,??) VALUES (?, ?)';
		connection.query(query, [dbTable, burgerName, burgerStatus, burgerNameValue, devouredStatus], function (err, result) {

			if (err) {
				throw err;
			}

			console.log('added');
			selectedBurger(result);

		});
	},

	updateOne(devouredStatus, burgerID, selectedBurger) {

		let query = 'UPDATE burgers SET devoured = ? WHERE id = ?';
		connection.query(query, [devouredStatus, burgerID], function (err, result) {

			if (err) {
				throw err;
			}

			console.log('updated');
			selectedBurger(result);

		});
	},
};

module.exports = orm;
