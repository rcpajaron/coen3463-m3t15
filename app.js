var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var menu = require('./routes/menu');
var addnew = require('./routes/addnew');
var momen = require('moment');
    

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var app = express();
var db;

var mdbUrl = "mongodb://roemar:roemar@ds161038.mlab.com:61038/coen3463-t15"
MongoClient.connect(mdbUrl, function(err, database) {

    if (err) {
        console.log(err)
        return;
    }

    console.log("Connected to DB!");

    // set database
    db = database;

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', index);
    app.use('/menu', menu);
    app.use('/addnew', addnew);
   
    app.get('/menu', function(req, res) {
          res.render('menu');
    });
    app.get('/students/addnew', function(req, res) {
          res.render('addnew');
    });
    
    app.get('/students', function(req, res) {
        var studentsCollection = db.collection('students');
        studentsCollection.find().toArray(function(err, students) {
           console.log('students loaded', students);
          res.render('students', {
            students: students
          });
        })

    });

    app.post('/students/addnew', function(req, res) {
        console.log(req.body);
        var dataToSave = {
            student_number: req.body.student_number,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            contact_number: req.body.contact_number,
            birthdate: req.body.birthdate,
            section: req.body.section,
            createdate: moment().format('LLL'),

        };
        db.collection('students')
          .save(dataToSave, function(err, student){
            if (err) {
                console.log('Saving Data Failed!');
                return;
            }
            console.log("Saving Data Successful!");
            res.redirect('/students/addnew');
        })
    });

    app.get('/student/:studentId', function(req, res) {
        var studentId = req.params.studentId;
        var studentCollection = db.collection('students');
        studentCollection.findOne({ _id: new ObjectId(studentId) }, function(err, student) {
            res.render('student', {
                student: student
            });
        });	
    });
    
    app.get('/student/:studentId/edit', function(req, res) { 
     	var studentId = req.params.studentId;
        var studentCollection = db.collection('students');
        studentCollection.findOne({ _id: new ObjectId(studentId) }, function(err, student) {
            res.render('edit', {
                edit: student
            });
        });
    });

    app.post('/student/:studentId/edit', function(req, res) {
        var studentId = req.params.studentId;
        var studentCollection = db.collection('students');
        var datasave={
			student_number: req.body.student_number,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            contact_number: req.body.contact_number,
            birthdate: req.body.birthdate,
            section: req.body.section,
            updatedate: moment().format('LLL'),
            
        };
        studentCollection.updateOne({ _id: new ObjectId(studentId)},{$set: datasave}, function(err, student) {
            if(err){
			return console.log(err)
			}
			console.log("Updating Data Successful!");
	        res.redirect('/student/'+studentId)
			// db.collection('students')
   //        		.update(datasave,function(err, student){
	            // if (err) {
	            //     console.log('Saving Data Failed!');
	            //     return;
	            // }
	            // console.log("Saving Data Successfull!");
	            // res.redirect('/student/'+studentId)
	        // })
			
        });
    });

    app.get('/student/:studentId/delete', function(req, res) {
        var studentId = req.params.studentId;
        var studentCollection = db.collection('students');
        studentCollection.deleteOne({ _id: new ObjectId(studentId)}, function(err, student) {
        	// res.render('student', {
         //        student: student
         //    });
            if(err){
			return console.log(err)
			}
			console.log("Deleting Data Successful!");
	        res.redirect('/students/')
			
        });
    });

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
});





module.exports = app;
