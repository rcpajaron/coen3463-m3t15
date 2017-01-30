var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
  // id is created automatically
  student_number: {
    type: String,
    required: [true, 'Fill up Student Number']
    
  },
  last_name: {
    type: String,
    required: [true, 'Fill up Last Name']
  },
  student_number: String,
  first_name: String,
  last_name: String,
  email: String,
  contact_number: String,
  birthdate: String,
  section: String,
  createdate: String,
  updatedate: String,
  notes: [{
    postedDate: {
      type: Date,
      'default': Date.now
    },
    note: String
  }]
});

module.exports = mongoose.model('Student', studentSchema);