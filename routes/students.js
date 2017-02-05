var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');
var Student = require('../models/students');


router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

router.get('/', function(req, res) {
  Student.find( function(err, students, count) {
    res.render('students', {students: students});
  })
});

router.post('/create', function(req, res) {
    new Student({
    student_number: req.body.student_number,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    contact_number: req.body.contact_number,
    birthdate: req.body.birthdate,
    section: req.body.section,
    createdate: moment().tz("Asia/Manila").format('LLL'),

     }).save(function(err, student, count) {
      if(err) {
        res.render('create', {error: err});
      } else {
        res.redirect('/students');
      }
    })
});

router.get('/create', function(req, res) {
  res.render('create', {student: {}});
});

router.route('/:student_id')
  .all(function(req, res, next) {
    student_id = req.params.student_id;
    student = {};
    Student.findById(student_id, function(err, c) {
      student = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('student', {student: student, moment: moment});
  })

  // .post(function(req, res) {
  //   student.notes.push({
  //     note: req.body.notes
  //   });

  //   student.save(function(err, student, count) {
  //     if(err) {
  //       res.status(400).send('Error adding note: ' + err);
  //     } else {
  //       res.send('Note added!');
  //     }
  //   });
  // })
  // .put(function(req, res) {
  //   student.studentnumber = req.body.student_number;
  //   student.firstname = req.body.first_name;
  //   student.lastname = req.body.last_name;
  //   student.email = req.body.email;
  //   student.contactnumber = req.body.contact_number;
  //   student.birthdate = req.body.birthdate;
  //   student.setion = req.body.section;
  //   createdate = moment().tz("Asia/Manila").format('LLL'),

router.route('/:student_id/edit')

  .all(function(req, res, next) {
    student_id = req.params.student_id;
    student = {};
    Student.findById(student_id, function(err, c) {
      student = c;
      next();
    });
  })

  .get(function(req, res) {
    res.render('edit', {edit: student, moment: moment, user: req.user});
  })
  .post(function(req, res) {

    student.student_number = req.body.student_number;
    student.first_name = req.body.first_name;
    student.last_name = req.body.last_name;
    student.email = req.body.email;
    student.contact_number = req.body.contact_number;
    student.birthdate = req.body.birthdate;
    student.section = req.body.section;
    student.updatedate = moment().tz("Asia/Manila").format('LLL'),

    student.save(function(err, student, count) {
      if(err) {
        res.status(400).send('Error saving student: ' + err);
      } else {
        res.redirect('/students')
      }
    });
  })

router.route('/:student_id/delete')
  .all(function(req, res, next) {
    student_id = req.params.student_id;
    student = {};
    Student.findById(student_id, function(err, c) {
      student = c;
      next();
    });
  })
  .get(function(req, res) {
    student.remove(function(err, student) {
      if(err) {
        res.status(400).send("Error removing student: " + err);
      } else {
        res.redirect('/students');
      }
    });
  });

module.exports = router;
