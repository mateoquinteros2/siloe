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

var formularioDatos;

var refeClientes;

var ref_idCliente2;

var tablaMostrar;

var CREATE = "Agregar clientes";

var UPDATE = "Actualizar clientes";

var CAMBIO = CREATE;



function inicializarPagina(){

  formularioDatos = document.getElementById('formDatos');


  formularioDatos.addEventListener("submit", enviarDatos, false);



  tablaMostrar = document.getElementById("tablaFB");



  refeClientes = firebase.database().ref().child("clientes");

  mostrarTabla();

}



function enviarDatos(event){

  event.preventDefault();

  switch (CAMBIO) {

    case CREATE:

      if (formularioDatos !== "") {

          refeClientes.push({

            nombre: event.target.nombre.value,

            direccion: event.target.direccion.value,

            telefono: event.target.telefono.value,

            dui: event.target.dui.value,

            nit: event.target.nit.value

          });



          swal(

            'Éxito!',

            'Cliente insertado con éxito!',

            'success'

          );

      }else {

          swal(

            'Error!',

            'El cliente no fue insertado con éxito!',

            'danger'

          );

      }

      break;

    case UPDATE:

      ref_idCliente2.update({

            nombre: event.target.nombre.value,

            direccion: event.target.direccion.value,

            telefono: event.target.telefono.value,

            dui: event.target.dui.value,

            nit: event.target.nit.value

      });

      document.getElementById('btnAdd').value = CREATE;

      CAMBIO = CREATE;



      swal(

        'Éxito!',

        'Cliente actualizado con éxito!',

        'success'

      );

      break;



  }



  formularioDatos.reset();

}



function mostrarTabla(){

  refeClientes.on("value", function(snap) {

    var datosArray = snap.val();

    var filaDocumento = "";

    for(var documento in datosArray){

      filaDocumento += "<tr>" +

                          "<td>"+ datosArray[documento].nombre +"</td>"+

                          "<td>"+ datosArray[documento].direccion +"</td>"+

                          "<td>"+ datosArray[documento].telefono +"</td>"+

                          "<td>"+ datosArray[documento].dui +"</td>"+

                          "<td>"+ datosArray[documento].nit +"</td>"+

                          '<td>'+

                              '<button class="btn btn-danger btn-round pull-right btn-fab btn-fab-mini borrarCliente" dataCliente = "'+documento+'">'+

                                '<span class="fa fa-trash"></span>'+

                              '</button>'+

                              '<button class="btn btn-info btn-round pull-right btn-fab btn-fab-mini editarCliente" dataCliente2 = "'+documento+'">'+

                                '<span class="fa fa-edit"></span>'+

                              '</button>'+

                           '</td>'+

                       "</tr>";

    }

    tablaMostrar.innerHTML = filaDocumento;

    if(filaDocumento !== ""){

      var documentosEditar = document.getElementsByClassName('editarCliente');

      for (var i = 0; i < documentosEditar.length; i++) {

        documentosEditar[i].addEventListener("click",editarClientes,false);

      }

      var documentosBorrar = document.getElementsByClassName('borrarCliente');

      for (var i = 0; i < documentosBorrar.length; i++) {

        documentosBorrar[i].addEventListener("click",borrarClientes,false);

      }

    }

  });

}



function borrarClientes() {

    var idCliente = this.getAttribute("dataCliente");

    var ref_idCliente = refeClientes.child(idCliente);

    

    swal({
	  title: "¿Estás seguro?",
	  text: "Una vez eliminado no podrás recuperarlo!",
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	  cancelButtonColor: '#d33',
	  cancelButtonText: "Cancelar",
	  showCancelButton: true,
	})
	.then((willDelete) => {
	  if (willDelete) {
	  	ref_idCliente.remove();
	    swal("El cliente ha sido eliminado correctamente!", {
	      icon: "success",
	    });
	  } else {
	    swal("El cliente ha sido conservado");
	  }
	});
	

}



function editarClientes() {

  var idCliente2 = this.getAttribute("dataCliente2");

  ref_idCliente2 = refeClientes.child(idCliente2);

  ref_idCliente2.once("value",function(snap) {

      var datosSnap = snap.val();

      document.getElementById('nombre').value = datosSnap.nombre;

      document.getElementById('direccion').value = datosSnap.direccion;

      document.getElementById('telefono').value = datosSnap.telefono;

      document.getElementById('dui').value = datosSnap.dui;

      document.getElementById('nit').value = datosSnap.nit;

  });

  document.getElementById('btnAdd').value = UPDATE;

  CAMBIO = UPDATE;

}
