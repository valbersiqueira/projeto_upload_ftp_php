<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Language" content="pt-br">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>UPLOAD ARQUIVO(S)</title>
    <script src="document/load.js"></script>
    <script src="document/listfile.js"></script>

	<link href="bootstrap-4.1.1/dist/css/bootstrap.min.css" rel="stylesheet">
	<link rel="stylesheet" href="fontawesome-free-5.0.10/web-fonts-with-css/css/fontawesome-all.css">

</head>
<body >

<br/>
	<div class="container">
		<div class="col-sm-12 col-md-12 col-lg-12">
			<form id="upload_form" enctype="multipart/form-data" method="post">
				<div class="input-group">
					<div class="custom-file">
						<input type="file" class="custom-file-input" id="arquivo"  name="arquivo[]"
							multiple onChange="makeFileList();" >

						<label class="custom-file-label" for="arquivo">Escolher Arquivos</label>
					</div>
					
					<div class="input-group-append">
						<button class="btn btn-outline-secondary" 
							type="button"  onclick="uploadFile()">Enviar</button>
							
					</div>
					<button style="margin-left: 2px" type="button"
						onclick="clearListFile()" 
						class="btn btn-outline-primary">Limpar lista de transferência</button>
				</div>
			</form>
		</div>
		<br/>
		<div class="progress" style="display:none" id="div-progress">
			<div class="progress-bar" role="progressbar" id="progressBar" 
				style="width: 0%" aria-valuemax="100">0%
			</div>
		</div>
		
		
		<br/>
		<div class="col-sm-12 col-md-12 col-lg-12" style="overflow: auto; max-height: 400vh;">
			<ul class="list-group" id="fileList">
			</ul>
		</div>

	</div> 
			<div>
				<span id="dialogo"
				style="font-family: Arial, Helvetica, sans-serif;
				background-color: #F44336;
				color: white;padding: 20px;
				border-radius: 10px; display:none;
				position:absolute;bottom:20px;width:100%;"></span>
			</div>
			<div id='tranferencia' style='position:absolute;bottom:20px;width:100%; display:none'
				class='alert alert-success' 
				role='alert'><h4>Transferêcia completa!</h4>
			 </div>
	
	<div id="progressExterna" style="display: none">
		<?php include("progress.php")?>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="bootstrap-4.1.1/dist/js/bootstrap.min.js"></script>
	
</body>
</html>