/* Fichier script js lien linknc hc2 */
var option_select_type = '<option class="type_select" value="volet" data-id="volet">volet</option>';
option_select_type = option_select_type + '<option class="type_select" value="temperature" data-id="temperature">temperature</option>';
option_select_type = option_select_type + '<option class="type_select" value="switch" data-id="switch">switch</option>';
option_select_type = option_select_type + '<option class="type_select" value="mode_chauffage" data-id="mode_chauffage">mode_chauffage</option>';
option_select_type = option_select_type + '<option class="type_select" value="mode_chauffage" data-id="dimer">dimer</option>';



function start_config(){
	recuperation_liste_linknx()
	
};
var option_select_id_linknx;

function recuperation_liste_linknx(){

	$.ajax({
            type: "GET",
            url: "/liste_objet_linknx",
            datatype: "json",
            success:
              function (retour) {
              	if (retour) {
	              	option_select_id_linknx = '';
	              	//console.log(retour)
	              	retour.objets.forEach(function (item, index) {
	        
	       				var id_linknx = retour.objets[index].id_linknx;
	       				option_select_id_linknx = option_select_id_linknx + '<option class="type_select" value="' + id_linknx + '" data-id="' + id_linknx + '">' + id_linknx + '</option>';

	       			});
	              	div_new_objet()
	             }
	             else{
	             	alert("Il y a eu une erreur")
	             }
              }
        });

	
	
}

// Remplir le tableua avec la liste d'objet linknx

// ''

function div_new_objet() {
    var html_contenu;
    html_contenu = '<table class="table table-bordered table-condensed table-body-center" >';
    html_contenu = html_contenu + '<tbody>';
    html_contenu = html_contenu + '<tr>';
    html_contenu = html_contenu + '<td>';
    html_contenu = html_contenu + '<select id="new_id_linknx" class="form-control " ><option class="type_select" value="null" data-id="null" >Id Linknx</option>' + option_select_id_linknx + '</select>';
    html_contenu = html_contenu + '</td>';
    html_contenu = html_contenu + '<td>'; 
    html_contenu = html_contenu + '<input id="new_id_hc2" type="text" class="form-control" placeholder="Id HC2" value=""/>';
    html_contenu = html_contenu + '</td>';
    html_contenu = html_contenu + '<td>';
    html_contenu = html_contenu + '<select id="new_type" class="form-control " ><option class="type_select" value="null" data-id="null">Type</option>' + option_select_type + '</select>';
    html_contenu = html_contenu + '</td>';
    html_contenu = html_contenu + '<td>';
    html_contenu = html_contenu + '<button class="btn btn-primary btn-sm" id="btn_new_add_script" onClick="add_objet()"><i class=" fa fa-plus"></i> Ajouter</button>';
    html_contenu = html_contenu + '</td>';

    html_contenu = html_contenu + '</tr>'
    html_contenu = html_contenu + '</tbody>';
    html_contenu = html_contenu + '</table>';



    $('#p_lien_linknx_hc2_add').empty()
    $('#p_lien_linknx_hc2_add').html(html_contenu);

    $('#new_id_linknx').on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;

        console.log(valueSelected);
    });

    
    ask_list_objet();
}

function ask_list_objet(){

	$.ajax({
        type: "GET",
        url: "/liste_objet_linknx_hc2",
        datatype: "json",
        success:
          function (retour) {
          	if (retour) {
              	affichage_variables(retour)
             }
             else{
             	alert("Il y a eu une erreur")
             }
          }
    });

}

function affichage_variables(arg){

	var html = '';
	html = html + '<table id="table_linknx_hc2" class="table">';
	html = html + '<thead>';
	html = html + '<tr>';
	html = html + '<th>Id Linknx</th>';
	html = html + '<th>Id HC2</th>';
	html = html + '<th>Options</th>';
	html = html + '</tr>';
	html = html + '</thead>';
	html = html + '<tbody>';
	

	arg.Objets.forEach(function (item, index) {
	        
		var id_linknx = arg.Objets[index].id_linknx;
		var id_hc2 = arg.Objets[index].id_hc2;
		var type = arg.Objets[index].type;

		html = html + '<tr>';
		html = html + '<td>';
		html = html + '<select id="affichage_id_linknx_' + id_linknx + '_' + id_hc2 + '" class="form-control " ><option class="type_select" value="' + id_linknx + '" data-id="' + id_linknx + '" >' + id_linknx + '</option>' + option_select_id_linknx + '</select>';
		html = html + '</td>';
		html = html + '<td>';
		html = html + '<input id="affichage_id_hc2_' + id_linknx + '_' + id_hc2 + '" type="text" class="form-control" placeholder="" value="' + id_hc2 + '"/>';
		html = html + '</td>';
		html = html + '<td>';
		html = html + '<select id="affichage_type_' + id_linknx + '_' + id_hc2 + '" class="form-control " ><option class="type_select" value="' + type + '" data-id="' + type + '">' + type + '</option>' + option_select_type + '</select>';
    	html = html + '</td>';
    	html = html + '<td>';
        html = html + '<button class="btn btn-success btn-sm" id="btn_save_' + id_linknx + '_' + id_hc2 + '" onClick="modif_objet($(this))" data-type="' + type + '" data-id_linknx="' + id_linknx + '" data-id_hc2="' + id_hc2 + '" ><i class=" fa fa-floppy-o"></i> </button>';
        html = html + '</td>';
        html = html + '<td>';
        html = html + '<button class="btn btn-danger btn-sm" id="btn_del_' + id_linknx + '_' + id_hc2 + '" onClick="delete_objet($(this))" data-type="' + type + '" data-id_linknx="' + id_linknx + '" data-id_hc2="' + id_hc2 + '" ><i class=" fa fa-trash-o"></i> </button>';
        html = html + '</td>';
    		
		html = html + '</tr>';
		//console.log(id_linknx)
	});

	html = html + '</tbody>';
	html = html + '</table>';

	$( "#p_lien_linknx_hc2" ).html(html);
	wait_db_icon("stop")
}

