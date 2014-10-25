var _ = require('underscore');
var request = require("request");
var http = require("http");
var S = require('string');
//var config = require('./config')
var config = require('../config.global');

var clientIp = process.env.MYIP || getIPAddress();
var zibase_ip = config.zibase_ip;

var moment = require('moment');
var dateFormat = "MMM DD YYYY HH:mm:ss";
var home;
var probes = [];
var actuators = [];
var sensors = [];
var scenarios = [];
var cameras = [];
var variables = [];
var debug = config.debug || false;

/* Callback */
var callback = require('../callback').callback_event;
var callback_send_cmd = require('../callback').callback_send_cmd;

url = 'http://'+config.zibase_platform+'/api/get/ZAPI.php?zibase='+config.zibase_nom+'&token='+config.zibase_token+'&service=get&target=home';
request(url, function (err, resp, body) {
if (debug) {
    console.info(url);
}
if (err) {
    console.log ("Could not retrieve data from zibase.net! ", err);
    return;
}
home = JSON.parse(body);
probes = _.indexBy(home.body.probes, 'id');
actuators = _.indexBy(home.body.actuators, 'id');
sensors = _.indexBy(home.body.sensors, 'id');
scenarios = _.indexBy(home.body.scenarios, 'id');
variables = home.body.variables;
cameras = _.indexBy(home.body.camerass, 'id');

if (debug) console.dir(variables);

});

var dgram = require('dgram');
var server = dgram.createSocket("udp4");
var client = dgram.createSocket("udp4");

var b = new Buffer(70);
b.fill(0);
b.write('ZSIG\0', 0/*offset*/);
b.writeUInt16BE(13, 4); //command HOST REGISTERING (13)
b.writeUInt32BE(dot2num(clientIp), 50); //Ip address
b.writeUInt32BE(0x42CC, 54); // port 17100 0x42CC

//console.log(b);
//console.log(b.toString('hex', 0, b.length));

server.on("error", function (err) {
    console.log("Server error:\n" + err.stack);
    server.close();
});

