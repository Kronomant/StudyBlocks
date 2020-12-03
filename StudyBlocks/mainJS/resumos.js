/*var dados = {
    "resumos" : [
        {
            "id": "1",
            "classe":"quimica",
            "titulo": "Como Fazer O Balanceamento Das Equações Químicas?",
            "imagem": "https://source.unsplash.com/_y4LGVTeBwQ/300x170",
            "fonte": "Descomplica",
            "url" : "https://descomplica.com.br/blog/materiais-de-estudo/resumo/como-fazer-o-balanceamento-das-equacoes-quimicas/",
        },
        {
            "id": "2",
            "classe":"fisica",
            "titulo": "Quais São As Leis De Newton E Como São Aplicadas?",
            "imagem": "https://source.unsplash.com/RTtv7aT97dg/300x170",
            "fonte": "Descomplica",
            "url" : "https://descomplica.com.br/blog/materiais-de-estudo/resumo/quais-sao-as-leis-de-newton-e-como-sao-aplicadas/",
        },
        {
            "id": "3",
            "classe":"biologia",
            "titulo": "Você Sabe O Que É Membrana Plasmática?",
            "imagem": "https://source.unsplash.com/L7en7Lb-Ovc/300x170",
            "fonte": "Descomplica",
            "url" : "https://descomplica.com.br/blog/materiais-de-estudo/resumo/o-que-e-membrana-plasmatica/",
        },
        {
            "id": "4",
            "classe":"biologia",
            "titulo": "O Que São Tipos Celulares?",
            "imagem": "https://source.unsplash.com/dMZC6hdobnk/300x170",
            "fonte": "Descomplica",
            "url" : "https://descomplica.com.br/blog/materiais-de-estudo/resumo/o-que-sao-tipos-celulares/",
        },
        {
            "id": "5",
            "classe":"biologia",
            "titulo": "Mapa Mental: Liberalismo Econômico",
            "imagem": "https://source.unsplash.com/8lnbXtxFGZw/300x170",
            "fonte": "Descomplica",
            "url" : "https://descomplica.com.br/blog/materiais-de-estudo/resumo/mapa-mental-liberalismo-economico/",
        },
        {
            "id": "6",
            "classe":"historia",
            "titulo": "Mapa Mental: Iluminismo",
            "imagem": "https://source.unsplash.com/tMGMINwFOtI/300x170",
            "fonte": "Descomplica",
            "url" : "https://descomplica.com.br/blog/materiais-de-estudo/resumo/mapa-mental-iluminismo/",
        },
        {
            "id": "7",
            "classe":"redacao",
            "titulo": "Quais As Funções Da Introdução De Uma Redação?",
            "imagem": "https://source.unsplash.com/00nHr1Lpq6w/300x170",
            "fonte": "Descomplica",
            "url" : "https://descomplica.com.br/blog/materiais-de-estudo/resumo/quais-as-funcoes-da-introducao-de-uma-redacao/",
        },
        {
            "id": "8",
            "classe":"quimica",
            "titulo": "Mapa Mental: Sais Minerais",
            "imagem": "https://source.unsplash.com/hWzrJsS8gwI/300x170",
            "fonte": "Descomplica",
            "url" : "https://descomplica.com.br/blog/materiais-de-estudo/resumo/mapa-mental-sais-minerais/",
        },
        {
            "id": "9",
            "classe":"historia",
            "titulo": "Resumo Sobre Revolução Francesa",
            "imagem": "https://source.unsplash.com/GDyJRbm6Msg/300x170",
            "fonte": "Descomplica",
            "url" : "https://descomplica.com.br/blog/materiais-de-estudo/resumo/resumo-revolucao-francesa/",
        }


    ]

}*/

function tagNome(x) {
// pega nome do titulo do resumo
var nomeResumo = document.getElementById(x.id).innerText;



let resume = {"nomeResumo":nomeResumo};
// coloca resumo no localStorage
localStorage.setItem('resume', JSON.stringify(resume));
window.location.replace("./singleResumo.html");

}

function obtemDadosAJAX(){
    //executar chamada AJAX para a API do JSONSERVER
    let xhr = new XMLHttpRequest();
    xhr.onload = verificaResumo;
    xhr.open('GET', 'http://localhost:3214/resumo/getAll');
    xhr.send();
}


function verificaResumo(dadosResumos){
    dadosResumos = JSON.parse(this.responseText);

    var elementoderesumos = document.querySelector('div.resumos');
    var texto = '';
    var imagem = '';
    for(i=0;i<dadosResumos.length;i++){

        if(dadosResumos[i].area_resumo == 1){
            imagem = "https://source.unsplash.com/1600x900/?calculation"
        }else if(dadosResumos[i].area_resumo == 2){
            imagem = "https://source.unsplash.com/1600x900/?earth"
        }else if(dadosResumos[i].area_resumo == 3){
            imagem = "https://source.unsplash.com/1600x900/?Biology"
        }else if(dadosResumos[i].area_resumo == 4){
            imagem = "https://source.unsplash.com/1600x900/?sports"
        }else{
            imagem = "https://source.unsplash.com/1600x900/?knowledge"
        }

        texto = texto + `
        <div class="card-resumo">
            <img id="imagem"  class="card-img-top" src="${imagem}${i}" style="width: 25rem;">
            <a href="#"><p id="titulo${i}"onclick ="tagNome(this)" class="card-text">${dadosResumos[i].nome_resumo}</p></a> <p>Por ${dadosResumos[i].autor} </p>
        </div>
        `

    }
    elementoderesumos.innerHTML = texto;
}