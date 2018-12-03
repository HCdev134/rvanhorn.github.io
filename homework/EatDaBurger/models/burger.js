let orm = require('../config/orm');

let burger = {

	all(selectedBurger) {

		orm.selectAll('burgers', function (res) {
			selectedBurger(res);
		});

	},

	create(name, selectedBurger) {
		orm.insertOne('burgers', 'burger_name', 'devoured', name, false, selectedBurger);
	},

	update(id, selectedBurger) {
		orm.updateOne(true, id, selectedBurger);
	},
};

module.exports = burger;
