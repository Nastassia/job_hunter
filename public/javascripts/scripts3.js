
$(function(){
  var submitbtn = $('#submit');

  $.get('/contacts', function(data){
    var contactsArea = $('#contacts');
    for(var i=0;i<data.length;i++){
      contactsArea.append('<li class="contactItem" draggable="true">' + data[i].name + '</li>');
    }
  });

  $.get('/categories', function(data){
    var categoryArea = $('#categories');
    for(var i=0;i<data.length;i++){
      categoryArea.append('<li class="categoryItem">' + data[i].name + '</li>');
    }
  });


  submitbtn.on('click', function(){
    var contactName = $('input[name="name"]').val();
    var contactAge = $('input[name="age"]').val();
    var contactAddress = $('input[name="address"]').val();
    var contactNumber = $('input[name="number"]').val();
    var contactPicture = $('input[name="picture"]').val();
    var contactCategory = $('input[name="category"]').val();
    $.post('/contacts',
      {name: contactName, age: contactAge, address: contactAddress, phone_number: contactNumber, picture: contactPicture, category_id: contactCategory}
    )
  });

});
