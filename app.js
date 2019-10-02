var express = require('express')
  , cors = require('cors')
  , app = express();
  
var http = require('http');

const AUTOCOMPLETION_URL = 'http://heregeo-aqwr.us-e2.cloudhub.io/autocomplete';
const FORWARD_URL = 'http://heregeo-aqwr.us-e2.cloudhub.io/geocode';
const REVERSE_URL = 'http://heregeo-aqwr.us-e2.cloudhub.io/reverse';

app.use(express.static('public'));

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.options('*', cors(corsOptions)) // include before other routes

app.get('/autocomplete', function (req, res) {
	http.get(AUTOCOMPLETION_URL + '?query=' + encodeURIComponent(req.query.query), (resp) => {
	  let data = '';

	  // A chunk of data has been received.
	  resp.on('data', (chunk) => {
		data += chunk;
	  });

	  // The whole response has been received.
	  resp.on('end', () => {
		var obj = JSON.parse(data);		  
		res.json(obj);
	  });

	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});	
});

app.get('/forward', function (req, res) {
	http.get(FORWARD_URL + '?query=' + encodeURIComponent(req.query.query), (resp) => {
	  let data = '';

	  // A chunk of data has been received.
	  resp.on('data', (chunk) => {
		data += chunk;
	  });

	  // The whole response has been received.
	  resp.on('end', () => {
		var obj = JSON.parse(data);		  
		res.json(obj);
	  });

	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});	
});

app.get('/reverse', function (req, res) {
	let url = 
		REVERSE_URL 
			+ '?pos=' + req.query.pos + ',0'
			+ '&prox=' + req.query.prox + ',5';
			
	http.get(url, (resp) => {
	  let data = '';

	  // A chunk of data has been received.
	  resp.on('data', (chunk) => {
		data += chunk;
	  });

	  // The whole response has been received.
	  resp.on('end', () => {
		var obj = JSON.parse(data);		  
		res.json(obj);
	  });

	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});	
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});