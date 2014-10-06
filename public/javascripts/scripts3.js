
$(function(){
  var submitbtn = $('#submit');
  getContacts();

  function getContacts(){
  $.get('/contacts', function(data){
    // render the contacts from server
    var contactsArea = $('#contacts');
    for(var i=0;i<data.length;i++){
      contactsArea.append('<div class="divContactItem"><li class="contactItem" draggable="true">' + data[i].name +'<br />'+'</li>'+'<button id="del">X</button></div>');
      // create delete event listener
      // $('#contacts').on('click', function(e){
      //   console.log(e);
        // console.log(this);
      // })
    }

    $('button#del').click(function(e){
      $(this).parent().fadeOut();
        var contactName = $(this).parent().find('li')[0].innerText;
        contactName = contactName.trim();
        $.get('/contacts', function(data){
          for(var j=0;j<data.length;j++){
            if (contactName == data[j].name){
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
    $.post('/contacts',
      {name: contactName, age: contactAge, address: contactAddress, phone_number: contactNumber, picture: contactPicture, category_id: contactCategory}, function(){var data = getContacts(); contactsArea.append('<li>' + data[data.length -1] + '</li>');}
    )
  });

});
