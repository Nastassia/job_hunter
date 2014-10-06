
$(function(){
  var submitbtn = $('#submit');
  getContacts();

  function getContacts(){
  $.get('/contacts', function(data){
    // render the contacts from server
    var contactsArea = $('#contacts');
    for(var i=0;i<data.length;i++){
      contactsArea.append('<div class="divContactItem"><li class="contactItem" draggable="true">' + data[i].name +'<br />'+'</li>'+'<button id="del">X</button></div>');

    }

    $('button#del').click(function(e){
      $(this).parent().fadeOut();
        var contactName = $(this).parent().find('li')[0].innerText;
        contactName = contactName.trim();
        $.get('/contacts', function(data){
          for(var j=0;j<data.length;j++){
            if (contactName == data[j].name || data[j].name == null){
              $.ajax({
                url: '/contacts/' + data[j].id,
                type: 'post',
                dataType: 'json',
                data: {'_method':'delete'}
                })
              }
             }
            })
        // $.post('/contacts', contactName.id.destroy)
      });
  });
}
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
    var newContact = contactName
    $.post('/contacts',
      {name: contactName, age: contactAge, address: contactAddress, phone_number: contactNumber, picture: contactPicture, category_id: contactCategory}, function(){ $('div#contacts').append('<div class="divContactItem"><li class="contactItem" draggable="true">' + contactName +'<br />'+'</li>'+'<button id="del">X</button></div>'); }
    ); $('input').val('');
  });

});
