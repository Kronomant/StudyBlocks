

function cadastrarUsuario(){

    let login = document.getElementById('txt_login');
    let email = document.getElementById('txt_email');
    let nome = document.getElementById('txt_nome');
    let senha = document.getElementById('txt_senha');
    let senha2 = document.getElementById('txt_senha2');

    if(senha.value.length != 0 && login.value.length != 0 && email.value.length != 0 && nome.value.length != 0 && senha2.value.length != 0 )
        if(senha.value == senha2.value){
            enviarBD(login.value, email.value, nome.value, senha.value);
        }else alert("As senha não coincidem!")
}


function enviarBD(login1, email1, nome1, senha1){

    let params = `loginUsuario=${login1}&emailUsuario=${email1}&senhaUsuario=${senha1}&nomeUsuario=${nome1}`
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:4250/usuario/cadastro?`+params);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function(){
        if(xhr.status == "200"){
            alert("Enviado com sucesso!");
            window.location.reload();
        }
        else if(xhr.status == "404"){
            alert("Houve um erro no seu cadastro!");
            window.location.reload();
        }
    }
    xhr.send(null);
}