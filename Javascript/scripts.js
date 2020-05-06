


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

let LIST = [], id = 0;

// pegar item do localstorage

let data = localStorage.getItem("TODO");

// checar se a data não esta vazia
if(data){
    LIST = JSON.parse(data);
    id = LIST.length
    loadList(LIST);
}else{

    LIST = [];
    id = 0;
}

// carregar os itens para a inteface do usuario
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//  limpar o localStorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();

});




// Mostrar a data

const options ={ weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("pt-BR", options); // define o tipo da data, o idioma


// função da lista de tarefas

function addToDo(toDo, id, done, trash){


    if(trash){ return;}

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
            <li class="item">
                <i class="fa ${DONE} co" job="complete" id="${id}" ></i>
                <p class="text ${LINE}">${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
            </li>
    
    `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);


}

//addToDo('fazer site');


// Adicionar um item a lista quando o usuario pressiona a tecla Enter

document.addEventListener("keyup", function(even){
    if(even.keyCode == 13){
        const toDo = input.value;
        // se o input não estiver vazio
        if(toDo){
            addToDo(toDo, id, false, false); 

            LIST.push({
                name: toDo,
                id : id,
                done : false,
                trash : false
            });

            // adicionar item do localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));




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

    LIST[element.id].trash = true;

}

// rastrear os itens criados

list.addEventListener("click", function(event){
    const element = event.target; 
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);
    } else if (elementJob == "delete"){
        removeToDo(element);
    }

    // adicionar item do localstorage
localStorage.setItem("TODO", JSON.stringify(LIST));

});