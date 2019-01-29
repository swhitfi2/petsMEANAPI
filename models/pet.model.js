var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PetSchema = new mongoose.Schema({
    name: String,
    petName: String,
    description: String,
    date: Date,
    status: String
})

PetSchema.plugin(mongoosePaginate)
const Pet = mongoose.model('Pet', PetSchema)

module.exports = Pet;