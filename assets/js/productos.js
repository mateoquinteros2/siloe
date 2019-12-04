var config = {

 /* apiKey: "AIzaSyAUbxmM2KBuy5opW7Dlejd3v-EkBu2devk",
  authDomain: "bbbe-5b6fb.firebaseapp.com",
  databaseURL: "https://bbbe-5b6fb.firebaseio.com",
  projectId: "bbbe-5b6fb",
  storageBucket: "bbbe-5b6fb.appspot.com",
  messagingSenderId: "291653738479"
*/

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
var CREATE = "Agregar producto";
var UPDATE = "Actualizar producto";
var CAMBIO = CREATE;
var fichero;
var storageRef;
var urlImg ;
var nomImg ;
var band = false;

function inicializarPagina(){

  fichero = document.getElementById('fichero');
  fichero.addEventListener("change", subirImagen,false);
  storageRef = firebase.storage().ref();

  
    formularioDatos = document.getElementById('formDatos');
    formularioDatos.addEventListener("submit", enviarDatos, false);
    tablaMostrar = document.getElementById("tablaFB");
    refeClientes = firebase.database().ref().child("productos");
    console.log('llegue se supono que guardo');
  
  

  mostrarTabla();

  
}

function subirImagen(){

  var imagen = fichero.files[0];

  var uploadTask = storageRef.child('Imagenes/'+ imagen.name).put(imagen);

  nomImg = imagen.name;

  uploadTask.on('state_changed', function(snapshot){   }, function(error){alert("hubo un error");
   },function(){
       var starsRef = storageRef.child('Imagenes/'+imagen.name);
       starsRef.getDownloadURL().then(function(url) {
          urlImg = url;
          document.getElementById("imagen").src = url;
          
          console.log('llegue' + url);
       }).catch(function(error) {

       switch (error.code) {
           case 'storage/object-not-found':
                   console.log("0");
           break;

           case 'storage/unauthorized':
                   console.log("1");
           break;

           case 'storage/canceled':
                   console.log("2");
           break;

           case 'storage/unknown':
                console.log("3");
           break;
       }
       });

   });
}

function enviarDatos(event){

  event.preventDefault();

  switch (CAMBIO) {

    case CREATE:

      if (formularioDatos !== "") {

          refeClientes.push({

            nombre: event.target.nombre.value,
            sistema: event.target.sistema.value,
            superficie: event.target.superficie.value,
            tipo: event.target.tipo.value,
            precio: event.target.precio.value,
            nomImg: nomImg, urlImg: urlImg

          });

          swal(

            'Éxito!',

            'Producto insertado con éxito!',

            'success'
            
          );
          console.log('se guardo');
          document.getElementById("imagen").src = " ../../assets/img/image_placeholder.jpg";
      }else {

          swal(

            'Error!',

            'El producto no fue insertado con éxito!',

            'danger'

          );

      }

      break;

    case UPDATE:

      ref_idCliente2.update({

            nombre: event.target.nombre.value,

            sistema: event.target.sistema.value,

            superficie: event.target.superficie.value,

            tipo: event.target.tipo.value,

            precio: event.target.precio.value

      });

      document.getElementById('btnAdd').value = CREATE;

      CAMBIO = CREATE;



      swal(

        'Éxito!',

        'Producto actualizado con éxito!',

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

                          "<td>"+ datosArray[documento].sistema +"</td>"+

                          "<td>"+ datosArray[documento].superficie +"</td>"+

                          "<td>"+ datosArray[documento].tipo +"</td>"+

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
	    swal("El producto ha sido eliminado correctamente!", {
	      icon: "success",
	    });
	  } else {
	    swal("El producto ha sido conservado");
	  }
	});
	

}



function editarClientes() {

  var idCliente2 = this.getAttribute("dataCliente2");

  ref_idCliente2 = refeClientes.child(idCliente2);

  ref_idCliente2.once("value",function(snap) {

      var datosSnap = snap.val();

      document.getElementById('nombre').value = datosSnap.nombre;

      document.getElementById('sistema').value = datosSnap.sistema;

      document.getElementById('superficie').value = datosSnap.superficie;

      document.getElementById('tipo').value = datosSnap.tipo;

      document.getElementById('precio').value = datosSnap.precio;
      document.getElementById("imagen").src = datosSnap.urlImg;
  });

  document.getElementById('btnAdd').value = UPDATE;

  CAMBIO = UPDATE;

}

