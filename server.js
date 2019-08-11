'use strict';

var express = require('express');
var cors = require('cors');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var bodyParser = require('body-parser')

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

// tfox121 codes starts here ###################################################

app.use(bodyParser.urlencoded({extended: false}))

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  var fileName = req.file.originalname
  var fileType = req.file.mimetype
  var fileSize = req.file.size
  res.json({
    name: fileName,
    type: fileType,
    size: fileSize
  })
})
