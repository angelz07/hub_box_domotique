
	

 
var callback = require('./callback');
var fs = require("fs");

/* interval linknx pooling */
var timer_linknx = 0;
exports.setResetIntervalLinknx = function(bool){
	
	var config = require('./config.global');
	var interval_linknx = config.pooling_linknk;
	if(bool){
		console.log("Start Cron Linknx interval = " + interval_linknx)
        timer_linknx = setInterval(function(){
        		

			setTimeout(function() {
				cron_pooling_linknx()
				
			}, 500);
        	 
    	},interval_linknx);
  }else{
  	console.log("reset cron linknx")
    clearInterval(timer_linknx); 
  }
}

/* interval zibase pooling */
var timer_zibase = 0;
exports.setResetIntervalZibase = function(bool){

	var config = require('./config.global');
	var interval_zibase = config.pooling_zibase;
  if(bool){
  		console.log("Start Cron Zibase interval = " + interval_zibase)
        timer_zibase = setInterval(function(){
        	setTimeout(function() {
				cron_pooling_zibase()
				
			}, 500);
        	 
    	},interval_zibase);
  }else{
    clearInterval(timer_zibase); 
  }
}

//setResetIntervalLinknx(false);
/*
setInterval(function() {
    cron_pooling_linknx()
}, interval_linknx);
*/

/*
setInterval(function() {
    cron_pooling_zibase()
}, interval_zibase);

*/

function cron_pooling_linknx(){

	var config = require('./config.global');
	var contenu_linknx = fs.readFile(config.dir_base+"/manager/pooling_linknx.json", "utf8", function(err, data){
	    if(err){
	      console.log(err)
	    }else{
	      	var data =  JSON.parse(data);
	      	console.log(data)
	      	data.Objets.forEach(function (item, index) {
	        	var id_linknx = data.Objets[index].id;
	        	setTimeout(function() {
				      ask_notif_linknx(id_linknx)
				}, 3000);
	        	
	       	});
		}        
	});


	
}

function ask_notif_linknx(id_linknx){
	
	var linknx = require('node-linknx');
	var config = require('./config.global');

    var Liste_objects_linknx = new Array();
    Liste_objects_linknx = '{"objects":['
    Liste_objects_linknx = Liste_objects_linknx + '{"id":"' + id_linknx + '"}'
    Liste_objects_linknx = Liste_objects_linknx + ']}';
    Liste_objects_linknx = JSON.parse(Liste_objects_linknx);

    var multi_status_linknx = linknx.status_multi(config.ip_linknx,config.port_linknx,Liste_objects_linknx, 'res', callback.callback_event_linknx_force);
}

function cron_pooling_zibase(){
		
}




/*

*/