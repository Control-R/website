console.log('carga');
var usuario;

/////////////////////////////////////////////ENVIAR COLECTIVO
$('#addColectivo').click(function() {
	console.log('grabar');
	addColectivo();
	return false;
});

function addColectivo() {
	console.log('addColectivo');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: 'http://controlr.es.mialias.net/api/users',
		dataType: "json",
		data: userToJSON(),
		success: function(data, textStatus, jqXHR){
			console.log('User created successfully');
			$('#logueo').hide();
			$('#listado').show();
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
		"imagen": $('#imagen').val(),
		"descripcion": $('#descripcion').val(),
		"tipo": 'colectivo'
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
			usuario = data.id;
			renderDetails(data);
			$('#logueo').hide();
			$('#listado').show();
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
	$('#cp').val(user.cp),
	//$('#imagen').val(user.imagen),
	$('#descripcion').val(user.descripcion)
	
}

$('#listado').hide();
$('#contacto').hide();
$('#contacto1').click(function() {
	$('#contacto').fadeIn(200);
});
$('#contacto2').click(function() {
	$('#contacto').fadeIn(200);
});
$('#contacto3').click(function() {
	$('#contacto').fadeIn(200);
});
