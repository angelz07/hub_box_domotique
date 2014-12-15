var config = require('./config.global');
var fs = require("fs");

exports.lecture_variable_json_file = function(){
	var contenu;
	contenu = fs.readFile(config.dir_base+"/manager/variables.json", "utf8", function(err, data){
	    if(err){
	      console.log(err)
	    }else{
	      mise_a_jour_variable(data);
	    }        
	});
}

function mise_a_jour_variable(arg){
	var vars_general =  JSON.parse(arg);
	config.env = vars_general.environement;
	config.port_nodejs = vars_general.port_nodejs;
	config.port_linknx = vars_general.port_linknx;
	config.port_linknx_event = vars_general.port_linknx_event;
	config.zibase_ip = vars_general.zibase_ip;
	config.zibase_platform = vars_general.zibase_platform;
	config.zibase_nom = vars_general.zibase_nom;
	config.zibase_token = vars_general.zibase_token;
	config.zibase_debug = vars_general.zibase_debug;
	config.ip_linknx = vars_general.ip_linknx;


	config.ip_hc2 = vars_general.ip_hc2;
	config.port_hc2 = vars_general.port_hc2;
	config.user_hc2 = vars_general.user_hc2;
	config.pass_hc2 = vars_general.pass_hc2;

	config.pooling_zibase = vars_general.pooling_zibase;
	config.pooling_linknk = vars_general.pooling_linknk;
	//console.log(config)

}

exports.update_variable = function(env, port_node, zibase_ip, zibase_platform, zibase_nom, zibase_token, zibase_debug, ip_linknx, port_linknx, port_linknx_event, ip_hc2, port_hc2, user_hc2, pass_hc2,pooling_zibase, pooling_linknk,res,callback_liste_objet,callback_restart_node){
	var contenu;
	var callback;
	contenu = fs.readFile(config.dir_base+"/manager/variables.json", "utf8", function(err, data){
	    if(err){
	      console.log(err)
	    }else{
	    // console.log("env = " + env)
	      var fichier_json = JSON.parse(data);
	      var change_port_node = false;
	      console.log(fichier_json.port_nodejs + " <---> "  + port_node)
	      if(fichier_json.port_nodejs != port_node){
	      		//console.log("port different")
	      		
	      		change_port_node = true;
	      }
	      else{
	      	change_port_node = false;
	      }
	      
	      

	      var change_interval = false;
	      if(fichier_json.pooling_linknk != pooling_linknk || fichier_json.pooling_zibase != pooling_zibase){
	      		//console.log("port different")
	      		
	      		change_interval = true;
	      }
	      else{
	      	change_interval = false;
	      }
	      





	      if(pooling_zibase == ""){
	      	pooling_zibase = 5000;
	      }

	      if(pooling_linknk == ""){
	      	pooling_linknk = 5000;
	      }
	      
	      fichier_json.environement = env;
		  fichier_json.port_nodejs = port_node;
		  fichier_json.ip_linknx = ip_linknx;
		  fichier_json.port_linknx = port_linknx;
		  fichier_json.port_linknx_event = port_linknx_event;
		  fichier_json.zibase_ip = zibase_ip;
		  fichier_json.zibase_platform = zibase_platform;
		  fichier_json.zibase_nom = zibase_nom;
		  fichier_json.zibase_token = zibase_token;
		  fichier_json.zibase_debug = zibase_debug;
		  
		  fichier_json.ip_hc2 = ip_hc2;
		  fichier_json.port_hc2 = port_hc2;
		  fichier_json.user_hc2 = user_hc2;
		  fichier_json.pass_hc2 = pass_hc2;

		  fichier_json.pooling_zibase = pooling_zibase;
		  fichier_json.pooling_linknk = pooling_linknk;


		  fichier_json = JSON.stringify(fichier_json)

		//  console.log(fichier_json)

		  fs.writeFile(config.dir_base+"/manager/variables.json", fichier_json, function(err) {
	          if (err) {
	            // Erreur
	            console.log('FAIL: ' + err.message)
	          } else {
	            // Succès :)
		  console.log(change_port_node)
		  		if(change_port_node == true){
		  			
		  			callback_restart_node(port_node, res, callback);
		  		}
		  		else if(change_interval == true){
		  			//console.log(fichier_json)
		  			mise_a_jour_variable(fichier_json)
		  			var cron_node = require('./cron')
					var Stop_setIntervalLinknx = cron_node.setResetIntervalLinknx(false);
					var Stop_setIntervalZibase = cron_node.setResetIntervalZibase(false);
					setTimeout(function() {
						var Start_setIntervalLinknx = cron_node.setResetIntervalLinknx(true);
						var Start_setIntervalZibase = cron_node.setResetIntervalZibase(true);
					}, 2000);
		  			/*

						callback_restart_node

		  			*/
		  			
		  		}
		  		else{
		  			mise_a_jour_variable(fichier_json)
		  			var vars_general =  JSON.parse(fichier_json);

		  			callback_liste_objet(vars_general,res);
		  		}
	            //console.log('OK');
	          }
	        });

	    }        
	});
}

function restart_node(port_node, res, callback){
	
}