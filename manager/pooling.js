var config = require('./config.global');


var fs = require("fs");

exports.add_obj_pooling = function(id, description, box, res, callback){
	//console.log("id linknx  = " + id_linknx + " Id HC2 = " + id_hc2 + " new_type = " + new_type)
	var file_json;
	if(box == "linknx"){
    	file_json = config.dir_base+"/manager/pooling_linknx.json";
    }
	else if(box == "zibase"){
    	file_json = config.dir_base+"/manager/pooling_zibase.json";
    }

  	var contenu;
	contenu = fs.readFile(file_json, "utf8", function(err, data){
	    if(err){
	      console.log(err)
	    }else{
		    data = JSON.parse(data);
		    var exist = false;
		    data.Objets.forEach(function (item, index) {
		    	if(data.Objets[index].id){
		    		var id_file_tmp = data.Objets[index].id;
		    		if(id == id_file_tmp){
		    			exist = true
		    		}
		    	}
		    });

		    if(exist == true){
		    	//{"Objets":[]}

		    	var retour_erreur = '{"erreur":"exist"}';
		    	retour_erreur = JSON.stringify(retour_erreur)
		    	callback(retour_erreur, res)
		    }
		    else{
		    	//{"id":"Lumiere_Salle_a_Manger_Lustre_Table_Cmd","description":"on-off"}
			    data.Objets.push({'id': id ,'description': description});
		    	data = JSON.stringify(data)
		    	fs.writeFile(file_json, data, function(err) {
		          if (err) {
		            // Erreur
		            console.log('FAIL: ' + err.message)
		          } else {
		            // Succès :)
		    		if(box == "linknx"){
				    	var liste_pooling_linknx = require(config.dir_base+"/manager/liste_pooling_linknx");
				    	liste_pooling_linknx = data;

				    }
					else if(box == "zibase"){
				    	var liste_pooling_zibase = require(config.dir_base+"/manager/liste_pooling_zibase");
				    	liste_pooling_zibase = data;
				    }
			  		callback(data, res)
			  		//update_var_liste_hc2_linknx(res, callback);
		          }
		        });
		    }
		    

	    }        
	});
}

exports.update_var_listes_pooling_init = function(){
	var contenu_linknx = fs.readFile(config.dir_base+"/manager/pooling_linknx.json", "utf8", function(err, data){
	    if(err){
	      console.log(err)
	    }else{
	      	var data =  JSON.parse(data);
	      	var liste_pooling_linknx = require(config.dir_base+"/manager/liste_pooling_linknx");

	      	liste_pooling_linknx.Objets = data.Objets;
			//console.log(liste_hc2_linknx)
		}        
	});

	var contenu_zibase = fs.readFile(config.dir_base+"/manager/pooling_zibase.json", "utf8", function(err, data){
	    if(err){
	      console.log(err)
	    }else{
	      	var data =  JSON.parse(data);
	      	var liste_pooling_zibase = require(config.dir_base+"/manager/liste_pooling_zibase");
	      	liste_pooling_zibase.Objets = data.Objets;
			//console.log(liste_hc2_linknx)
		}        
	});

}

exports.list_linknx = function(res,callback){
	var contenu_linknx = fs.readFile(config.dir_base+"/manager/pooling_linknx.json", "utf8", function(err, data){
	    if(err){
	      console.log(err)
	    }else{
	      	var data =  JSON.parse(data);
	      	callback(data, res)
			//console.log(liste_hc2_linknx)
		}        
	});

	
}

exports.list_zibase = function(res,callback){
	var contenu_linknx = fs.readFile(config.dir_base+"/manager/pooling_zibase.json", "utf8", function(err, data){
	    if(err){
	      console.log(err)
	    }else{
	      	var data =  JSON.parse(data);
	      	callback(data, res)
			//console.log(liste_hc2_linknx)
		}        
	});

	
}

exports.delete_objet = function(id, description, box, res, callback){
	var file_json;
	if(box == "linknx"){
    	file_json = config.dir_base+"/manager/pooling_linknx.json";
    }
	else if(box == "zibase"){
    	file_json = config.dir_base+"/manager/pooling_zibase.json";
    }

	var contenu = fs.readFile(file_json, "utf8", function(err, data){
	    if(err){
	      console.log(err)
	    }else{
		    data = JSON.parse(data);
		    var id_delete;
		    data.Objets.forEach(function (item, index) {
		    	var id_file = data.Objets[index].id;
   				var description = data.Objets[index].description;
   				
   				if(id_file == id ){
   					id_delete = index 
   					
   				}

	    	});
	    	delete data.Objets[id_delete];
	    	
	    	data_modif = removeEmptyElem(data.Objets)
	    
	    	data.Objets = data_modif

	    	data = JSON.stringify(data)

	    	fs.writeFile(file_json, data, function(err) {
	          if (err) {
	            // Erreur
	            console.log('FAIL: ' + err.message)
	          } else {
	            // Succès :)
	    		if(box == "linknx"){
			    	var liste_pooling_linknx = require(config.dir_base+"/manager/liste_pooling_linknx");
			    	 	liste_pooling_linknx = data;
			    	 	console.log(liste_pooling_linknx)
			    	
			    }
				else if(box == "zibase"){
			    	var liste_pooling_zibase = require(config.dir_base+"/manager/liste_pooling_zibase");
			    	liste_pooling_zibase = data;
			    }
		  		callback(data, res)
		  		//update_var_liste_hc2_linknx(res, callback);
	          }
	        });
		 /*
	    	data.Objets.push({'id_linknx': id_linknx ,'id_hc2': id_hc2, 'type': new_type});
	    	data = JSON.stringify(data)
	    	fs.writeFile(config.dir_base+"/manager/variables_linknx_hc2.json", data, function(err) {
	          if (err) {
	            // Erreur
	            console.log('FAIL: ' + err.message)
	          } else {
	            // Succès :)
		  		update_var_liste_hc2_linknx(res, callback);
	          }
	        });
			*/
	    }        
	});

}


function removeEmptyElem(ary) {
    for (var i=ary.length;i>=0;i--) {
        if (ary[i] == undefined)  {
            ary.splice(i, 1);
        }
        else if(ary[i] == null)  {
            ary.splice(i, 1);
        }  	
    }
    return ary;
}