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

var CategoryModel = Backbone.Model.extend({
  urlRoot: "/categories"
});

var ContactCollection = Backbone.Collection.extend({
  url: "/contacts",
  model: ContactModel
});

var CategoryCollection = Backbone.Collection.extend({
  url: "/categories",
  model: CategoryModel
});

contact_collection = new ContactCollection();

contact_collection.fetch({success: function(){
  contact_collection.models.forEach(function(item){
    var view = new ContactView({model: item});
    view.render();
  })
}})

category_collection = new CategoryCollection();

category_collection.fetch({success: function(){
  category_collection.models.forEach(function(item){
    var catView = new CategoryView({model: item});
    catView.render();
  })
}}
)


var ContactView = Backbone.View.extend({
  tagName: 'li',
  render: function(){
    // var template = _.template($("#template").html(), {models: this.model})
    // $("contacts").append(this.$el.html(template));
    var innards = "<h3>"+this.model.get('name')+" "+"--"+this.model.get('category_id')+"</h3>"
    // this.$el.html(innards).append($('#contacts'));
    $("#contacts").append(this.$el.html(innards));
  }
})

var CategoryView = Backbone.View.extend({
  tagName: 'div',
  render: function(){
    var innards = "<p>"+this.model.get('name')+"</p>"
    $("#categories").append(this.$el.html(innards));
  }
})
