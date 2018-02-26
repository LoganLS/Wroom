/*
* config.Db contient les parametres de connection à la base de données
* il va créer aussi un pool de connexions utilisables
* sa méthode getConnection permet de se connecter à MySQL
*
*/

let db = require('../configDb');

/*
* Récupérer l'intégralité les écuries avec l'adresse de la photo du pays de l'écurie
* @return Un tableau qui contient le N°, le nom de l'écurie et le nom de la photo du drapeau du pays
*/
module.exports.getListeEcurie = function (callback) {
   // connection à la base
	db.getConnection(function(err, connexion){
        if(!err){
        	  // s'il n'y a pas d'erreur de connexion
        	  // execution de la requête SQL
						let sql ="SELECT ecunum, payadrdrap, ecunom FROM ecurie e INNER JOIN pays p ";
						sql= sql + "ON p.paynum=e.paynum ORDER BY ecunom";
						//console.log (sql);
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
         }
      });
};

module.exports.getPiloteNumEcurie=function(num,callback){
    // connection a la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requete SQL
            let sql="SELECT PILNOM, PILPRENOM FROM pilote WHERE ECUNUM = " + num + " ";
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};

module.exports.getInfosEcuries=function(callback){
    // connection a la base
    db.getConnection(function(err, connexion){
        if(!err){
            // s'il n'y a pas d'erreur de connexion
            // execution de la requete SQL
            let sql="SELECT e.ECUNOM, e.ECUNOMDIR, e.ECUADRSIEGE, pa.PAYNOM, fp.FPNOM FROM ecurie e, pays p, fourn_pneu fp WHERE" +
                " e.PAYNUM = p.PAYNUM AND e.FPNUM = fp.FPNUM";
            connexion.query(sql, callback);

            // la connexion retourne dans le pool
            connexion.release();
        }
    });
};