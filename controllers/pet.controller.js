// We need to be able to access the Service 
//that we just created so let's pull that in

var PetService = require('../services/pet.service.js');

// Make sure to save the context of 
//this module inside the _this variable

_this = this

//read function
exports.getPets = async function(req, res, next){

    // We're going to use ternary to check 
    //the existence of the query parameters
        
        var page = req.query.page ? req.query.page : 1
        var limit = req.query.limit ? req.query.limit : 10; 
    
        try{
        
            var pets = await PetService.getPets({}, page, limit)
            
    // Return the pets list with the appropriate 
    //HTTP Status Code and Message.
            
            return res.status(200).json({status: 200, data: pets, message: "Succesfully Pets Recieved"});
            
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
            return res.status(400).json({status: 400, message: e.message});
            
        }
    }

    //create function
    exports.createPet = async function(req, res, next){

        // Note: Req.Body contains the form submit values.
    
        var pet = {
                name: req.body.name,
                petName: req.body.petName,
                description: req.body.description,       
                status: req.body.status
        }
    
        try{
            
    // Calling the Service function 
    //with the new object from the Request Body
        
            var createdPet = await PetService.createPet(pet)
            return res.status(201).json({status: 201, data: createdPet, message: "Succesfully Created Pet"})
        }catch(e){
            
    //Return an Error Response Message 
    //with Code and the Error Message.
            
    return res.status(400).json({status: 400, message: "Pet Creation was Unsuccesfull, I am sorry :( "})
        }
    }
//update pet
    exports.updatePet = async function(req, res, next){

        // Id is necessary for the update
    
        if(!req.body._id){
            return res.status(400).json({status: 400., message: "Id must be present"})
        }
    
        var id = req.body._id;
    
        console.log(req.body)
    
        var pet = {
            id,
            name: req.body.name ? req.body.name : null,
            petName: req.body.petName ? req.body.petName : null,
            description: req.body.description ? req.body.description : null,
            status: req.body.status ? req.body.status : null
        }
    
        try{
            var updatedPet = await PetService.updatePet(pet)
            return res.status(200).json({status: 200, data: updatedPet, message: "Succesfully Updated Pet"})
        }catch(e){
            return res.status(400).json({status: 400., message: e.message})
        }
    }

    //new function delete
    exports.removePet = async function(req, res, next){

        var id = req.params.id;
    
        try{
            var deleted = await PetService.deletePet(id)
            return res.status(204).json({status:204, message: "Succesfully Pet Deleted"})
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    
    }
    
    
