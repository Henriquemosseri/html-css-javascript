document.addEventListener("DOMContentLoaded", buscarProdutos);

const API_URL = "http://demo8131881.mockable.io/produtos";
let listaCompleta = [];

document.getElementById("produtoForm").addEventListener("submit", function (event) {
    event.preventDefault();
    adicionarProduto();
});

function buscarProdutos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            listaCompleta = data;
            preencherTabela(listaCompleta);
        })
        .catch(error => console.error("Erro ao buscar os produtos:", error));
}

function adicionarProduto() {
    const nome = document.getElementById("nomeProduto").value;
    const marca = document.getElementById("marcaProduto").value;
    const preco = parseFloat(document.getElementById("precoProduto").value);

    if (!nome || !marca || isNaN(preco)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const novoProduto = { nome, marca, preco };


    fetch("http://demo8131881.mockable.io/cadastro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoProduto) 
    })
    .then(response => response.json())
    .then(data => {
        alert("Produto adicionado com sucesso!");
        listaCompleta.push(novoProduto); 
        preencherTabela(listaCompleta); 
    })
    .catch(error => {
        alert("Erro ao adicionar produto.");
        console.error("Erro ao adicionar produto:", error);
    });
}

function preencherTabela(listaProdutos) {
    const tbody = document.getElementById("tabela-produtos");
    tbody.innerHTML = "";

    for (let i = 0; i < listaProdutos.length; i++) {
        let produto = listaProdutos[i];

        let linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.marca}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>
                <button onclick="editarProduto(${i})">✏️</button>
                <button onclick="removerProduto(${i})">🗑️</button>
            </td>
        `;

        tbody.appendChild(linha);
    }
}

function preencherTabela(listaProdutos) {
    const tbody = document.getElementById("tabela-produtos");
    tbody.innerHTML = "";

    listaProdutos.forEach((produto, index) => {
        let linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.marca}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>
                <button onclick="editarProduto(${index})">✏️</button>
                <button onclick="removerProduto(${index})">🗑️</button>
            </td>
        `;
        tbody.appendChild(linha);
    });
}

function editarProduto(index) {
    const produto = listaCompleta[index];
    const novoNome = prompt("Novo nome:", produto.nome);
    const novaMarca = prompt("Nova marca:", produto.marca);
    const novoPreco = parseFloat(prompt("Novo preço:", produto.preco));

    if (novoNome && novaMarca && !isNaN(novoPreco)) {
        listaCompleta[index] = { nome: novoNome, marca: novaMarca, preco: novoPreco };
        preencherTabela(listaCompleta);
    } else {
        alert("Dados inválidos.");
    }
}

function removerProduto(index) {
    listaCompleta.splice(index, 1);
    preencherTabela(listaCompleta);
}

