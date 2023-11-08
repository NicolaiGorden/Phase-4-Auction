# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

#USERS
User.create(username: "Riser", password: "Lives2Hunt")
User.create(username: "Aurora", password: "Chocolates")
User.create(username: "Pin", password: "Robotsrule")
User.create(username: "Scartingle", password: "Daboss")
User.create(username: "Buck", password: "Ultimatepower")

#ITEMS
Item.create(name: "Really Cool Bass", start_price: 120.00)
Item.create(name: "Donkey Kong 64", start_price: 35.22)

