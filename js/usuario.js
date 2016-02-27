console.log('carga');
var usuario = '';

/////////////////////////////////////////////ENVIAR ORDENADOR
$('#addLaptop').click(function() {
	console.log('grabar');
	if(usuario == '') {
		addUser();
	} else {
		addLaptop(usuario);
	}
	return false;
});

function addUser() {
	console.log('addUser');
	console.log(userToJSON());
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: 'http://controlr.es.mialias.net/api/users',
		
		data: userToJSON(),
		success: function(data, textStatus, jqXHR){
			console.log('User created successfully');
			addLaptop(data.id);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('addUser error: ' + textStatus);
		}
	});
}

function userToJSON() {
	return JSON.stringify({
		"nombre": $('#nombre').val(), 
		"email": $('#email').val(),
		"pass": $('#pass').val(),
		"poblacion": $('#poblacion').val(),
		"provincia": $('#provincia').val(),
		"cp": $('#cp').val(),
		"imagen": "",
		"descripcion": "",
		"tipo": "usuario"
		});
}

function addLaptop() {
	console.log('addLaptop');
	console.log(laptopToJSON());
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: 'http://controlr.es.mialias.net/api/computers',
		
		data: laptopToJSON(),
		success: function(data, textStatus, jqXHR){
			console.log('Computer created successfully');
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('addLaptop error: ' + textStatus);
		}
	});
}

function laptopToJSON(user) {
	return JSON.stringify({
		"marca": $('#marca').val(), 
		"modelo": $('#modelo').val(),
		"procesador": $('#procesador').val(),
		"ram": $('#ram').val(),
		"hdd": $('#hdd').val(),
		"resolucion": $('#resolucion').val(),
		"imagen": $('#imagen').val(),
		"otros": $('#otros').val(),
		"entregado": "no",
		"numero": "1",
		"usuario": ""+user+""
	});
}

/////////////////////////////////////////////LOGUEAR
$('#loginUser').click(function() {
	console.log('login');
	loguear();
});

function loguear() {
	console.log('loguear');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: 'http://controlr.es.mialias.net/api/login',
		dataType: "json",
		data: loginToJSON(),
		success: function(data, textStatus, jqXHR){
			console.log('logueado: ' + data.nombre);
			renderDetails(data);
			$('#Lemail').val('');
			$('#Lpass').val('');
			$('.tabs-menu li:first a').click();
			usuario = data.id;
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('addLogin error: ' + textStatus);
		}
	});
}

function loginToJSON() {
	return JSON.stringify({
		"email": $('#Lemail').val(),
		"pass": $('#Lpass').val()
	});
}

function renderDetails(user) {
	$('#nombre').val(user.nombre), 
	$('#email').val(user.email),
	$('#pass').val(user.pass),
	$('#poblacion').val(user.poblacion),
	$('#provincia').val(user.provincia),
	$('#cp').val(user.cp)
}

