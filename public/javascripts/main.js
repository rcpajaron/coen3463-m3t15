$('#delete').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/students/'+val,
      type:'DELETE'
    }).done(function(){
      $thisInput.parents('tr').remove();
    });

  });
});

$('#delete').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/students/'+val,
      type:'DELETE'
    }).done(function(){
      $thisInput.parents('tr').remove();
    });

  });
});


if (window.location.pathname === '/students') {

  fetch('/api/v1/Student/?sort=createdate').then(function(res) {
    res.json().then(function(students) {
      console.log('students', students);
      var tbody = document.getElementById('table-body');
      students.forEach(function(student) {
        tbody.insertAdjacentHTML('beforeend', '<li> <a href="/students/' + student._id + '">' + student.first_name + ' '+ student.last_name+'</a></li>');

      });
    })
  });

}

  fetch('api/v1/student/count').then(function(res) {
      res.json().then(function(students) { 
        console.log('students', students);
        var count = document.getElementById('count');
          count.insertAdjacentHTML('beforeend', '<h1>Total number of Students: '+students.count+'</h1>');
      
      })
    });