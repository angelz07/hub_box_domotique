function start_config(){

	recuperation_liste_linknx();
	
}

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
	       			div_new_objet_linknx();
	              	recuperer_liste_linknx()
	             }
	             else{
	             	alert("Il y a eu une erreur")
	             }
              }
        });
}

function recuperer_liste_linknx(){
	$.ajax({
            type: "GET",
            url: "/pooling_config?demande=liste_pooling_linknx",
            datatype: "json",
            success:
              function (retour) {
              	if (retour) {
	              	affichage_variables_linknx(retour)
	       			
	             }
	             else{
	             	alert("Il y a eu une erreur")
	             }
              }
        });
}
function div_new_objet_linknx() {
    var html_contenu;
    html_contenu = '<table class="table table-bordered table-condensed table-body-center" >';
    html_contenu = html_contenu + '<tbody>';
    html_contenu = html_contenu + '<tr>';
    html_contenu = html_contenu + '<td>';
    html_contenu = html_contenu + '<select id="new_id_linknx_pooling" class="form-control " ><option class="type_select" value="null" data-id="null" >Id Linknx</option>' + option_select_id_linknx + '</select>';
    html_contenu = html_contenu + '</td>';
    html_contenu = html_contenu + '<td>'; 
    html_contenu = html_contenu + '<input id="new_description_linknx_objet_pooling" type="text" class="form-control" placeholder="Description" value=""/>';
    html_contenu = html_contenu + '</td>';
    html_contenu = html_contenu + '<td>';
    html_contenu = html_contenu + '<button class="btn btn-primary btn-sm" id="btn_new_add_script" onClick="add_objet_linknx_pooling()"><i class=" fa fa-plus"></i> Ajouter</button>';
    html_contenu = html_contenu + '</td>';

    html_contenu = html_contenu + '</tr>'
    html_contenu = html_contenu + '</tbody>';
    html_contenu = html_contenu + '</table>';



    $('#p_polling_linknx_add').empty()
    $('#p_polling_linknx_add').html(html_contenu);

    $('#new_id_linknx_pooling').on('change', function (e) {
        var optionSelected = $("option:selected", this);
        var valueSelected = this.value;
    });

    
    //ask_list_objet();
}

function add_objet_linknx_pooling(){
	var new_description_linknx_objet_pooling = $("#new_description_linknx_objet_pooling").val();
    var new_id_linknx_pooling = $("#new_id_linknx_pooling > option:selected").attr('data-id');

    if (new_description_linknx_objet_pooling != "" && new_id_linknx_pooling != "null" ) {
       
       // wait_db_icon("start")
        $.ajax({
            type: "GET",
            url: "/pooling_config?demande=add_pooling_linknx&id_linknx=" + new_id_linknx_pooling + "&description=" + new_description_linknx_objet_pooling ,
            datatype: "json",
            success: function (retour) {
            	if(retour == '{"erreur":"exist"}'){
            		alert("Cet objet est déjà enregistré")
            	}
            	else{
            		affichage_variables_linknx(retour)
            	}
            }
        });
    }
    else {
         alert("Il faut remplir les params pour enregistrer")
    }
}




function affichage_variables_linknx(arg){
	
	var html = '';
	html = html + '<table id="table_linknx_hc2" class="table">';
	html = html + '<thead>';
	html = html + '<tr>';
	html = html + '<th>Id Linknx</th>';
	html = html + '<th>Description</th>';
	html = html + '</tr>';
	html = html + '</thead>';
	html = html + '<tbody>';
	

	arg.Objets.forEach(function (item, index) {
	        
		var id_linknx = arg.Objets[index].id;
		var description = arg.Objets[index].description;

		html = html + '<tr>';
		html = html + '<td>';
		html = html + '<select id="affichage_id_linknx_' + id_linknx + '" class="form-control " ><option class="type_select" value="' + id_linknx + '" data-id="' + id_linknx + '" >' + id_linknx + '</option>' + option_select_id_linknx + '</select>';
		html = html + '</td>';
		html = html + '<td>';
		html = html + '<input id="affichage_id_hc2_' + id_linknx +  '" type="text" class="form-control" placeholder="" value="' + description + '"/>';
		html = html + '</td>';
		 html = html + '<td>';
        html = html + '<button class="btn btn-danger btn-sm" id="btn_del_' + id_linknx  + '" onClick="delete_objet_linknx($(this))" data-id="' + id_linknx + '" data-description="' + description + '" ><i class=" fa fa-trash-o"></i> </button>';
        html = html + '</td>';
    		
		html = html + '</tr>';
		//console.log(id_linknx)
	});

	html = html + '</tbody>';
	html = html + '</table>';

	$( "#p_polling_linknx" ).empty();
	$( "#p_polling_linknx" ).html(html);

	wait_db_icon("stop")
}


function delete_objet_linknx(arg){
	var id_linknx = arg.attr('data-id');
    var description = arg.attr('data-description');

    
    var r = confirm("Voulez-vous vraiment supprimer : "  + id_linknx + " - " + description );
	if (r == true) {
	    wait_db_icon("start")
	    $.ajax({
	        type: "GET",
	        url: "/pooling_config?demande=delete_objet_linknx2&id_linknx=" + id_linknx + "&description=" + description ,
	        datatype: "json",
	        success:
			  function (retour) {
			      wait_db_icon("stop")
			     affichage_variables_linknx(retour)

			  }
	    });
	} else {
	    alert("Opération annulée")
	}
}

function modif_objet_linknx(arg){

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