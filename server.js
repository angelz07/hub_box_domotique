var config = require('./manager/config.global');
//var liste_hc2_linknx = require('./manager/liste_hc2_linknx');
config.dir_base = __dirname;

/* mise a jour des varaible général */
var lecture_variable = require('./manager/gestion_variables').lecture_variable_json_file();

/* Mise a jour des objet linknx hc2 variables */
var lecture_variable_liste_hc2_linknx = require('./manager/linknx_hc2').update_var_liste_hc2_linknx_init();

/* Callback */
var callback = require('./manager/callback');

/* Config Linknx */
var linknx = require('node-linknx');


/* recuperation variable pooling */
var update_var_listes_pooling_init = require('./manager/pooling').update_var_listes_pooling_init();


// clean exceptions from a previous load (refresh case)
	if(process._events.uncaughtException){
		if(process._events.uncaughtException.length > 0){
       		process._events.uncaughtException.splice(0,1);
   		}
	}
    
    process.on('uncaughtException', function(e){
        console.log('Node uncaughtException');
        
        console.log(e);
        var rgxp_error = /ECONNRESET/i
  		var match_error = rgxp_error.test(e);
  		if ( match_error == true ){
		    var exec = require('child_process').exec;
			exec('shutdown -r now', function(error, stdout, stderr) {
			    console.log('stdout: ' + stdout);
			    console.log('stderr: ' + stderr);
			    if (error !== null) {
			        console.log('exec error: ' + error);
			    }
			});
		  }


		var rgxp_error_2 = /EMFILE/i
  		var match_error_2 = rgxp_error_2.test(e);
  		if ( match_error_2 == true ){
		    var exec = require('child_process').exec;
			exec('shutdown -r now', function(error, stdout, stderr) {
			    console.log('stdout: ' + stdout);
			    console.log('stderr: ' + stderr);
			    if (error !== null) {
			        console.log('exec error: ' + error);
			    }
			});
		  }

		/*else{
			var exec = require('child_process').exec;
			exec('shutdown -r now', function(error, stdout, stderr) {
			    console.log('stdout: ' + stdout);
			    console.log('stderr: ' + stderr);
			    if (error !== null) {
			        console.log('exec error: ' + error);
			    }
			});
		} */ 
       /* */
    });
    // Clean Buggy thing
    if(process._events.uncaughtException){
    	if(process._events.uncaughtException.length > 1 
        && !!process._events.uncaughtException[0].toString().match(/native code/)
	    ){
	        process._events.uncaughtException.splice(0,1);
	    }
    }
    


/* Delai de 5 seconde pour la mise a jour des vairables */
setTimeout(function() {

	/* on lance le serveur  */
	var app=require(__dirname + '/manager/app.js');

	/* activation des event source de linknx */
	var eventsource_linknx = linknx.eventsource_linknx(config.ip_linknx,config.port_linknx_event,callback.callback_event_linknx);

	/* Config Zibase */
	var zibase = require('./manager/zibase/zibase');
	  
	//   console.log(liste_hc2_linknx); 
	/* Cron */
	setTimeout(function() {
		var cron_node = require('./manager/cron')
		//test()
		//var Start_setResetIntervalLinknx = cron_node.setResetIntervalLinknx(true);
		//var Start_setResetIntervalZibase = cron_node.setResetIntervalZibase(true);
	}, 2000);
}, 5000);


