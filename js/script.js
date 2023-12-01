// Função para adicionar um novo item à lista e armazenar no localStorage
function adicionarItem(nome, email, telefone, mensagem) {
    var novoItem = {
        nome: nome,
        email: email,
        telefone: telefone,
        mensagem: mensagem
    };

    var listaItens = JSON.parse(localStorage.getItem('listaItens')) || [];
    listaItens.push(novoItem);
    localStorage.setItem('listaItens', JSON.stringify(listaItens));
    renderizarLista();
}

function renderizarLista() {
    var listaItensElement = document.getElementById('listaItens');
    listaItensElement.innerHTML = '';

    var termo = document.getElementById('campoPesquisa').value.toLowerCase();
    var lista = JSON.parse(localStorage.getItem('listaItens')) || [];
    var resultadosPesquisa = lista.filter(function (item) {
        return item.nome.toLowerCase().includes(termo);
    });

    resultadosPesquisa.forEach(function (item, index) {
        var listItem = document.createElement('li');
        var itemText = document.createTextNode(item.nome + ' - ' + item.email + ' - ' + item.telefone + ' - ' + item.mensagem);
        
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        
        deleteButton.onclick = function() {
            excluirItem(index);
        };

        listItem.appendChild(itemText);
        listItem.appendChild(deleteButton);
        listaItensElement.appendChild(listItem);
        
    });
}


// Função para pesquisar itens na lista
function pesquisarCampo() {
    renderizarLista();
}

// Função para excluir um item específico da lista
function excluirItem(index) {
    var listaItens = JSON.parse(localStorage.getItem('listaItens')) || [];

    if (index >= 0 && index < listaItens.length) {
        listaItens.splice(index, 1);
        localStorage.setItem('listaItens', JSON.stringify(listaItens));
        renderizarLista();
    } else {
        alert('Índice inválido.');
    }
}

// Função para excluir todos os itens da lista e atualizar o localStorage
function excluirTodosItens() {
    localStorage.removeItem('listaItens');
    renderizarLista();
}

// Event listener para o formulário de cadastro
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var mensagem = document.getElementById('mensagem').value;

    adicionarItem(nome, email, telefone, mensagem);

    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('mensagem').value = '';
});

// Renderiza a lista ao carregar a página
window.onload = function () {
    renderizarLista();
};
