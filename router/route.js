/* Callback */
var callback = require('../manager/callback');
var config = require('../manager/config.global');
var linknx_hc2 = require('../manager/linknx_hc2.js')
var liste_hc2_linknx = require('../manager/liste_hc2_linknx');
var pooling = require('../manager/pooling');

module.exports=function(app)
{
	app.get('/',function(req,res){
		res.render('index.html')
	});
	
	app.get('/config',function(req,res){
		res.render('config.html');
	});

    app.get('/config_hc2',function(req,res){
        res.render('config_hc2.html');
    });
    
    app.get('/pooling_nodejs',function(req,res){
        res.render('pooling.html');
    });

	app.get('/about',function(req,res){
		res.render('about.html');
	});



	/* Liste des objets domotique */
	app.get('/liste_objet', function (req, res) {
		//http://192.168.1.25:8777/liste_objet
	    var json = require('../manager/variable_objets_box').json;
	    callback.callback_liste_objet(json,res);
	});



	/* Variables */
	app.get('/liste_variables', function (req, res) {
		//http://192.168.1.25:8777/liste_variables
	    var json = require('../manager/variable_objets_box').json;
	    callback.callback_liste_objet(config,res);
	});

	app.get('/update_vars', function (req, res) {
		///http://192.168.1.25:8777/update_vars?env=Production&port_node=8777&zibase_ip=192.168.1.7&zibase_platform=zibase2.net&zibase_nom=Xi10c9xe8d1bb05&zibase_token=0c21b4e68a&zibase_debug=false&ip_linknx=127.0.0.1&port_linknx=1028&port_linknx_event=80
		var env = req.query.env;
    	var port_node = req.query.port_node;
    	var zibase_ip = req.query.zibase_ip;
    	var zibase_platform = req.query.zibase_platform;
    	var zibase_nom = req.query.zibase_nom;
    	var zibase_token = req.query.zibase_token;
    	var zibase_debug = req.query.zibase_debug;
    	var ip_linknx = req.query.ip_linknx;
    	var port_linknx = req.query.port_linknx;
    	var port_linknx_event = req.query.port_linknx_event;


        // + "&ip_hc2=" + ip_hc2 + "&port_hc2=" + port_hc2 + "&user_hc2=" + user_hc2 + "&pass_hc2=" + pass_hc2
    	var ip_hc2 = req.query.ip_hc2;
        var port_hc2 = req.query.port_hc2;
        var user_hc2 = req.query.user_hc2;
        var pass_hc2 = req.query.pass_hc2;
    	
        var pooling_linknk = req.query.pooling_linknk;
        var pooling_zibase = req.query.pooling_zibase;

    	var mise_a_jour_variable = require('../manager/gestion_variables');
    	mise_a_jour_variable.update_variable(env, port_node, zibase_ip, zibase_platform, zibase_nom, zibase_token, zibase_debug, ip_linknx, port_linknx, port_linknx_event, ip_hc2, port_hc2, user_hc2, pass_hc2, pooling_zibase, pooling_linknk, res,callback.callback_liste_objet,callback.callback_restart_node);
	});

	/* envoie commande domo */
	app.get('/send_cmd', function (req, res) {
		var demande = req.query.demande;
    	console.log("Demande = " + demande)
       // console.log(req)
    	if(demande == "zibase"){
    		//http://192.168.1.25:8777/send_cmd?demande=zibase&id=ZA7&nom=Wallplug&type=on_off&protocol=ZWave%20n6&value=on
    		//http://192.168.1.25:8777/send_cmd?demande=zibase&id=A1&nom=Prise%20Rf%20Cuisine&type=on_off&protocol=Chacon&value=on
    		var zibase = require('../manager/zibase/zibase');
    		var id = req.query.id;
    		//var nom = req.query.nom;
    		//var type = req.query.type;
    		//var protocol = req.query.protocol;
    		var value = req.query.value;
    		var send_cmd = zibase.send_cmd(id, value, res)
    		res.end();
    	}
	   	else if(demande == "linknx"){
	   		//http://192.168.1.25:8777/send_cmd?demande=linknx&id=Lumiere_Salle_a_Manger_Lustre_Table_Cmd&nom=Lustre%20Salle%20%C3%A0%20Mang%C3%A9e&type=on_off&protocol=knx&value=off
    		var linknx = require('node-linknx');
    		var id = req.query.id;
    		//var nom = req.query.nom;
    		//var type = req.query.type;
    		//var protocol = req.query.protocol;
    		var value = req.query.value;
            console.log("id hc2 ---- >"  + id)
			var send_cmd = linknx.change_state(config.ip_linknx,config.port_linknx,id,value,callback.callback_log);
    		res.end();
    	}
	});

    app.get('/hc2_ask_WS131073',function(req,res){

        var WS131073 = require('../manager/variable_objets_box').WS131073;
        if(WS131073 != null){
            console.log('non null')
        }
        else{
            console.log("null")
        }
        console.log(WS131073)
        res.header("Content-Type", "application/json");
        res.header('Last-Modified', (new Date()).toUTCString());
        res.send(WS131073);
        res.end();
    });


    app.get('/etat_linknx_1_obj',function(req,res){
        var linknx = require('node-linknx');
        var id_linknx = req.query.id_linknx;
        console.log("---------------------------   -demande hc2 temp piece")
        var Liste_objects_linknx = new Array();
        Liste_objects_linknx = '{"objects":['
        Liste_objects_linknx = Liste_objects_linknx + '{"id":"' + id_linknx + '"}'
        Liste_objects_linknx = Liste_objects_linknx + ']}';
        Liste_objects_linknx = JSON.parse(Liste_objects_linknx);
        var multi_status_linknx = linknx.status_multi(config.ip_linknx,config.port_linknx,Liste_objects_linknx, res, callback.callback_etat);
    });


    app.get('/linknx_hc2',function(req,res){
        var demande = req.query.demande;
        console.log("Demande = " + demande)
       // console.log(req)
        if(demande == "record_lien_linknx_hc2"){
           var id_hc2 = req.query.new_id_hc2;
           var id_linknx = req.query.new_id_linknx; 
           var new_type = req.query.new_type
          
           var linknx_hc2_add_obj =  linknx_hc2.add_obj_hc2_linknx(id_hc2, id_linknx, new_type, res, callback.callback_liste_objet)
            
        }
        else if(demande == "delete_lien_linknx_hc2"){
           var id_hc2 = req.query.id_hc2;
           var id_linknx = req.query.id_linknx; 
           var type = req.query.type_device;

           var linknx_hc2_delete_obj =  linknx_hc2.delete_obj_hc2_linknx(id_hc2, id_linknx, type, res, callback.callback_liste_objet)

        }
        else if(demande == "modif_lien_linknx_hc2"){
           var old_id_linknx = req.query.old_id_linknx;
           var old_id_hc2 = req.query.old_id_hc2; 
           var old_type = req.query.old_type;

           var change_id_linknx = req.query.change_id_linknx;
           var change_id_hc2 = req.query.change_id_hc2; 
           var change_type = req.query.change_type;


//old_id_linknx=" + old_id_linknx + "&old_id_hc2=" + old_id_hc2 + "&old_type=" + old_type +
// "&change_id_linknx=" + change_id_linknx + "&change_id_hc2=" + change_id_hc2 + "&change_type=" + change_type 
           var linknx_hc2_modif_obj =  linknx_hc2.modif_obj_hc2_linknx(old_id_hc2, old_id_linknx, old_type, change_id_hc2, change_id_linknx, change_type, res, callback.callback_liste_objet)
        }

       
    });

    app.get('/liste_objet_linknx',function(req,res){
        var linknx = require('node-linknx');
        var liste_objet_linknx = linknx.liste_objets_linknx(res, callback.callback_liste_objet);
    });

    app.get('/liste_objet_linknx_hc2',function(req,res){
        
        callback.callback_liste_objet(liste_hc2_linknx, res);
    });
    


    app.get('/pooling_config',function(req,res){
        var demande = req.query.demande;
        console.log("Demande = " + demande)
       
       if(demande == "add_pooling_linknx"){
           var description = req.query.description;
           var id_linknx = req.query.id_linknx; 
           var box = "linknx";
           var add_objet_linknx_pooling = pooling.add_obj_pooling(id_linknx, description, box, res, callback.callback_liste_objet);
        }

        else if(demande == "liste_pooling_linknx"){
            var list_objet_linknx_pooling = pooling.list_linknx(res, callback.callback_liste_objet);

        }
        else if(demande == "liste_pooling_zibase"){
            var list_objet_zibase_pooling = pooling.list_zibase(res, callback.callback_liste_objet);
        }

        else if(demande == "delete_objet_linknx2"){
            var id_linknx = req.query.id_linknx;
            var description = req.query.description;
            var box = 'linknx'
            var del_objet_linknx_pooling = pooling.delete_objet(id_linknx, description, box, res, callback.callback_liste_objet);
        }
        
    });

// http://192.168.1.25:8777/linknx_hc2?demande=record_lien_linknx_hc2&new_id_hc2=555&new_id_linknx=id_standby"



app.get('/test',function(req,res){
        var http = require('http');
    

    //var data = querystring.stringify({
    //    args: "[88]"
    //    password: " pass"
    //  });
    var data = ' {"args":["Volet_cuisine_porte_status", "64.8"]}'
    console.log("data = " + data)
    var auth = 'Basic ' + new Buffer("admin:admin").toString('base64');
    var options = {
        host: '192.168.1.11',
        port: 80,
        path: '/api/devices/322/action/receive_data',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": auth,
            'Content-Length': Buffer.byteLength(data)
        }
    };

    var httpreq = http.request(options, function (response) {
    response.setEncoding('utf8');
    console.log(response.body);
    response.on('data', function (chunk) {
      console.log("body: " + chunk);
    });
    response.on('end', function() {
        console.log('ok')
     // res.send('ok');
    })
  });
  httpreq.write(data);
  httpreq.end();

    });


