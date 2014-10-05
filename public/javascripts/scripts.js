// var router = Backbone.Router.extend({
//   routes: {
//     "":"rootPage"
//   },
//   rootPage: function(){
//     console.log('yes? no?');
//   }
// })



// $(function() {
var submit_btn = document.querySelectorAll("#submit");

var ContactView = Backbone.View.extend({
  tagName: 'li',

  initialize: function(){
    this.listenTo(contact_collection, 'add', this.addOne);
    contact_collection.fetch({reset: true});
  },

  addOne: function(){
    var contactView = new ContactCollection();
    formView.render();
  },
  render: function(){
    // var template = _.template($("#template").html(), {models: this.model})
    // $("contacts").append(this.$el.html(template));
    var innards = "<h3>"+this.model.get('name')+" "+"--"+this.model.get('category_id')+"</h3>"
    // this.$el.html(innards).append($('#contacts'));
    $("#contacts").append(this.$el.html(innards));
  }
});


var CategoryView = Backbone.View.extend({
  tagName: 'div',
  render: function(){
    var innards = "<p>"+this.model.get('name')+"</p>"
    $("#categories").append(this.$el.html(innards));
  }
});



var FormView = Backbone.View.extend({
    el: $('#form'),

    initialize: function(){
      $('#submit').on('click', function(){alert('yes.')});

    },

   events: {
     'click #submit' :function(e){console.log('whoa...');console.log(e)}
   },

   create: function(e){
     console.log(e);
     console.log('we in here');
     console.log(this);
     console.log($el);
     var contactName = this.$el.find('input[name="name"]').val();
     var contactAge = this.$el.find('input[name="age"]').val();
     var contactAddress = this.$el.find('textarea[name="address"]').val();
     var contactNumber = this.$el.find('input[name="number"]').val();
     var contactPicture = this.$el.find('input[name="picture"]').val();
     var contactCategory = this.$el.find('input[name="category"]').val(); //for testing use numbers, category_id is type integer
      contact_collection.create({name: contactName, age: contactAge, address: contactAddress, phone_number: contactNumber, picture: contactPicture, category_id: contactCategory});console.log('done');
   }
});


var ContactModel = Backbone.Model.extend({
  // urlRoot: "/contacts"
});

var CategoryModel = Backbone.Model.extend({
  // urlRoot: "/categories"
});

var ContactCollection = Backbone.Collection.extend({
  url: "/contacts",
  model: ContactModel
});

var CategoryCollection = Backbone.Collection.extend({
  url: "/categories",
  model: CategoryModel
});

// var ListView = Backbone.View.extend({
//   el: $("ul"),
//   initialize:function(){
//     this.listenTo(this.collection, "add", this.addOne);
//
//     contact_collection.fetch();
//   },
//
//   render: function(){
//     var innards = "<h3>"+this.model.get('name')+" "+"--"+this.model.get('category_id')+"</h3>"
//     $("#contacts").append(this.$el.html(innards));
//
//   },
//
//   addOne: function(item){
//     var view = new ContactView({model: item});
//     view.render();
//     this.$el.append(view.el);
//   }
// });

var formView = new FormView({collection: contact_collection, model: contact_collection});

// var list = new ListView({ collection: contact_collection});

var contact_collection = new ContactCollection();

// _.extend(contact_collection, Backbone.Events);
contact_collection.on('reset', function(){
  console.log('fetching from server');
});



contact_collection.fetch({success: function(){
  contact_collection.models.forEach(function(item){
    var view = new ContactView({model: item});
    view.render();
    console.log(contact_collection.length);
  });
  contact_collection.on('add', function(e){console.log(e)});
  console.log('added event');
}, reset: true})

category_collection = new CategoryCollection();

category_collection.fetch({success: function(){
  category_collection.models.forEach(function(item){
    var catView = new CategoryView({model: item});
    catView.render();
  })
}})
// });
