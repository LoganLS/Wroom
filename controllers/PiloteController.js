let model=require('../models/pilote.js');
var async=require('async');
// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S

module.exports.Repertoire = function(request, response){
	response.title = 'Répertoire des pilotes';
	model.getPremiereLettreNom(function(err,result){
		if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.listePremiereLettreNom = result;	
        console.log(result);
        response.render('repertoirePilotes', response);
	});
 }
 
module.exports.listeNom=function(request,response){
    response.title='Liste Pilotes';
	var lettre=request.params.lettreNom;
	/*model.getListePiloteParNom(lettre,function(err,result){
	   if(err){
           console.log(err);
           return;
       } 
        response.listePiloteParNom=result;
        console.log(result);
        response.render('listePiloteLettre',response);
    });*/
    
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

module.exports.infosPilote=function(request,response){
    response.title='Détail Pilote';
    var id=request.params.idPilote;
    
    async.parallel([
        function(callback){
            model.getPremiereLettreNom(function(err,result){
               callback(null,result);
            });
        }, //fin callback0
        
        function(callback){
            model.getInformationsOfOnePilote(id,function(err,result){
               callback(null,result);
            });
        }, //fin callback1
        
        function(callback){
            model.getAllSponsorsOfOnePilote(id,function(err,result){
               callback(null,result);
            });
        }, //fin callback2
    
        function(callback){
            model.getAllPhotosOfOnePilote(id,function(err,result2){
               callback(null,result2);
            });
        }, //fin callback3
        
        function(callback){
            model.getStableofOnePilote(id,function(err,result2){
               callback(null,result2);
            });
        }, //fin callback4
    ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.listePremiereLettreNom=result[0];
            response.detailPilote=result[1][0];
            response.sponsorsPilote=result[2];
            response.photosPilote=result[3];
            response.ecuriePilote=result[4];
            response.render('detailPilote',response);
        }
    );//fin async
}

module.exports.menuPilote = function(request, response){
	response.title = 'Menu des Pilotes';
    response.css="pilote";
	model.getMenuPilote(function(err,result){
		if (err) {
            // gestion de l'erreur
            console.log(err);
            return;
        }
        response.menuPilote = result;	
        console.log(result);
        response.render('menuPilotes', response);
	});
 }

module.exports.ajouterPilote = function(request, response){
	response.title = 'Ajouter un pilote';
    response.css="pilote";
    async.parallel([
        function(callback){
            model.getAllNationalite(function(err,result){
               callback(null,result);
            });
        }, //fin callback0
        
        function(callback){
            model.getAllEcurie(function(err,result){
               callback(null,result);
            });
        }, //fin callback1
    ],
        function(err,result){
            if(err){
                console.log(err);
                return;
            }
            response.listeNationalite=result[0];
            response.listeEcurie=result[1];
            response.render('ajouterPilote',response);
        }
    );//fin async
 }