/*

*/

}

/*
var Liste_objects_linknx = new Array();
Liste_objects_linknx = '{"objects":['
Liste_objects_linknx = Liste_objects_linknx + '{"id":"Lumiere_Chambre_2_Rue_Status"},'
Liste_objects_linknx = Liste_objects_linknx + '{"id":"Lumiere_Petite_Buanderie_Plafond_Status"},'
Liste_objects_linknx = Liste_objects_linknx + '{"id":"Chauffage_salle_a_mangee_temp_ambiante"},'
Liste_objects_linknx = Liste_objects_linknx + '{"id":"Chauffage_cuisine_setpoint_in"},'
Liste_objects_linknx = Liste_objects_linknx + '{"id":"Chauffage_cuisine_mode_choix"},'
Liste_objects_linknx = Liste_objects_linknx + '{"id":"Arduino_remise_3_status"},'
Liste_objects_linknx = Liste_objects_linknx + '{"id":"Lumiere_Chambre_2_Cote_Ensemble_Cmd"},'
Liste_objects_linknx = Liste_objects_linknx + '{"id":"Lumiere_Salle_a_Manger_Lustre_Table_Cmd"}'
Liste_objects_linknx = Liste_objects_linknx + ']}';
Liste_objects_linknx = JSON.parse(Liste_objects_linknx);
Puis On appel la fonction:

var multi_status_linknx = linknx.status_multi(HOST,PORT,Liste_objects_linknx, callback);
*/