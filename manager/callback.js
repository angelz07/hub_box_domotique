var config = require('./config.global');

exports.callback_texte = function(arg, res){
	res.setHeader('Last-Modified', (new Date()).toUTCString());
    res.write(arg);
    res.end();
}

exports.callback_event = function(arg){
	console.log(arg); 
	console.log("arg"); 
	var WS131073 = require('../manager/variable_objets_box').WS131073;
            WS131073 = arg
     console.log("WS131073  = " + WS131073);        
}

exports.callback_event_linknx = function(arg){

	console.log("-------------------   callback_event_linknx  -------------------------" )
	console.log(arg)
	console.log("-------------------   FIN callback_event_linknx  -------------------------" )
	var id = arg.notify[0].id;
	var value = arg.notify[0].value;
	
	var liste_hc2_linknx = require('./liste_hc2_linknx');
	liste_hc2_linknx.Objets.forEach(function (item, index) {
	        
		var id_linknx = liste_hc2_linknx.Objets[index].id_linknx;
		var id_hc2 = liste_hc2_linknx.Objets[index].id_hc2;
		var type = liste_hc2_linknx.Objets[index].type;

		if(id_linknx == id){
			/* Type Volet */
			if(type == "volet"){
				var is_number = isNaN(value);
				if(is_number == false){
					value =  Math.round(value)
				}

				var data = '{"args":["' + id + '", "' + value + '"]}'
				var path_hc2 = '/api/devices/' + id_hc2 + '/action/receive_data'
				send_http_request_to_hc2(data, path_hc2);
			}
			/* Fin Type Volet */
			/* Type mode chauffage */
			if(type == "mode_chauffage"){
				var data = '{"args":["' + id + '", "' + value + '"]}'
				var path_hc2 = '/api/devices/' + id_hc2 + '/action/receive_data'
				//console.log(data)
				send_http_request_to_hc2(data, path_hc2);
			}
			/* Fin mode chauffage */
			/* Type switch */
			if(type == "switch"){
				var data = '{"args":["' + id + '", "' + value + '"]}'
				var path_hc2 = '/api/devices/' + id_hc2 + '/action/receive_data'
				//console.log(data)
				send_http_request_to_hc2(data, path_hc2);
			}
			/* Fin switch */
			/* Type mode dimer */
			if(type == "dimer"){
				//console.log("test")
				var data = '{"args":["' + id + '", "' + value + '"]}'
				var path_hc2 = '/api/devices/' + id_hc2 + '/action/receive_data'
				//console.log(data)
				send_http_request_to_hc2(data, path_hc2);
			}
			/* Fin mode dimer */
			/* Type temperature */
			if(type == "temperature"){
				var data = '{"args":["' + id + '", "' + value + '"]}'
				//console.log(data)
				var path_hc2 = '/api/devices/' + id_hc2 + '/action/receive_data'
				send_http_request_to_hc2(data, path_hc2);
			}
			/* Fin Type temperature */
		}
	});
}

