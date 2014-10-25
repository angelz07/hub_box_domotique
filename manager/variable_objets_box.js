
var json = '{"Objets":['; // debut objets general
json = json +'{"zibase":['; // debut zibase
json = json + '{"id":"A1","value":"on-off", "nom": "Prise Rf Cuisine", "type":"on_off", "protocol": "Chacon"},' ;      
json = json + '{"id":"A2","value":"on-off", "nom": "Prise Rf Buanderie", "type":"on_off", "protocol": "Chacon"},' ; 
json = json + '{"id":"ZA7","value":"on-off", "nom": "Wallplug", "type":"on_off", "protocol": "ZWave n6"}' ;  
json = json + ']},'; // fin zibase
json = json +'{"linknx":['; // debut linknx
json = json + '{"id":"Lumiere_Salle_a_Manger_Lustre_Table_Cmd","value":"on-off", "nom": "Lustre Salle à Mangée", "type":"on_off", "protocol": "knx"},' ;      
json = json + '{"id":"Lumiere_Cuisine_Lustre_Table_Cmd","value":"on-off", "nom": "Lustre Cuisine", "type":"on_off", "protocol": "knx"}' ;
json = json + ']}' // fin linknx

json = json + ']}'; // fin objets general


json = JSON.parse(json);

exports.json = json;



var WS131073 = {};
exports.WS131073 = WS131073;