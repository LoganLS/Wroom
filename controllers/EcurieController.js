let model = require('../models/ecurie.js');

   // //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function(request, response){
   response.title = 'Liste des écuries';
    model.getListeEcurie( function (err, result) {
        if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        response.render('listerEcurie', response);
	});
}

module.exports.listeNom=function(request,response){
    response.title='Liste Pilotes';
    var lettre=request.params.lettreNom;

    async.parallel([
            function(callback){
                model.getPremiereLettreNom(function(err,result){
                    callback(null,result);
                });
            }, //fin callback0

            function(callback){
                model.getListePiloteParNom(lettre,function(err,result){
                    callback(null,result);
                });
            }, //fin callback1

        ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.listePremiereLettreNom=result[0];
            response.listePiloteParNom=result[1];
            response.render('listePiloteLettre',response);
        }
    );//fin async
}