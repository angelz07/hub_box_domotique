var config = require('./config.global');

var fs = require("fs");

exports.add_obj_hc2_linknx = function(id_hc2, id_linknx, new_type, res, callback){
		var contenu;
	contenu = fs.readFile(config.dir_base+"/manager/variables_linknx_hc2.json", "utf8", function(err, data){
	    if(err){
	      console.log(err)
	    }else{
		    data = JSON.parse(data);
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

	    }        
	});
}

exports.delete_obj_hc2_linknx = function(id_hc2, id_linknx, type, res, callback){
	var contenu;
	contenu = fs.readFile(config.dir_base+"/manager/variables_linknx_hc2.json", "utf8", function(err, data){
	    if(err){
	      console.log(err)
	    }else{
		    data = JSON.parse(data);
		    var id_delete;
		    data.Objets.forEach(function (item, index) {
		    	var id_linknx_file = data.Objets[index].id_linknx;
   				var id_hc2_file = data.Objets[index].id_hc2;
   				var type_file = data.Objets[index].type;

   				if(id_linknx_file == id_linknx && id_hc2_file == id_hc2 && type_file == type){
   					id_delete = index 
   					
   				}

	    	});
	    	delete data.Objets[id_delete];
	    	
	    	data_modif = removeEmptyElem(data.Objets)
	    
	    	data.Objets = data_modif

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
		
	    }        
	});
}

exports.modif_obj_hc2_linknx = function(old_id_hc2, old_id_linknx, old_type, change_id_hc2, change_id_linknx, change_type, res, callback){
	
	var contenu;
	contenu = fs.readFile(config.dir_base+"/manager/variables_linknx_hc2.json", "utf8", function(err, data){
	    if(err){
	      console.log(err)
	    }else{
		    data = JSON.parse(data);
		    data.Objets.forEach(function (item, index) {
	        
   				var id_linknx_file = data.Objets[index].id_linknx;
   				var id_hc2_file = data.Objets[index].id_hc2;
   				var type_file = data.Objets[index].type;

   				if(id_linknx_file == old_id_linknx && id_hc2_file == old_id_hc2 && type_file == old_type){
   					data.Objets[index].id_linknx = change_id_linknx;
					data.Objets[index].id_hc2 = change_id_hc2;
					data.Objets[index].type = change_type;
   				}
   				
   			});

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
		}        
	});
}

function update_var_liste_hc2_linknx(res, callback){
	var contenu;
	contenu = fs.readFile(config.dir_base+"/manager/variables_linknx_hc2.json", "utf8", function(err, data){
		 if(err){
	      console.log(err)
	    }else{
	      	var data =  JSON.parse(data);

	      	var liste_hc2_linknx = require('./liste_hc2_linknx');
	      	liste_hc2_linknx.Objets = data.Objets;
			callback(liste_hc2_linknx, res);
		}        
	});
}

exports.update_var_liste_hc2_linknx_init = function(){
	var contenu;
	contenu = fs.readFile(config.dir_base+"/manager/variables_linknx_hc2.json", "utf8", function(err, data){
	    if(err){
	      console.log(err)
	    }else{
	      	var data =  JSON.parse(data);
	      	var liste_hc2_linknx = require('./liste_hc2_linknx');
	      	liste_hc2_linknx.Objets = data.Objets;
			
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