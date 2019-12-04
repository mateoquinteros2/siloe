// Initialize Firebase
      var config = {
        apiKey: "AIzaSyBtBmp1nSRss67nCIp2jwsT_eLH3_tZPzg",
        authDomain: "ejemplo1-73a89.firebaseapp.com",
        databaseURL: "https://ejemplo1-73a89.firebaseio.com",
        projectId: "ejemplo1-73a89",
        storageBucket: "ejemplo1-73a89.appspot.com",
        messagingSenderId: "603737096607"
      };
      firebase.initializeApp(config);



  function registrar(){

  	var email = document.getElementById('email2').value;
  	var password = document.getElementById('password2').value;
  	
  	
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	   var errorCode = error.code;
	   var errorMessage = error.message;
	  // ...
	  alert(errorMessage);

	  
	});

  }

  function ingreso(){

  	var email = document.getElementById('email').value;
  	var password = document.getElementById('password').value;

	

	if (email == "funerariasiloe@gmail.com" && password == "funeraria"){
		alert("Bienvenido");
		window.location = "../../examples/dashboard.html";
		return false;
	}else{
		alert("Correo o contraseña incorrecta");
		return false;
	}

  }

  function observador(){


	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    // User is signed in.
	    var displayName = user.displayName;
	    var email = user.email;
	    var emailVerified = user.emailVerified;
	    var photoURL = user.photoURL;
	    var isAnonymous = user.isAnonymous;
	    var uid = user.uid;
	    var providerData = user.providerData;
	    // ...
	  } else {
	    // User is signed out.
	    // ...
	  }
	});

  }

  observador();

