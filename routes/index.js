var express = require('express');
var router = express.Router();
var formidable = require('formidable');

var photos = [];
var photoData = {};

/* GET home page. */
router.get('/', function(req, res) {

  req.app.locals.pool.getConnection(function(err, connection){
			connection.query( 'select * from photos',  function(err, rows){
			  	if(err)	{
			  		throw err;
			  	}else{
			  		 res.render('index', { title: 'Photos', photos: rows });
			  	}
		  });
	  });	
});

router.get('/photos/new', function(req, res) { 
	res.render('photos/new', { title: 'New photo'});
});

router.post('/photos/create', function(req, res) { 

	var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
    	console.log(fields);
    	 var addQuery = "INSERT INTO photos (name, url) VALUES ('" + fields['name'] + "','" + fields['url'] + "')" ;
    	  req.app.locals.pool.getConnection(function(err, connection){
    		connection.query( addQuery,  function(error, result){
    			console.log(error);	
    		});
    	});
    });
});

module.exports = router;