const button = document.querySelector('#adicionar');
const input = document.querySelector('#input');
const ul = document.querySelector('ul');

// ADICIONAR TAREFA CASO O USUÁRIO PRESSIONE "ENTER"
document.addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        if(!input.value) return;
        adicionarTarefa(input.value);
        input.value = '';
        input.focus();
    }
})

button.addEventListener('click', function(){
    if(!input.value) return;
    adicionarTarefa(input.value);
    input.value = '';
    input.focus();
});

// ADICIONAR TAREFA (QUANDO O USUÁRIO PRESSIONAR O BOTÃO - PADRÃO)
function adicionarTarefa(texto){
    const li = document.createElement('li');
    li.innerText = texto;
    ul.appendChild(li);
    criarBotaoDeletar(li);
    salvarTarefas();
}

// CRIA UM BOTÃO DE DELETE APÓS ADICIONAR UMA NOVA TAREFA
function criarBotaoDeletar(li){
    const btDeletar = document.createElement('button');
    btDeletar.innerText = 'X';
    btDeletar.setAttribute('class', 'deletar');
    li.appendChild(btDeletar);
}

// DELETAR UMA TAREFA
document.addEventListener('click', function(e){
    const elemento = e.target;
    if(elemento.classList.contains('deletar')){
        elemento.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas(){
    const liTarefas = ul.querySelectorAll('li');
    const tarefas = [];
    for (let tarefa of liTarefas){
        tarefas.push(tarefa.innerText.replace('\nX', ''));
    }
    const tarefasJson = JSON.stringify(tarefas);
    localStorage.setItem('tarefas', tarefasJson);;
}

function adicionarTarefasSalvas(){
    // CASO EXISTA UMA CHAVE 'tarefas' ADICIONE OS ITENS NA TELA EM FORMA DE TAREFAS
    if(localStorage.getItem('tarefas')){
        const tarefasSalvas = localStorage.getItem('tarefas');
        const listaDeTarefas = JSON.parse(tarefasSalvas);
        for(let tarefa of listaDeTarefas){
            adicionarTarefa(tarefa);
        }
    }  
}
adicionarTarefasSalvas();