function delete_objet(arg){
	var id_linknx = arg.attr('data-id_linknx');
    var id_hc2 = arg.attr('data-id_hc2');
    var type = arg.attr('data-type');
    var r = confirm("Voulez-vous vraiment supprimer : "  + id_linknx + " - " + id_hc2 + " - " + type);
	if (r == true) {
	    wait_db_icon("start")
	    $.ajax({
	        type: "GET",
	        url: "/linknx_hc2?demande=delete_lien_linknx_hc2&id_linknx=" + id_linknx + "&id_hc2=" + id_hc2 + "&type_device=" + type ,
	        datatype: "json",
	        success:
			  function (retour) {
			      wait_db_icon("stop")
			      affichage_variables(retour)

			  }
	    });
	} else {
	    alert("Opération annulée")
	}
    
}

function modif_objet(arg){
	var old_id_linknx = arg.attr('data-id_linknx');
    var old_id_hc2 = arg.attr('data-id_hc2');
    var old_type = arg.attr('data-type');

	var change_id_hc2 = $("#affichage_id_hc2_" + old_id_linknx + "_" + old_id_hc2).val();
    var change_id_linknx = $("#affichage_id_linknx_" + old_id_linknx + "_" + old_id_hc2 + " > option:selected").attr('data-id');
 	var change_type = $("#affichage_type_" + old_id_linknx + "_" + old_id_hc2 + " > option:selected").attr('data-id');

 	wait_db_icon("start")
    $.ajax({
        type: "GET",
        url: "/linknx_hc2?demande=modif_lien_linknx_hc2&old_id_linknx=" + old_id_linknx + "&old_id_hc2=" + old_id_hc2 + "&old_type=" + old_type + "&change_id_linknx=" + change_id_linknx + "&change_id_hc2=" + change_id_hc2 + "&change_type=" + change_type ,
        datatype: "json",
        success:
		  function (retour) {
		      
		      affichage_variables(retour)

		  }
    });
}


function add_objet(){
	var new_id_hc2 = $("#new_id_hc2").val();
    var new_id_linknx = $("#new_id_linknx > option:selected").attr('data-id');
 	var new_type = $("#new_type > option:selected").attr('data-id');

    if (new_id_hc2 != "" && new_id_linknx != "null" && new_type != "null" ) {
       
        wait_db_icon("start")
        $.ajax({
            type: "GET",
            url: "/linknx_hc2?demande=record_lien_linknx_hc2&new_id_hc2=" + new_id_hc2 + "&new_id_linknx=" + new_id_linknx + "&new_type=" + new_type,
            datatype: "json",
            success:
              function (retour) {
                  if (retour) {
                      
                      affichage_variables(retour)
                  }
                  else{
                      alert("il y a eu une erreur ou il y a deja une entrée avec cet objet")
                  }
              }
        });
    }
    else {
         alert("Il faut remplir la piece, le nom, l'objet, le module et le type pour enregistrer")
    }
}


function wait_db_icon(arg) {
    if(arg == "start"){
        var dialog = new BootstrapDialog({
            title: '<center>Op&eacute;ration en cours...</center>',
             message: '<center><i class="fa fa-spinner fa-spin fa-5x"></i></center>',
           // cssClass: 'wait_modal',
            closable: false,
            closeByBackdrop: false,
            closeByKeyboard: false,
        });
       dialog.realize();
       // dialog.getModalHeader().hide();
       dialog.getModalFooter().hide();
       dialog.getModalBody().css('background-color', '#0088cc');
       dialog.getModalBody().css('color', '#fff');
       dialog.getModalDialog().addClass('wait_modal');
       dialog.open();
    }
    if (arg == "stop") {
        BootstrapDialog.closeAll()
    }
}