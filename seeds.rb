require 'pry'
require_relative './db/connection'
require_relative './lib/category'
require_relative './lib/contact'

Category.delete_all
Contact.delete_all

alumni = Category.create(name: "Alumni")
networking = Category.create(name: "Networking")
hr = Category.create(name: "HR")


Contact.create(name: "Sean", category_id: alumni.id)
Contact.create(name: "Jeff", category_id: alumni.id)
Contact.create(name: "Neel", category_id: alumni.id)
