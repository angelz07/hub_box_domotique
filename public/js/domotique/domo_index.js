/* Fichier js domotique pour index.html */
function recuperation_liste_objet() {
    $.ajax({
        type: "GET",
        url: "/liste_objet",
        datatype: "json",
        success:
		  function (retour) {
		     affichage_cadre_commande(retour);
		  }
    });
}

function affichage_cadre_commande(liste_json){
	var objets = liste_json.Objets;
	objets.forEach(function (item, index) {
		if(objets[index].zibase){
			console.log("zibase")
			var zibase = objets[index].zibase;
			var html_select_nom = '<select >';
			html_select_nom = html_select_nom + '<option value="null"  class="placeholder_select">Nom Prise</option>';
			zibase.forEach(function (item, index) {
				var id = zibase[index].id;
				var value = zibase[index].value;
				var nom = zibase[index].nom;
				var type = zibase[index].type;
				var protocol = zibase[index].protocol
				
				html_select_nom = html_select_nom + '<option value="' + nom + '" data-nom="' + nom + '"  data-id="' + id + '"  data-type="' + type + '" data-protocol="' + protocol + '" data-value="' + value + '">' + nom + '</option>';
			});
			html_select_nom = html_select_nom + '</select>';

			var html = "";
			html = html + '<div class="form-group">';
			html = html + '<div class="form-group">';
			html = html + '<span class="form-group margin_left " id="select_nom_zibase">';
			html = html + html_select_nom;
			
			html = html + '</span>';
			html = html + '<input type="text" id="protocol_zibase" class="form-inline margin_left" placeholder="Protocol" readonly="readonly">';
			html = html + '<input type="text" id="id_zibase" class="form-inline margin_left" placeholder="Id" readonly="readonly">';
			html = html + '<input type="text" id="type_zibase" class="form-inline margin_left" placeholder="Type" readonly="readonly">';
			html = html + '<span class="form-group margin_left" id="select_zibase_valeur">';
			html = html + '<select >';
			html = html + '</select>';
			html = html + '</span>';
			html = html + '<button class="btn-success btn-small margin_left" type="button"  id="boutton_envoye_zibase">Envoyer</button>';
			html = html + '</div>';
			html = html + '</div>';

				
				
			$("#zibase_cadre").empty();
			$("#zibase_cadre").html(html);

			

			$( "#select_nom_zibase" ).change(function() {
				var id = $( "#select_nom_zibase > select option:selected" ).attr('data-id');
				var nom = $( "#select_nom_zibase > select option:selected" ).attr('data-nom');
				var type = $( "#select_nom_zibase > select option:selected" ).attr('data-type');
				var protocol = $( "#select_nom_zibase > select option:selected" ).attr('data-protocol');
				var value = $( "#select_nom_zibase > select option:selected" ).attr('data-value');

				$( "#protocol_zibase" ).val(protocol);
				$( "#id_zibase" ).val(id);
				$( "#type_zibase" ).val(type);
				
				html_val = '<select >';
				var value_split = value.split('-');
				for(var i = 0; i < value_split.length; i++)
				{
					html_val = html_val + '<option value="' + value_split[i] + '">' + value_split[i] + '</option>';
				    console.log(value_split[i])
				}
				html_val = html_val + '</select>';

				$("#select_zibase_valeur").empty();
				$( "#select_zibase_valeur" ).html(html_val);
			});




			$("#boutton_envoye_zibase").click(function(){
			  var id = $( "#id_zibase" ).val();
			  var nom = $( "#select_nom_zibase > select option:selected" ).val();
			  var type = $( "#type_zibase" ).val();
			  var protocol = $( "#protocol_zibase" ).val();
			  var value = $( "#select_zibase_valeur > select option:selected" ).val();

			  if(nom != "null" && id != "" && type != "" && type != "" && protocol != "" && value != "undefined"){
			  	var url = "/send_cmd?demande=zibase&id=" + id + "&nom=" + nom + "&type=" + type + "&protocol=" + protocol + "&value=" + value;
			  	$.ajax({
			        type: "GET",
			        url: url,
			        datatype: "json",
			        success:
					  function (retour) {
					     console.log(retour);
					  }
			    });
			  }
			  else{
			 	alert("Il faut selectionner une prise.")
			  }
			});
			
		}
		if(objets[index].linknx){
			console.log("linknx")
			var linknx = objets[index].linknx;

			var html_select_nom = '<select >';
			html_select_nom = html_select_nom + '<option value="null" class="placeholder_select">Nom Prise</option>';
			linknx.forEach(function (item, index) {
				var id = linknx[index].id;
				var value = linknx[index].value;
				var nom = linknx[index].nom;
				var type = linknx[index].type;
				var protocol = linknx[index].protocol
				
				html_select_nom = html_select_nom + '<option value="' + nom + '" data-nom="' + nom + '"  data-id="' + id + '"  data-type="' + type + '" data-protocol="' + protocol + '" data-value="' + value + '">' + nom + '</option>';
				
				
			});
			html_select_nom = html_select_nom + '</select>';

			var html = "";
			
				var id = linknx[index].id;
				var value = linknx[index].value;
				var nom = linknx[index].nom;
				var type = linknx[index].type;
				var protocol = linknx[index].protocol
				html = html + '<div class="form-group">';
				html = html + '<div class="form-group">';
				html = html + '<span class="form-group margin_left" id="select_nom_linknx">';
				html = html + html_select_nom;
				
				html = html + '</span>';
				html = html + '<input type="text" id="protocol_linknx" class="form-inline margin_left select_nom" placeholder="Protocol" readonly="readonly">';
				html = html + '<input type="text" id="id_linknx" class="form-inline margin_left" placeholder="Id" readonly="readonly">';
				html = html + '<input type="text" id="type_linknx" class="form-inline margin_left" placeholder="Type" readonly="readonly">';
				html = html + '<span class="form-group margin_left" id="select_linknx_valeur">';
				html = html + '<select >';
				html = html + '</select>';
				html = html + '</span>';
				html = html + '<button class="btn-success btn-small margin_left " type="button" id="boutton_envoye_linknx">Envoyer</button>';
				html = html + '</div>';
				html = html + '</div>';

				
			
			$("#linknx_cadre").empty();
			$("#linknx_cadre").html(html);

			$( "#select_nom_linknx" ).change(function() {
			  var id = $( "#select_nom_linknx > select option:selected" ).attr('data-id');
				var nom = $( "#select_nom_linknx > select option:selected" ).attr('data-nom');
				var type = $( "#select_nom_linknx > select option:selected" ).attr('data-type');
				var protocol = $( "#select_nom_linknx > select option:selected" ).attr('data-protocol');
				var value = $( "#select_nom_linknx > select option:selected" ).attr('data-value');

				$( "#protocol_linknx" ).val(protocol);
				$( "#id_linknx" ).val(id);
				$( "#type_linknx" ).val(type);
				
				html_val = '<select >';
				var value_split = value.split('-');
				for(var i = 0; i < value_split.length; i++)
				{
					html_val = html_val + '<option value="' + value_split[i] + '">' + value_split[i] + '</option>';
				    console.log(value_split[i])
				}
				html_val = html_val + '</select>';

				$("#select_linknx_valeur").empty();
				$( "#select_linknx_valeur" ).html(html_val);
			});

			$("#boutton_envoye_linknx").click(function(){
			  var id = $( "#id_linknx" ).val();
			  var nom = $( "#select_nom_linknx > select option:selected" ).val();
			  var type = $( "#type_linknx" ).val();
			  var protocol = $( "#protocol_linknx" ).val();
			  var value = $( "#select_linknx_valeur > select option:selected" ).val();

			  if(nom != "null" && id != "" && type != "" && type != "" && protocol != "" && value != "undefined"){
			  	var url = "/send_cmd?demande=linknx&id=" + id + "&nom=" + nom + "&type=" + type + "&protocol=" + protocol + "&value=" + value;
			  	$.ajax({
			        type: "GET",
			        url: url,
			        datatype: "json",
			        success:
					  function (retour) {
					     console.log(retour);
					  }
			    });
			  }
			  else{
			 	alert("Il faut selectionner une prise.")
			  }
			});

		}

	});
}
