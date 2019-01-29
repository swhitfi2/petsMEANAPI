// Access our newly created Mongoose Model
var Pet = require('../models/pet.model.js')

// Saving the context of this module inside the _the variable
_this = this

// Let's use an Async function to get the To Do List
exports.getPets = async function(query, page, limit){

    // We also want to set up options for the mongoose paginate

    var options = {
        page,
        limit
    }

//Let's create a Try and Catch function 
//that way we have some error handling set. 
//Waiting for the promise
    
try {
    var pets = await Pet.paginate(query, options)
    
//Once the Mongoose promise is returned 
//we're going to go ahead and return 
//the To Do List it has produced 

    return pets;

} catch (e) {

//If the try didn't work we're going to 
//go ahead and let the users know what kind of 
//Error we have

    throw Error('Oh No! We got an error while Paginating our Pet list task, so sorry!' )
}
}

//new function create
exports.createPet = async function(pet){
    
    // Creating a new Mongoose Object by using the new keyword
    
        var newPet = new Pet({
            name: pet.name,
            petName: pet.petName,
            description: pet.description,
            date: new Date(),
            status: pet.status
        })
    
        try{
    
            // Let's go ahead and save the Pett 
    
            var savedPet= await newPet.save()
    
            return savedPet;
        }catch(e){
          
            //if we can't create a Pet we want to throw an error 
    
            throw Error("Error while Creating Pet")
        }
    }

    //new function update
    exports.updatePet = async function(pet){
        var id = pet.id
    
        try{
            //Find the old Pet Object by the Id
        
            var oldPet = await Pet.findById(id);
        }catch(e){
            throw Error("Error occured while Finding the Pet")
        }
    
        // If no old Pet Object exists return false
    
        if(!oldPet){
            return false;
        }
    
        console.log(oldPet)
    
        //Edit the Pet Object
    
       oldPet.name = pet.name
       oldPet.petName = pet.petName
       oldPet.description = pet.description
       oldPet.status = pet.status

       
    
        console.log(oldPet)
    
        try{
            var savedPet = await oldPet.save()
            return savedPet;
        }catch(e){
            throw Error("And Error occured while updating the Pet");
        }
    }

    //new function delete
    exports.deletePet = async function(id){
    
        // Delete the Pet
    
        try{
            var deleted = await Pet.deleteOne({_id: id})
            if(deleted.n === 0){
                throw Error("Pet Could not be deleted")
            }
            return deleted
        }catch(e){
            throw Error("Error Occured while Deleting the Pet")
        }
    }
