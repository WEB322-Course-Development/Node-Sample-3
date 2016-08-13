var express = require('express'),
    bodyParser = require('body-parser'),
    formidable = require('formidable'),
	path = require('path'),
    util = require('util'),
	exphbs = require('express-handlebars');

// create our app
var app = express();

// instruct the app to use the `bodyParser()` middleware for all urlencoded routes (form submits)
app.use(bodyParser.urlencoded({ extended: true }));

// instruct the app to use the express.static middleware for all static files in the public directory
// (typically used for css, less, js files, etc)
app.use(express.static(path.join(__dirname, 'public')));

// instruct the app to use express handlebars for the view engine with the .hbs extension

app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// set the "views" directory to be the "public" directory (good for this simple example)
app.set("views",path.join(__dirname, 'public'));

// A browser's default method is 'GET', so this
// is the route that express uses when we visit
// our site initially.
app.get('/', function(req, res){
  res.sendFile(app.get("views") + '/index.html');
});

// This route receives the posted form.
// it returns the "hello.handlebars" file using the data specified in the render function
// since we're not using a master layout, we choose layout: false
app.post('/sample-1-submit', function(req, res){
	/*res.render('hello', {
				layout: false, 
				inputName: req.body.inputName
			});*/

           /* res.writeHead(200, {'content-type': 'text/plain'});
            res.write('Upload Info :\n');
            res.end(util.inspect({reqbody: req.body, files: req.files}));*/

            var form = new formidable.IncomingForm();

            form.parse(req);

            form.on('fileBegin', function (name, file){
                file.path = path.join(__dirname, 'uploads', file.name);
            });

            form.on('file', function (name, file){

                res.render('hello', {
                    layout: false, 
                    inputFile: file.name,
                    message: "path: " + file.path
                });

            });
});

// Listen on port 8080
app.listen(8080);