exports.callback_event_linknx_force = function(arg){
	 
	var objs = arg.objects[0];
	//console.log('-----------objs AVANT PARSE------------')
    // console.dir(objs)
	//objs = JSON.parse(objs)
	
	var id = objs.id;
	
	var value = objs.value;
	//console.log("id = " + id + " value = " + value)

	var liste_hc2_linknx = require('./liste_hc2_linknx');
	
	liste_hc2_linknx.Objets.forEach(function (item, index) {
	        
		var id_linknx = liste_hc2_linknx.Objets[index].id_linknx;
		var id_hc2 = liste_hc2_linknx.Objets[index].id_hc2;
		var type = liste_hc2_linknx.Objets[index].type;

		
		if(id_linknx == id){
	//		console.log(type)
			/* Type Volet */
			if(type == "volet"){
				var is_number = isNaN(value);
				if(is_number == false){
					value =  Math.round(value)
				}

				var data = '{"args":["' + id + '", "' + value + '"]}'
				var path_hc2 = '/api/devices/' + id_hc2 + '/action/receive_data'
				send_http_request_to_hc2(data, path_hc2);
			}
			/* Fin Type Volet */
			/* Type mode chauffage */
			if(type == "mode_chauffage"){
				var data = '{"args":["' + id + '", "' + value + '"]}'
				var path_hc2 = '/api/devices/' + id_hc2 + '/action/receive_data'
				//console.log(data)
				send_http_request_to_hc2(data, path_hc2);
			}
			/* Fin mode chauffage */
			/* Type mode switch */
			if(type == "switch"){
				var data = '{"args":["' + id + '", "' + value + '"]}'
				var path_hc2 = '/api/devices/' + id_hc2 + '/action/receive_data'
				//console.log(data)
				send_http_request_to_hc2(data, path_hc2);
			}
			/* Fin mode switch */
			/* Type mode dimer */
			if(type == "dimer"){
				console;log("test")
				var data = '{"args":["' + id + '", "' + value + '"]}'
				var path_hc2 = '/api/devices/' + id_hc2 + '/action/receive_data'
				//console.log(data)
				send_http_request_to_hc2(data, path_hc2);
			}
			/* Fin mode dimer */
			/* Type temperature */
			if(type == "temperature"){
				var data = '{"args":["' + id + '", "' + value + '"]}'
				//console.log(data)
				var path_hc2 = '/api/devices/' + id_hc2 + '/action/receive_data'
				send_http_request_to_hc2(data, path_hc2);
			}
			/* Fin Type temperature */
		}
	});
}
function send_http_request_to_hc2(data, path_hc2){
	console.log("-------------------   send_http_request_to_hc2  -------------------------" )
	console.log(path_hc2)
	console.log(data)
	console.log("-------------------   FIN send_http_request_to_hc2  -------------------------" )
	
	var http = require('http');
	var auth = 'Basic ' + new Buffer(config.user_hc2 + ":" + config.pass_hc2).toString('base64');
	var options = {
	    host: config.ip_hc2,
	    port: config.port_hc2,
	    path: path_hc2,
	    method: 'POST',
	    headers: {
	        'Content-Type': 'application/x-www-form-urlencoded',
	        "Authorization": auth,
	        'Content-Length': Buffer.byteLength(data)
	    }
	};

	var httpreq = http.request(options, function (response) {
	    response.setEncoding('utf8');
	  //  console.log(response.body);
	    response.on('data', function (chunk) {
	     console.log("body: " + chunk);
	    });
	    response.on('end', function() {
	   	console.log('ok')
	    // res.send('ok');
	  })


	});

	httpreq.on('error', function(e) {
		  console.log('problem with request: ' + e.message);
		});

	
  	httpreq.write(data);
  	httpreq.end();
}

exports.callback_send_cmd = function(arg, res){
	console.log(arg);
}

exports.callback_liste_objet = function(arg, res){
	//console.dir(res)
	res.header("Content-Type", "application/json");
	res.header('Last-Modified', (new Date()).toUTCString());
    res.send(arg);
    res.end();
}

exports.callback_log = function(arg, res){
	console.log(arg);
}

exports.callback_etat = function(arg, res){
	//var argString = JSON.stringify(arg);
	res.header("Content-Type", "application/json");
	res.header('Last-Modified', (new Date()).toUTCString());
	//res.header('Content-Length', arg.length);
	//argString = argString.replace('\\"', '')
    var argString = JSON.stringify(arg, 0, 4);

    argString = argString.replace(/\\/g, "")
	console.log(argString)
    //res.send(arg);
    res.end(argString);

}

exports.callback_restart_node = function(port_node, res, callback){
	//var json = '{"reload":['; 
	var json = '{"port_change":"'+ port_node + '"}' ;
	//json = json + ']}'; // fin objets general
	json = JSON.parse(json);

	res.header("Content-Type", "application/json");
	res.header('Last-Modified', (new Date()).toUTCString());
    res.send(json);
    res.end();

    setTimeout(function() {
		var sys = require('sys')
		var exec = require('child_process').exec;
		function puts(error, stdout, stderr) { sys.puts(stdout) }
		exec("supervisorctl restart hub_domo_cuesmes", puts);
		   
	}, 2000);
    

 
}