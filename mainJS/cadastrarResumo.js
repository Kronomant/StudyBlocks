function cadastrarResumo(){


    var retrivedObject = localStorage.getItem('user');
    var parsedObject = JSON.parse(retrivedObject);

    let idUsuario = parsedObject.userId;
    console.log(idUsuario);
    let autor = parsedObject.nome;
    let titulo = document.getElementById('nome_resumo');
    let select = document.getElementById('area_conhecimento');
    let area = select.options[select.selectedIndex].value;
    console.log(area);
    let resumo = document.getElementById('resumo');

    if(titulo.value.length != 0 && area.length != 0 && resumo.value.length != 0  ){
            enviarBD(idUsuario, titulo.value, autor, area, resumo.value);
    }else alert("Por favor preencha todos os campos")
        
}

function enviarBD(idUsuario1, titulo1, autor1, area1, resumo1){

    let params = `codigoUsuario=${idUsuario1}&areaConhecimento=${area1}&nomeResumo=${titulo1}&conteudo=${resumo1}&autor=${autor1}`
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:3214/resumo/inserir?`+params);
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