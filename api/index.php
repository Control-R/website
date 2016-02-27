<?php

require 'Slim/Slim.php';

$app = new Slim();

//$app->get('/users','getUsers');
//$app->get('/users/:id',	'getUser');
$app->post('/users', 'addUser');
//$app->put('/users/:id', 'updateUser');
//$app->delete('/users/:id',	'deleteUser');

// $app->get('/computers', 'getUsers');
// $app->get('/computers/search/:query', 'findByProvincia');
$app->post('/computers', 'addComputer');
// $app->put('/computers/:id', 'updateUser');
// $app->delete('/computers/:id',	'deleteUser');

// $app->post('/entrega', 'updateUser');

$app->post('/login','loginUser');


$app->run();

function loginUser() {
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());
	$sql = "SELECT * FROM usuarios WHERE email=:email AND pass=:pass";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("email", $user->email);
		$stmt->bindParam("pass", $user->pass);
		$stmt->execute();
		$user = $stmt->fetchObject();  
		$db = null;
		echo json_encode($user); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addUser() {
	$request = Slim::getInstance()->request();
	$user = json_decode($request->getBody());
	$sql = "INSERT INTO usuarios (nombre, email, pass, poblacion, provincia, cp, imagen, descripcion, tipo) VALUES (:nombre, :email, :pass, :poblacion, :provincia, :cp, :imagen, :descripcion, :tipo)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("nombre", $user->nombre);
		$stmt->bindParam("email", $user->email);
		$stmt->bindParam("pass", $user->pass);
		$stmt->bindParam("poblacion", $user->poblacion);
		$stmt->bindParam("provincia", $user->provincia);
		$stmt->bindParam("cp", $user->cp);
		$stmt->bindParam("imagen", $user->imagen);
		$stmt->bindParam("descripcion", $user->descripcion);
		$stmt->bindParam("tipo", $user->tipo);
		$stmt->execute();
		$user->id = $db->lastInsertId();
		$db = null;
		echo json_encode($user); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addComputer() {
	$request = Slim::getInstance()->request();
	$ordenador = json_decode($request->getBody());
	$sql = "INSERT INTO ordenador (marca, modelo, procesador, ram, hdd, resolucion, imagen, otros, entregado, numero, usuario) VALUES (:marca, :modelo, :procesador, :ram, :hdd, :resolucion, :imagen, :otros, :entregado, :numero, :usuario)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("marca", $ordenador->marca);
		$stmt->bindParam("modelo", $ordenador->modelo);
		$stmt->bindParam("procesador", $ordenador->procesador);
		$stmt->bindParam("ram", $ordenador->ram);
		$stmt->bindParam("hdd", $ordenador->hdd);
		$stmt->bindParam("resolucion", $ordenador->resolucion);
		$stmt->bindParam("imagen", $ordenador->imagen);
		$stmt->bindParam("otros", $ordenador->otros);
		$stmt->bindParam("entregado", $ordenador->entregado);
		$stmt->bindParam("numero", $ordenador->numero);
		$stmt->bindParam("usuario", $ordenador->usuario);
		$stmt->execute();
		$ordenador->id = $db->lastInsertId();
		$db = null;
		echo json_encode($ordenador); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function getConnection() {
	$dbhost="localhost";
	$dbuser="mycontrolr";
	$dbpass="G614gOC6";
	$dbname="controlr";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>