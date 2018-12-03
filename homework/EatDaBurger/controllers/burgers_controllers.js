// Required
let express = require('express');
let burger = require('../models/burger.js');

let router = express.Router();

router.get('/', function (req, res){

  console.log("---------------------------");
  console.log('Getting Burger List');
	console.log("---------------------------");

  burger.all( function (data){

    console.log(data);
    res.render('index', { burgers: data });

  });
});


router.post('/create', function (req, res){

	console.log("---------------------------");
	console.log('Adding To Burger List');
	console.log("---------------------------");

  burger.create(req.body.burger_name, function (result){

    console.log(result);
    res.redirect('/');

  });
});


router.put('/:id', function (req, res){

	console.log("---------------------------");
	console.log('Updating Burger List');
	console.log("---------------------------");

  burger.update(req.params.id,function (result){

    console.log(result);
    res.sendStatus(200);

  });
});

module.exports = router;
