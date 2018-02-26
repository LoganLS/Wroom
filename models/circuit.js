/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité des circuits avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N° du circuit, le nom de la photo du drapeau du pays et le nom du circuit
*/
module.exports.getListeCircuit = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT cirnum, payadrdrap, cirnom FROM circuit c INNER JOIN pays p ";
						sql= sql + "ON p.paynum=c.paynum";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getInfosCircuit = function (num,callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT cirnom,cirlongueur, cirnbspectateurs, ciradresseimage,cirtext,paynom FROM circuit c INNER JOIN pays p ";
						sql+= "ON p.paynum=c.paynum ";
						sql+="WHERE cirnum="+num;
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getMenuCircuit = function (callback) {
	db.getConnection(function(err, connexion){
        if(!err){
			let sql ="SELECT cirnum,cirnom,cirlongueur,cirnbspectateurs FROM circuit ";
			sql+="ORDER BY cirnom";
            connexion.query(sql, callback);

            connexion.release();
         }
      });
};