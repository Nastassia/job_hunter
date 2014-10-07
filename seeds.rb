require 'pry'
require_relative './db/connection'
require_relative './lib/category'
require_relative './lib/contact'

Category.delete_all
Contact.delete_all

alumni = Category.create(name: "Alumni")
networking = Category.create(name: "Networking")
hr = Category.create(name: "HR")


Contact.create(name: "Balthazar Stevik", age: 27, address: "1025 Windermere Lane", phone_number: "555-432-9484", category_id: networking.id)
Contact.create(name: "Gabrielle Newton", age: 33, address: "45 Telerman Drive", phone_number: "555-314-1618", category_id: alumni.id)
Contact.create(name: "Ebenezer Eaton", age: 25, address: "903 Chestnut Road", phone_number: "555-001-3141", category_id: hr.id)
