const dateElement = document.getElementById("date");


function obtemDadosAJAX(){
    //executar chamada AJAX para a API do JSONSERVER
    let xhr = new XMLHttpRequest();
    xhr.onload = verificaResumo;
    xhr.open('GET', 'http://localhost:3214/resumo/getAll');
    xhr.send();
}

function verificaResumo(dadosResumos){
    dadosResumos = JSON.parse(this.responseText);

    var retrivedObject = localStorage.getItem('resume');
    var resumo = JSON.parse(retrivedObject);


    var singleResumo = document.getElementById('conteudoResumo');
    var tituloResumo = document.getElementById('tituloResumo');
    var texto = '';
    var titulo = '';
    for(i=0;i<dadosResumos.length;i++){

        if(dadosResumos[i].nome_resumo == resumo.nomeResumo){
        texto = texto + `

            <p id="titulo${i}" ">${dadosResumos[i].nome_resumo}</p> <p>${dadosResumos[i].conteudo} </p> <p>Por ${dadosResumos[i].autor}</p>
        
        `;
        titulo = titulo + `
            <h1 class="text-uppercase">${dadosResumos[i].nome_resumo} </h1>
            <span> &bullet; Postado por <a href="#"> ${dadosResumos[i].autor} </a></span>
        `
        }


    }
    tituloResumo.innerHTML = titulo;
    singleResumo.innerHTML = texto;
}