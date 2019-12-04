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

var CREATE = "Agregar servicos";

var UPDATE = "Actualizar servicio";

var CAMBIO = CREATE;



function inicializarPagina(){

  formularioDatos = document.getElementById('formDatos');


  formularioDatos.addEventListener("submit", enviarDatos, false);



  tablaMostrar = document.getElementById("tablaFB");



  refeClientes = firebase.database().ref().child("servicios");

  mostrarTabla();

}



function enviarDatos(event){

  event.preventDefault();

  switch (CAMBIO) {

    case CREATE:

      if (formularioDatos !== "") {

          refeClientes.push({

            tipo: event.target.tipo.value,

            descripcion: event.target.descripcion.value,

            precio: event.target.precio.value

          });



          swal(

            'Éxito!',

            'Servicio insertado con éxito!',

            'success'

          );

      }else {

          swal(

            'Error!',

            'El servicio no fue insertado con éxito!',

            'danger'

          );

      }

      break;

    case UPDATE:

      ref_idCliente2.update({

            tipo: event.target.tipo.value,

            descripcion: event.target.descripcion.value,

            precio: event.target.precio.value

      });

      document.getElementById('btnAdd').value = CREATE;

      CAMBIO = CREATE;



      swal(

        'Éxito!',

        'Servicio actualizado con éxito!',

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

                          "<td>"+ datosArray[documento].tipo +"</td>"+

                          "<td>"+ datosArray[documento].descripcion +"</td>"+

                          "<td>"+ datosArray[documento].precio +"</td>"+

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
	    swal("El servicio ha sido eliminado correctamente!", {
	      icon: "success",
	    });
	  } else {
	    swal("El servicio ha sido conservado");
	  }
	});
	

}



function editarClientes() {

  var idCliente2 = this.getAttribute("dataCliente2");

  ref_idCliente2 = refeClientes.child(idCliente2);

  ref_idCliente2.once("value",function(snap) {

      var datosSnap = snap.val();

      document.getElementById('tipo').value = datosSnap.tipo;

      document.getElementById('descripcion').value = datosSnap.descripcion;

      document.getElementById('precio').value = datosSnap.precio;

  });

  document.getElementById('btnAdd').value = UPDATE;

  CAMBIO = UPDATE;

}

