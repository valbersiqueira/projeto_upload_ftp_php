<?php
 //$ip ="10.1.1.4";
$ip ='187.115.66.177';
$username = "root";
$password = "root";
$percent = "10%";
$exibirProgress= "none";
 $idSrevico = str_replace("/index.php", "", $_GET['id']);

	if(isset($_FILES['arquivo'])) {
		if(count($_FILES['arquivo']['tmp_name']) > 0) {
			$conection = ftp_connect($ip);
			if($conection) {
				if(ftp_login($conection, $username, $password)) {
					for ($i=0; $i < count($_FILES['arquivo']['tmp_name']) ; $i++) {
						$temp_nome = $_FILES['arquivo']['tmp_name'][$i];
						$nome = $_FILES['arquivo']['name'][$i];
						 ftp_put($conection, './ID'.$idSrevico.'/'.$nome, $temp_nome, FTP_BINARY);
					}
					ftp_close($conection);
				}
			}
		}
	}
?>
