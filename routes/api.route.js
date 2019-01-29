var express = require('express')

var router = express.Router()
var pets = require('./api/pets.route')


router.use('/pets', pets);


module.exports = router;