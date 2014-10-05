var ContactsView = Backbone.View.extend({

  tagName: 'li',
  ctsTpl: _.template("bleh."),
  events: {
    'click #submit': 'submit'
  },

  render: function(){
    this.$el.html(this.ctsTpl( this.model.toJSON() ));
    return this;
  }

})




// $(function() {

var ContactModel = Backbone.Model.extend({
  urlRoot: '/contacts',
  initialize: function(){
    console.log('bleh. contact model intialized.');
    this.on('change', function(){
      console.log('Contact Model changed.');
    });
  },

  defaults: {
    name: 'darthSidious',
    category_id: 3
  }
});

var all_contacts = new ContactModel({name: "Mehbot.", category_id: 2});
console.log(JSON.stringify(all_contacts));

var contactsView = new ContactsView({model: all_contacts});
contactsView.render();

// });
