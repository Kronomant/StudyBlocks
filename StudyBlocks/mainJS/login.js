
var user = {};

//user = {};
//localStorage.setItem('user', JSON.stringify (user));

function obtemDadosAJAX(){
    //executar chamada AJAX para a API do JSONSERVER
    let xhr = new XMLHttpRequest();
    xhr.onload = verificaLogin;
    xhr.open('GET', 'http://localhost:3214/usuario/getAll');
    xhr.send();
}

// valor dos compos input
function verificaLogin(dados){

let password = document.getElementById('password').value;
let nome = document.getElementById('username').value;
// dados = todos os usuarios do banco
    dados = JSON.parse(this.responseText);
    for(i = 0; i < dados.length; i++){
        let senhaUsuario = dados[i].senha;
        let idUsuario = dados[i].id;
        let loginUsuario = dados[i].login;
        
        if(nome == loginUsuario){
            i = dados.length;
            
            if(password == senhaUsuario){
                login(idUsuario, loginUsuario);
            }else alert("Usuario ou senha incorretos!");
        }
    }
}

// Guarda informações do usuario no local Storage
function login(idUsuario, loginUsuario){
    let user = {"userId":idUsuario, "nome":loginUsuario};
    localStorage.setItem('user', JSON.stringify(user));
    window.location.replace("./index.html");
}

function logoutUser () {
    user = {};
    localStorage.setItem ('user', JSON.stringify (user));
    window.location.replace("./index.html");
}