server.on("message", function (msg, rinfo) {
    var date = moment();
    msg = msg.slice(70);
    msg = msg.toString();

   // console.log("Message = " + msg)
    if (S(msg).contains('Completed SCENARIO')) {
        
        var id= msg.replace(/\w* SCENARIO: (\d*)(.*)/,'$1');
        id = parseInt(id);
        if (id  && scenarios[id]) {
                var name = scenarios[id].name;
                
                var string_json = '{"SCENARIO":[';
                var json = '{"id":"'+id+'","name":"'+name+'"}';
                string_json = string_json + json;
                string_json = string_json + ']}';
                string_json = JSON.parse(string_json);
                callback(string_json)
        }
    }
    else if (S(msg).contains('Sent radio ID')) {

        var protocol = S(msg).between("Protocols='", "'").s;
        var id_and_val = S(msg).between("): ").s;
        var temp = id_and_val.split('_');
        var id = temp[0];
        var val = temp[1];
        val = val.substr(0, val.length-1 )
        
        string_json = '{"SENDRF":[';
        var json = '{"id":"'+id+'","val":"'+val+'","protocol":"'+protocol+'"}';
        string_json = string_json + json;
        string_json = string_json + ']}';
        string_json = JSON.parse(string_json);

        callback(string_json)
    }

   // else if (S(msg).contains('Received radio ID')) {
   //     console.log(msg)
        /*
        var protocol = S(msg).between("Protocols='", "'").s;
        var id_and_val = S(msg).between("): ").s;
        var temp = id_and_val.split('_');
        var id = temp[0];
        var val = temp[1];
        val = val.substr(0, val.length-1 )
        
        string_json = '{"SENDRF":[';
        var json = '{"id":"'+id+'","val":"'+val+'","protocol":"'+protocol+'"}';
        string_json = string_json + json;
        string_json = string_json + ']}';
        string_json = JSON.parse(string_json);

        callback(string_json)
        */
   // }




    else {
        
        var id = S(msg).between('<id>', '</id>').s;
        if (probes[id]) {
            var string_json;

            if(id == "WS131073"){
                var bat = S(msg).between('<bat>', '</bat>').s;
                var energie_total = S(msg).between('<kwh>', '</kwh>').s;
                var power = S(msg).between('<w>', '</w>').s;
                var dev = S(msg).between('<dev>', '</dev>').s;
                var rf = S(msg).between('<rf>', '</rf>').s;
                var channel = S(msg).between('<ch>', '</ch>').s;
                var name = probes[id].name;

                string_json = '{"probe":[';
                var json = '{"id":"'+id+'","name":"'+name+'","bat":"'+bat+'","energie_total":"'+energie_total+'","power":"'+power+'","dev":"'+dev+'","rf":"'+rf+'","channel":"'+channel+'"}';
                string_json = string_json + json;
                string_json = string_json + ']}';
                string_json = JSON.parse(string_json);
            }
            
            /*
                Rajouter si necessaire les autre if else pour d'autre periph

            */
            
             callback(string_json)
            
        } else if (sensors[id]) {
            var bat = S(msg).between('<bat>', '</bat>').s;
            var dev = S(msg).between('<dev>', '</dev>').s;
            var name = sensors[id].name;
            var rf = S(msg).between('<rf>', '</rf>').s;
            
            string_json = '{"sensors":[';
            var json = '{"id":"'+id+'","name":"'+name+'","bat":"'+bat+'","dev":"'+dev+'","rf":"'+rf+'"}';
            string_json = string_json + json;
            string_json = string_json + ']}';
            string_json = JSON.parse(string_json);

            callback(string_json);

        } else if (actuators[id]) {
            console.log(msg)
            console.log("id = " + id)
            console.log("name = " + actuators[id].name)
            //msg = msg.replace(/<id>(.*)<\/id>/g, actuators[id].name + ' ($1)');
        }
        else{
            console.log(msg)
        }
       // console.log(msg)
    }
    //else if (S(msg).contains('Received radio ID')) {
    //  console.log("Received radio ID = " + msg)
    //}
    /*
    if (S(msg).contains('SCENARIO')) {

        var id= msg.replace(/\w* SCENARIO: (\d*)(.*)/,'$1');
        id = parseInt(id);
        if (id  && scenarios[id]) {

                msg = msg + ' ' + scenarios[id].name;
        }

    } else {

        var id = S(msg).between('<id>', '</id>').s;
        if (probes[id]) {
            msg = msg.replace(/<id>(.*)<\/id>/g, probes[id].name + ' ($1)');
        } else if (sensors[id]) {
            msg = msg.replace(/<id>(.*)<\/id>/g, sensors[id].name + ' ($1)');
        } else if (actuators[id]) {
            msg = msg.replace(/<id>(.*)<\/id>/g, actuators[id].name + ' ($1)');
        }
    }


    if (!debug) {
        msg = msg.replace(/<(?:.|\n)*?>/gm, ''); // delete all html tags
    }
    console.log(date.format(dateFormat) + " " + msg);
    */
});

server.on("listening", function () {
    var address = server.address();
    console.log("Server listening " +
        address.address + ":" + address.port);
});

client.send(b, 0, b.length, 49999, zibase_ip, function (err, bytes) {
    client.close();
});

server.bind(0x42CC, clientIp);


process.on('SIGINT', function () {
    console.log("Caught interrupt signal");

    var client = dgram.createSocket("udp4");
    b.writeUInt16BE(22, 4); //command HOST UNREGISTERING (22)
    console.log(b);
    client.send(b, 0, b.length, 49999, zibase_ip, function (err, bytes) {
        console.log("Unregistering...", bytes);
        setTimeout(function () {
            console.log("exit");
            client.close();
            process.exit()
        }, 3000);
    });
});








function dot2num(dot) {
    var d = dot.split('.');
    return ((((((+d[0]) * 256) + (+d[1])) * 256) + (+d[2])) * 256) + (+d[3]);
}

function num2dot(num) {
    var d = num % 256;
    for (var i = 3; i > 0; i--) {
        num = Math.floor(num / 256);
        d = num % 256 + '.' + d;
    }
    return d;
}

function getIPAddress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];

        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
                return alias.address;
        }
    }

    return '0.0.0.0';
}

// http://192.168.1.7/cgi-bin/domo.cgi?cmd=ON%20ZA7
exports.send_cmd = function(id, valeur, res){
    url = 'http://'+zibase_ip+'/cgi-bin/domo.cgi?cmd='+valeur+'%20'+id;
    request(url, function (error, response, body) { 

    })
}