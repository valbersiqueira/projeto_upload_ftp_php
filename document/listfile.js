var arrayFile = [];

function makeFileList() {
    var input = document.getElementById("arquivo");
    var ul = document.getElementById("fileList");

    // this.arrayFile = [];
    
    for (var i = this.arrayFile.length; i < input.files.length; i++) {
        this.arrayFile.push(input.files[i])
        var li = document.createElement("li");
        li.setAttribute("id", i);
        li.className = "list-group-item";
        li.innerHTML = input.files[i].name;
       

        var btn =  document.createElement("button");
        btn.setAttribute("class", "btn btn-success");
        btn.setAttribute("id", i+"-btn");

        btn.setAttribute("ondblclick", "removerLi("+i+")");
        btn.style = "float: right;";

        var icon = document.createElement("i");
        icon.setAttribute("id", i+"-ic");
        icon.setAttribute("class", "fas fa-check-square");

        btn.appendChild(icon);

        li.appendChild(btn);
        ul.appendChild(li);
    }
}

function clearListFile() {
    var input = document.getElementById("arquivo");
    input.files.clearListFile;
    var ul = document.getElementById("fileList");
    this.arrayFile = [];
     while (ul.hasChildNodes()) {
         ul.removeChild(ul.firstChild);
     }
}

function removerLi(i){
    var input = document.getElementById("arquivo");

    var ul = document.getElementById("fileList");
    var li = document.getElementById(i);
    var icon = document.getElementById(i+"-ic");
    var btn = document.getElementById(i+"-btn");
     console.log("id "+i);
    if (icon.className === "fas fa-trash-alt") {
        icon.setAttribute("class", "fas fa-check-square");
        btn.setAttribute("class", "btn btn-success");
        this.arrayFile[i] = input.files[i];
        
    } else {
        icon.setAttribute("class", "fas fa-trash-alt");
        btn.setAttribute("class", "btn btn-danger");
        // if(this.arrayFile.length === 1){
        //     this.arrayFile = [] ;
        // }else{
            this.arrayFile.splice(i, 1);
        // }
    }
}

 