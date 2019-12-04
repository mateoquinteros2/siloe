var config = {
    apiKey: "AIzaSyDnujHDy-z-b6tyUyoR2MHQptWqzjfEocY",
    authDomain: "tpi2019.firebaseapp.com",
    databaseURL: "https://tpi2019.firebaseio.com",
    projectId: "tpi2019",
    storageBucket: "tpi2019.appspot.com",
    messagingSenderId: "315221948783",
    appId: "1:315221948783:web:dbe36e7db0dd02c92fd09a"
};
firebase.initializeApp(config);

// Para volver reactiva nuestra página

window.onload = inicializarPagina;



//Variables globales


var refeClientes;

var tablaMostrar;

var carro;

var pie;

var tabla;



function inicializarPagina(){

tablaMostrar = document.getElementById("tablaFB");

carro = document.getElementById("tab");

pie = document.getElementById("foot");

tabla = document.getElementById("table");

refeClientes = firebase.database().ref().child("productos");

mostrarTabla();

}

function mostrarTabla(){

refeClientes.on("value", function(snap) {

  var datosArray = snap.val();

  var filaDocumento = "";

  for(var documento in datosArray){

    filaDocumento += 

                        '<div class="col-sm-4">'+    
          
                            '<div class="card card-product">'+
                                
                              '<div class="card-body"> <div class="card-image" data-header-animation="true">'+

                              '<img class="img" src="'+datosArray[documento].urlImg+'" /> </div>' +   
                              
                              '<h3 class="card-title">'+datosArray[documento].nombre+' </h3> '+

                              '<p class="card-description">$ '+ datosArray[documento].precio +'</p>'+

                             '</div>'+
                                       
                            '</div>'+
                                      
                          '</div>';
                          

  }

  tablaMostrar.innerHTML = filaDocumento;

    if(filaDocumento !== ""){

    var carr = document.getElementsByClassName('agregar');

    for (var i = 0; i < carr.length; i++) {

      carr[i].addEventListener("click",carrito,false);

    }

  }


});

}

var filaDocumento = "";

var total= parseInt("0");

function carrito(){

var idCliente = this.getAttribute("dataCliente");

var ref_idCliente = refeClientes.child(idCliente);



var task = firebase.database().ref("servicios/"+idCliente);


var pieDocumento = "";
    task.on("value", function(snap){
    var taskValue = snap.val();


    total = parseInt(taskValue.precio)+total;


    filaDocumento +=
                          "<tr>" +

                        "<td>"+ taskValue.tipo +"</td>"+

                        "<td>"+ taskValue.descripcion +"</td>"+

                        "<td>"+ taskValue.precio +"</td>"+

                        //"<td>"+

                       // '<button class="btn btn-danger btn-round pull-right btn-fab btn-fab-mini borrar">'+

                            //'<span class="fa fa-trash"></span>'+

                        ////'</button>'+

                        "</td>"+

                     "</tr>";

    pieDocumento +=

                       "<tr>"+

                        '<td colspan="1"></td>'+

                        '<td class="td-total"> Total </td>'+

                        '<td class="td-price">'+"<small>$</small>"+total+"</td>"+

                    "</tr>";

  });

carro.innerHTML = filaDocumento;
pie.innerHTML = pieDocumento;



}

