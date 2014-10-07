
$(function(){
  var submitbtn = $('#submit');
  getContacts();

  function getContacts(){
  $.get('/contacts', function(data){
    // render the contacts from server
    var contactsArea = $('#contacts');
    for(var i=0;i<data.length;i++){
      contactsArea.append('<div class="divContactItem"><li class="contactItem" draggable="true">' + '<h3>'+ data[i].name + '</h3>'+'<br />'+ '<span class="contact_info">'+ '<p>' + data[i].age + '<br />' + data[i].address + '</p>' +

      '</li>'+'<button id="edit" data-toggle="modal" data-target="#myModal">Edit</button>'+" "+'<button id="del"><img src="/trashcan.gif" /></button></div>');
    }
    $('button#del').click(function(){
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
               });
              }
            }});
      })})
    };



      $('button#edit').click(function(){

        var contactName = $(this).parent()[0].innerText.split('\n')[0];
        $.get('/contacts', function(data){
          for(var k=0;k<data.length;k++){
            if (contactName == data[k].name){
              $('.modal-body').html(
                "<input type='text name='name'' value="+data[k].name+">"+"<br />"+
                "<input type='number' name='age'' value="+data[k].age+">"+"<br />"+
                "<textarea>"+data[k].address+"</textarea><br />"+
                "<input type='text' name='number' value="+data[k].phone_number+">"+"<br />"+
                "<input type='text' name='picture' value="+data[k].picture+">"+"<br />");


              }
            }
         })})


var dropdown = $('select');
  $.get('/categories', function(data){
    var categoryArea = $('#categories');
    for(var i=0;i<data.length;i++){
      categoryArea.append('<li class="categoryItem">' + data[i].name + '</li>');
      dropdown.append('<option value="'+data[i].id+'">'+data[i].name+'</option>');
    }
    if('draggable' in $('.categoryItem')){ alert(categoryItem);}
  });


  submitbtn.on('click', function(){
    var contactName = $('input[name="name"]').val();
    var contactAge = $('input[name="age"]').val();
    var contactAddress = $('textarea').val();
    var contactNumber = $('input[name="number"]').val();
    var contactPicture = $('input[name="picture"]').val();
    var contactCategory = $('input[name="category"]').val();

    var newContact = contactName
    $.post('/contacts',
      {name: contactName, age: contactAge, address: contactAddress, phone_number: contactNumber, picture: contactPicture, category_id: contactCategory}, function(){ $('div#contacts').append('<div class="divContactItem"><li class="contactItem" draggable="true">' +'<h3>'+ contactName + '</h3>'+'<br />'+ '<span class="contact_info">'+ '<p>' + contactAge + '<br />' + contactAddress + '</p>' +

      '</li>'+'<button id="edit" data-toggle="modal" data-target="#myModal">Edit</button>'+" "+'<button id="del"><img src="/trashcan.gif" /></button></div>');
      $('input').val('');})
    });



});
