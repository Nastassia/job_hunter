var router = Backbone.Router.extend({
  routes: {
    "":"rootPage"
  },
  rootPage: function(){
    console.log('yes? no?');
  }
})

var ContactModel = Backbone.Model.extend({
  urlRoot: "/contacts"
});

var ContactCollection = Backbone.Collection.extend({
  url: "/contacts",
  model: ContactModel
});

contact_collection = new ContactCollection();

contact_collection.fetch({success: function(){
  contact_collection.models.forEach(function(item){
    var view = new ContactView({model: item});
    view.render();
  })
}})


var ContactView = Backbone.View.extend({
  tagName: 'li',
  render: function(){
    var innards = "<h3>"+this.model.get('name')+" "+"--"+this.model.get('category_id')+"</h3>"
    // this.$el.html(innards).append($('#contacts'));
    $("#contacts").append(this.$el.html(innards));
  }
})
