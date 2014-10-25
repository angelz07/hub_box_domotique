/* Fichier js domotique pour config.html */
function recuperation_liste_variables() {
    $.ajax({
        type: "GET",
        url: "/liste_variables",
        datatype: "json",
        success:
		  function (retour) {
		     affichage_variables(retour);
		  }
    });
}

function affichage_variables(arg){
	var objets = arg;
	var dir_base = objets.dir_base;
	var env = objets.env;
	var ip_linknx = objets.ip_linknx;
	var port_nodejs = objets.port_nodejs;
	var port_linknx = objets.port_linknx;
	var port_linknx_event = objets.port_linknx_event;
	var zibase_debug = objets.zibase_debug;
	var zibase_ip = objets.zibase_ip;
	var zibase_nom = objets.zibase_nom;
	var zibase_platform = objets.zibase_platform;
	var zibase_token = objets.zibase_token;

	var ip_hc2 = objets.ip_hc2;
    var port_hc2 = objets.port_hc2;
    var user_hc2 = objets.user_hc2;
    var pass_hc2 = objets.pass_hc2;
	
	var pooling_linknk = objets.pooling_linknk;
	var pooling_zibase = objets.pooling_zibase;

	$( "#port_node" ).val(port_nodejs);
	$( "#zibase_ip" ).val(zibase_ip);
	$( "#zibase_platform" ).val(zibase_platform);
	$( "#zibase_nom" ).val(zibase_nom);
	$( "#zibase_token" ).val(zibase_token);
	$( "#ip_linknx" ).val(ip_linknx);
	$( "#port_linknx" ).val(port_linknx);
	$( "#port_linknx_event" ).val(port_linknx_event);
	

	$( "#ip_hc2" ).val(ip_hc2);
	$( "#port_hc2" ).val(port_hc2);
	$( "#user_hc2" ).val(user_hc2);
	$( "#pass_hc2" ).val(pass_hc2);


	$( "#delai_pooling_zibase" ).val(pooling_zibase);
	$( "#delai_pooling_linknx" ).val(pooling_linknk);

	$('#select_env option[value='+env+']').attr("selected", "selected");
	$('#select_debug_zibase option[value='+zibase_debug+']').attr("selected", "selected");
	
}

$("#boutton_sauvegarde").click(function(){
  var id = $( "#id_linknx" ).val();
  var nom = $( "#select_nom_linknx > select option:selected" ).val();
  
  
  var env = $( "#select_env_general > select option:selected" ).val();
  var port_node = $( "#port_node" ).val();
  var zibase_ip = $( "#zibase_ip" ).val();
  var zibase_platform = $( "#zibase_platform" ).val();
  var zibase_nom = $( "#zibase_nom" ).val();
  var zibase_token = $( "#zibase_token" ).val();
  var zibase_debug = $( "#select_debug_zibase_span > select option:selected" ).val();
  var ip_linknx = $( "#ip_linknx" ).val();
  var port_linknx = $( "#port_linknx" ).val();
  var port_linknx_event = $( "#port_linknx_event" ).val();

  var ip_hc2 = $( "#ip_hc2" ).val();
  var port_hc2 = $( "#port_hc2" ).val();
  var user_hc2 = $( "#user_hc2" ).val();
  var pass_hc2 = $( "#pass_hc2" ).val();

  var pooling_linknk = $( "#delai_pooling_linknx" ).val();
  var pooling_zibase = $( "#delai_pooling_zibase" ).val();




  if(env != "null" && port_node != "" && zibase_ip != "" && zibase_platform != "" && zibase_nom != "" && zibase_token != "" && zibase_debug != "null" && ip_linknx != "" && port_linknx != "" && port_linknx_event != "" && ip_hc2 != "" && port_hc2 != "" && user_hc2 != "" && pass_hc2 != ""){
  	var url = "/update_vars?env=" + env + "&port_node=" + port_node + "&zibase_ip=" + zibase_ip + "&zibase_platform=" + zibase_platform + "&zibase_nom=" + zibase_nom + "&zibase_token=" + zibase_token + "&zibase_debug=" + zibase_debug + "&ip_linknx=" + ip_linknx + "&port_linknx=" + port_linknx + "&port_linknx_event=" + port_linknx_event + "&ip_hc2=" + ip_hc2 + "&port_hc2=" + port_hc2 + "&user_hc2=" + user_hc2 + "&pass_hc2=" + pass_hc2 + "&pooling_linknk=" + pooling_linknk + "&pooling_zibase=" + pooling_zibase;
  	console.log(url);
  	$.ajax({
        type: "GET",
        url: url,
        datatype: "json",
        success:
		  function (retour) {
		  	 if(retour.port_change){
		  	 	var CheminComplet = document.location.href;
				var CheminRepertoire  = CheminComplet.substring( 0 ,CheminComplet.lastIndexOf( "/" ) );
				var CheminRepertoire_split = CheminRepertoire.split(':');
				//console.log(CheminRepertoire_split[1])
		  	 	alert("Vous avez change le port du serveur,\n vous devez ouvrir une nouvelle page internet avec l'adresse suivante : \n http:" + CheminRepertoire_split[1]+ ":" + retour.port_change)
		  	 	//console.log("retour = " + retour.port_change)
		  	 }
		  	 else{
		  	 	affichage_variables(retour);
		  	 }
		     
			
		  }
    });
  }
  else{
 	alert("Il faut remplir les infos.")
  }
});