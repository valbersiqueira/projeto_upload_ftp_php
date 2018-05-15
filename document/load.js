function _(el){
    return document.getElementById(el);
}
var id;
function uploadFile(){
  
    var arrayInsert = [];
    var query = location.search.slice(1);
    var partes = query.split('&');
    var data = {};
    partes.forEach(function (parte) {
        var chaveValor = parte.split('=');
        var chave = chaveValor[0];
        var valor = chaveValor[1];
        data[chave] = valor;

    });
    id = data.id;
    id= id.split("/")[0];
    if(this.arrayFile.length !== 0){
        
        var formdata = new FormData();
        var arraDados = this.arrayFile;
        for (var i = 0; i <this.arrayFile.length ; i++) {
            validarArquivo(id, this.arrayFile[i].name, i);
        }   

        setTimeout( function() {
           
            for (var i = 0; i <this.arrayFile.length ; i++) {
                arrayInsert.push([ {name: this.arrayFile[i].name, size: arrayFile[i].size }])
                formdata.append("arquivo[]",  this.arrayFile[i]);
            }
            if(arrayInsert.length > 0 && localStorage.getItem("noConnection")){
                try {
                    localStorage.setItem("arrayFiles", JSON.stringify(arrayInsert));
                    document.getElementById("div-progress").style.display = 'block';
                    var ajax = new XMLHttpRequest();
                    ajax.upload.addEventListener("progress", progressHandler, false);
                    ajax.addEventListener("load", completeHandler, false);
                    ajax.addEventListener("error", errorHandler, false);
                    ajax.addEventListener("abort", abortHandler, false);
                    ajax.open("POST", "dirFile/upload.php/?id="+id);
                    ajax.send(formdata);
                } catch (error) {
                    dialogo("Conexão recusada!");
                }
            } else {
                arrayInsert = [];
            }
        },2000)
       
       
    }else{
        dialogo("Nenhum arquivo selecionado");
    }
}


function progressHandler(event){
    var percent = (event.loaded / event.total) * 100;
    var valor =Math.round(percent);
    var progressBar = document.getElementById("progressBar");
        progressBar.style = `width: ${valor}%`;
        progressBar.innerText = `${valor}%` ;
        _("progressBar").value = valor ;
        if(valor==100){
            document.getElementById("msg_final").style.display = "block";
            document.getElementById("anime").style.display = "block";
            document.getElementById("div-progress").style.display = 'none';
        }
}
function completeHandler(event){
    verificarEnvio();
    var array = JSON.parse(localStorage.getItem("arrayFiles"));
    array = array[0]
    for (var i = 0; i < array.length; i++) {
        envioArquivos(id ,array[i].name, array[i].size);
    }
}
function errorHandler(event){
	dialogo("Falha ao carregar arquivo(s) "+ event.files.name);
}
function abortHandler(event){
    dialogo("Falha ao carregar arquivo(s) "+ event.files.name);
}

function verificarEnvio() {
        document.getElementById("msg_final").style.display = "none";
        document.getElementById("finaly").style.display = "none";
        document.getElementById("anime").style.display = "none";
        document.getElementById("tranferencia").style.display = 'block';
        clearListFile();
            setTimeout( function() {
                document.getElementById("tranferencia").style.display = 'none';
        },3000);
}

function clearListFile() {
    var input = document.getElementById("arquivo");
    input.files.clearListFile;
    var ul = document.getElementById("fileList");
     while (ul.hasChildNodes()) {
         ul.removeChild(ul.firstChild);
     }
}

function dialogo(text){
    var dialogoMsg =  document.getElementById("dialogo");
    dialogoMsg.style.display = "block";
    dialogoMsg.innerText = text;
    setTimeout(function(){ document.getElementById("dialogo").style.display = "none"; }, 3000);
}

function validarArquivo(id,name, index) {
    var fields = [{
        pIdCliente:id,
        pcnpj:"",
        qtditempag:1,
        pagina:1,
        operacao:"LISTAR",
        nomearq:name,
        outros_filtros:"",
        jsonarray:"",
        pobservacoes:""
    }];
    
    const URL = "http://187.115.66.177:8135/datasnap/rest/service/cadcli_download_nr";
    try {
        
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(this.readyState ==4 && this.status == 200) {
                var json = JSON.parse(this.responseText);
                var arrays =json.result[0];
                var obs =arrays[0].fields[0].pobservacoes;
                if(obs == "ok"){
                    removerLiUl(index);
                    dialogo("Arquivo "+name+" já existe!");
                } else{
                    localStorage.setItem("noConnection",true);
                }
            }
        }
        ajax.open("POST", URL);
        ajax.send(JSON.stringify({fields}));
    } catch (error) {
        console.log(error);
        localStorage.setItem("noConnection",false);
        dialogo("Conexão recusada!");
    }
    
}

function envioArquivos(id, arquivo, tamanho ){
    var now = new Date;
    var mes =  now.getMonth() +1;
    var hora = now.getHours() + ":" +now.getMinutes() +":"+now.getSeconds() ;
    var data_fim =   now.getDate() + "/" + mes + "/" + now.getFullYear() + " "+hora;
    var fields = [{
        pIdCliente:0,
        qtditempag:0,
        operacao: "INCLUIR",
        outros_filtros: "",
        pobservacoes: "",
        jsonarray:[{
            cadcli_download:[{
                down_id_cliente:id,
                down_id:0,
                down_status:0,
                down_arquivo_destino:"",
                down_nomecompleto_origem:arquivo,
                down_obs:"",
                down_tamanho_arquivo: tamanho,
                down_datahora_arquivo:data_fim,
                down_download_dathora_ini:data_fim,
                down_download_dathora_fin:data_fim,
                down_arquivo_nome:arquivo,
                down_inventario:"NORMAL ",
                down_int_datinv:""
            }]
        }]
    }];
    const URL = "http://187.115.66.177:8135/datasnap/rest/service/cadcli_download_nr";
    try {
        
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                this.responseText;
            } 
        };
        ajax.open("POST", URL);
        ajax.send(JSON.stringify({fields}));
    } catch (error) {
        console.log(error);
    }
    
}

function geteData(){
    var now = new Date;
    var mes =  now.getMonth() +1;
    var hora = now.getHours() + ":" +now.getMinutes() +":"+now.getSeconds() ;
    return now.getDate() + "/" + mes + "/" + now.getFullYear() + " "+hora;
}

function removerLiUl(i){
    var ul = document.getElementById("fileList");
    var li = document.getElementById(i);
    ul.removeChild(li);
    this.arrayFile.splice(i, 1);
}