var config = {
    apiKey: "AIzaSyBtBmp1nSRss67nCIp2jwsT_eLH3_tZPzg",
    authDomain: "ejemplo1-73a89.firebaseapp.com",
    databaseURL: "https://ejemplo1-73a89.firebaseio.com",
    projectId: "ejemplo1-73a89",
    storageBucket: "ejemplo1-73a89.appspot.com",
    messagingSenderId: "603737096607"
  };

  var d = new Date();
  var t = d.getTime();
  var counter = t;
  var aux;
  var data;

  firebase.initializeApp(config);
  function getID(id){
  	return document.getElementById(id).value;
  }

  function inputsTask(nombre, result){
  	return document.getElementById(nombre).value=result;
  }

  function innerHTML(id, result){
  	return document.getElementById(id).innerHTML+=result;
  }
 
  function arrayJSON( id, nombre, posicion, oficina, edad, fecha){

  	data = {
  		id: id,
  		nombre: nombre,
  		posicion: posicion,
  		oficina: oficina,
  		edad: edad,
  		fecha: fecha
  	};
  	return data;
  }



  function insertTask(){

  	var id = counter+=1;
  	var nombre = getID("nombre");
  	var posicion = getID("posicion");
  	var oficina = getID("oficina");
  	var edad = getID("edad");
  	var fecha = getID("fecha");

  	var arrayData = arrayJSON(id, nombre, posicion, oficina, edad, fecha);
  	console.log(arrayData);
  	var task = firebase.database().ref("productos/"+id);
  	task.set(arrayData);
  	alert("Datos agregados");
  	inputsTask("nombre", "");
  	inputsTask("posicion","");
  	inputsTask("oficina", "");
  	inputsTask("edad", "");
  	inputsTask("fecha", "");


  }
  function table( id,nombre, posicion, oficina, edad, fecha){

  	return '<tr>'+
  	'<td>'+nombre+'</td>'+
  	'<td>'+posicion+'</td>'+
  	'<td>'+oficina+'</td>'+
  	'<td>'+edad+'</td>'+
  	'<td>'+fecha+'</td>'+
  	'<td><i class="fas fa-eye pull-right"></i></td>'+
  	'<td><i class="fas fa-edit pull-right" '+' onclick="editTask('+id+')"></i></td>'+
  	'<td><i class="fas fa-trash pull-right" onclick="remove('+id+')"></i></td>'+
  	'</tr>';


  }
  function watchTask(){
  	var task = firebase.database().ref("productos/");
  	task.on("child_added", function(data){
  		var taskValue = data.val();
  		var result = table( taskValue.id, taskValue.nombre, taskValue.posicion, taskValue.oficina, taskValue.edad, taskValue.fecha);
  		innerHTML ("datos",result);
  	});
  }

  function editTask( id){
  		alert(id);
	  	

	  	var task = firebase.database().ref("productos/"+id);
  		task.once("value", function(data){
  		var taskValue = data.val();
  		inputsTask("nombre", taskValue.nombre);
	  	inputsTask("posicion", taskValue.posicion);
	  	inputsTask("oficina", taskValue.oficina);
	  	inputsTask("edad", taskValue.edad);
	  	inputsTask("fecha", taskValue.fecha);
  	});
  	

  }

  function remove(id){

  	var task = firebase.database().ref("productos/"+id);
  	task.remove();
  	location.reload();
  }


