/**
 * Created by alicamargo on 6/21/16.
 */


exports.list = function(req, res, next){
    // console.log(Pet)
    Pet.listPets({}, function (_error, _pets) {
        if (_error){
            sendJsonResponse(res, 400, { message: 'error', error: _error});
        }else{
            sendJsonResponse(res, 200, { pets: _pets} );
        }
    });

};

exports.show = function(req, res, next){
    Pet.showPet(id, function (_error, _pet) {
        if (_error){
            sendJsonResponse(res, 400, { message: 'pet not found', error: _error });
        }else{
            sendJsonResponse(res, 200, { pet: _pet } );
        }
    });
};

exports.create = function(req, res, next){
    Pet.createPet( req.body.pet, function (_error, _pet) {
        if (_error){
            sendJsonResponse(res, 400, { message: 'error', error: _error });
        }else{
            sendJsonResponse(res, 201, { message: 'saved!', pet: _pet } );
        }
    });
};

exports.update = function(req, res, next){
    Pet.updatePet( req.params.id, req.body.pet, function (_error, _pet) {
        if (_error){
            sendJsonResponse(res, 400, { message: 'error', error: _error });
        }else{
            sendJsonResponse(res, 201, { message: 'saved!', pet: _pet } );
        }
    });
};

exports.destroy = function(req, res, next){
    Pet.deletePet( req.params.id, function (_error, _pet) {
        if (_error){
            sendJsonResponse(res, 400, { message: 'error', error: _error});
        }else{
            sendJsonResponse(res, 201, { message: 'removed!', pet: _pet} );
        }
    });
};