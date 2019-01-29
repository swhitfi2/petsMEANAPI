var express = require('express')

var router = express.Router()

// Getting the Pett Controller that we just created

var PetController = require('../../controllers/pet.controller.js');


// Map each API to the Controller Functions

router.get('/', PetController.getPets)

router.post('/', PetController.createPet)

router.put('/', PetController.updatePet)

router.delete('/:id',PetController.removePet)


// Export the Router

module.exports = router;