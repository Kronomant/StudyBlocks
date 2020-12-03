// Selecionando elementos

const clear = document.querySelector(".clear");

const dateElement = document.getElementById("date");

const list = document.getElementById("list");

const input= document.getElementById("input");

// Nome da classes

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


// Variaveis

var LIST = [], id = 0, cont = 0, quant = 0;

// pegar item do localstorage

let data = localStorage.getItem("TODO");

var retrivedObject = localStorage.getItem('user');
var parsedObject = JSON.parse(retrivedObject);



function obtemDadosAJAX(){
    //executar chamada AJAX para a API do JSONSERVER
    let xhr = new XMLHttpRequest();
    xhr.onload = verificaTarefas;
    xhr.open('GET', 'http://localhost:3214/tarefas/getAll');
    xhr.send();
}



function verificaTarefas(dados){
    dados = JSON.parse(this.responseText);
    // checar se a data não esta vazia
    if(dados){
        LIST = dados;
        id = LIST.length;
        quant = LIST.length;
        cont = LIST.length;
        loadList(LIST);
    }else{
        quant = 0;
        LIST = [];
        id = 0;
        cont = 0;
    }
}
// carregar os itens para a inteface do usuario
function loadList(array){
    array.forEach(function(item){
        addToDo(item.descricao_tarefa, item.cod_usuario, item.id_tarefa);
    });
}

//  limpar o localStorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();

});

function enviarBD(idUsuario, descricao){

    let params = `codigoUsuario=${idUsuario}&descricaoTarefa=${descricao}`;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', `http://localhost:3214/tarefas/inserir?`+params);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function(){
        if(xhr.status == "200"){
            alert("Enviado com sucesso!");
            //window.location.reload();
        }
        else if(xhr.status == "405"){
            alert("Houve um erro no seu cadastro!");
            //window.location.reload();
        }
    }
    xhr.send(null);
}

function excluirBD(idtarefa){

    let params = `id_tarefa=${idtarefa}`;
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', `http://localhost:3214/tarefas/deletar?`+params);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function(){
        /*if(xhr.status == "200"){
            alert("Deletado com sucesso!");
            //window.location.reload();
        }
        else{
            alert("Houve um erro no seu cadastro!");
            //window.location.reload();
        }*/
    }
    xhr.send(null);
}

// Mostrar a data

const options ={ weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("pt-BR", options); // define o tipo da data, o idioma


// função da lista de tarefas

function addToDo(toDo, id_usuario, id_tarefa){


    //if(trash){ return;}

    //const DONE = done ? CHECK : UNCHECK;
    //const LINE = done ? LINE_THROUGH : "";

    /*const item = `
            <div id="${id} item"class="item"draggable="true" ondragstart="dragStart(event)">
                <i class="fa ${DONE} co" job="complete" id="${id}" ></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
            </di>
    `;*/
    //console.log(parsedObject.userId);

    console.log(id_tarefa);
    if(parsedObject.userId == id_usuario){
    const item = `
            <div id="${id_tarefa} item"class="item"draggable="true" ondragstart="dragStart(event)">
                <p class="text">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id_tarefa}"></i>
            </di>
    `;
        const position = "beforeend";
        

    list.insertAdjacentHTML(position, item);

    }



}

//addToDo('fazer site');


// Adicionar um item a lista quando o usuario pressiona a tecla Enter

document.addEventListener("keyup", function(even){
    if(even.keyCode == 13){
        const toDo = input.value;
        // se o input não estiver vazio
        if(toDo){
            // adiciona tarefa na tela
            addToDo(toDo, id, false, false); 

            LIST.push({
                name: toDo,
                id : id,
                done : false,
                trash : false
            });

            // leva o item para o banco
            console.log(parsedObject.userId);
            enviarBD(parsedObject.userId, toDo);
            //localStorage.setItem("TODO", JSON.stringify(LIST));
            quant++
            id++;


                    }
        input.value = "";
        }


});


//  Função para a lista de tarefas completa

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Função para enviar a tarefa para o lixo

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    excluirBD(element.id);

    //LIST[element.id].trash = true;
    /*if(quant>1)
    {
        document.getElementsByClassName("dropper")[0].remove();
        location.reload();
    }
    quant--;*/    

}

// rastrear os itens criados

list.addEventListener("click", function(event){
    const element = event.target
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    } else if (elementJob == "delete"){
        removeToDo(element);
    }

    // adicionar item do localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));

});


function overAction(event){

    event.preventDefault();

}





