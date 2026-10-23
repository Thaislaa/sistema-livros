import {
    livrosAtuais,
    obterLivroPorId,
    salvarLivros
} from "./livros.js";

import { buscarLivros } from "./filtros.js";
import { exibirLivros } from "./interface.js";

// ELEMENTOS DA PÁGINA
const divLivros = document.querySelector(".livros");
const divMensagemNaoEncontrado = document.querySelector(
    ".div-mensagem-nao-encontrado"
);
const txtBusca = document.querySelector("#txtBusca");
const selectCategoria = document.querySelector("#selectCategoria");
const btnLimparFiltros = document.querySelector("#btnLimparFiltros");
const selectDisponibilidade = document.querySelector("#selectDisponibilidade");

const form = document.querySelector("form");
const titulo = document.querySelector("#titulo");
const autor = document.querySelector("#autor");
const categoria = document.querySelector("#categoria");
const imagem = document.querySelector("#urlImagem");

const btnFecharForm = document.querySelector("#btn-fechar-form");

const elementosInterface = {
    divLivros,
    divMensagemNaoEncontrado
};

let listaAtual = livrosAtuais;
let idLivroEmEdicao = null;

// MOSTRA OS LIVROS E ATUALIZA OS FILTROS
function verificaFiltrosDePesquisa() {
    const categoriaSelecionada = selectCategoria.value;
    const texto = txtBusca.value.trim();
    const disponibilidade = selectDisponibilidade.value;

    listaAtual = livrosAtuais;

    if (texto !== "") {
        listaAtual = buscarLivros(texto);
    }

    if (categoriaSelecionada !== "") {
        listaAtual = listaAtual.filter(
            livro => livro.categoria === categoriaSelecionada
        );
    }

    if (disponibilidade !== "") {
        listaAtual = listaAtual.filter(
            livro => livro.disponivel === (disponibilidade === "true")
        );
    }

    exibirLivros(
        listaAtual,
        elementosInterface,
        verificaFiltrosDePesquisa,
        iniciarEdicao
    );

    if (listaAtual.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum livro foi encontrado.";
        divMensagemNaoEncontrado.appendChild(mensagem);
    }
}

// PREENCHE O FORMULÁRIO PARA EDITAR UM LIVRO
function iniciarEdicao(livro) {
    idLivroEmEdicao = livro.id;

    document.querySelector(".title-cadastro").textContent = "Editar livro";

    const modalCadastro = document.querySelector("#modalCadastro");
    modalCadastro.style.display = "flex";
    document.body.style.overflow = "hidden";

    titulo.value = livro.titulo;
    autor.value = livro.autor;
    categoria.value = livro.categoria;
    imagem.value = livro.imagem;

}

// LIMPA O ESTADO DE EDIÇÃO
function finalizarEdicao() {
    idLivroEmEdicao = null;
    document.querySelector(".title-cadastro").textContent = "Cadastrar livro";

    const modalCadastro = document.querySelector("#modalCadastro");
    modalCadastro.style.display = "none";
    document.body.style.overflow = "";
}

// EXIBE OS LIVROS INICIALMENTE
verificaFiltrosDePesquisa();

// EVENTOS DOS FILTROS
txtBusca.addEventListener("input", verificaFiltrosDePesquisa);
selectCategoria.addEventListener("change", verificaFiltrosDePesquisa);
selectDisponibilidade.addEventListener("change", verificaFiltrosDePesquisa);

btnLimparFiltros.addEventListener("click", () => {
    txtBusca.value = "";
    selectCategoria.value = "";
    selectDisponibilidade.value = "";

    verificaFiltrosDePesquisa();
});

btnFecharForm.addEventListener("click", () => {
    form.reset();
    finalizarEdicao();
});

// CADASTRAR E EDITAR LIVROS
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const tituloLivro = titulo.value.trim();
    const autorLivro = autor.value.trim();
    const categoriaLivro = categoria.value;
    const imagemLivro = imagem.value;

    if (tituloLivro.length < 3) {
        alert("O título deve ter pelo menos 3 caracteres.");
        return;
    }

    const livroEncontrado = livrosAtuais.some(
        livro =>
            livro.id !== idLivroEmEdicao &&
            livro.titulo.toLowerCase() === tituloLivro.toLowerCase()
    );

    if (livroEncontrado) {
        alert("Não é possível adicionar esse livro. Ele já existe.");
        return;
    }

    if (autorLivro.length < 3) {
        alert("O campo nome do autor deve ter pelo menos 3 caracteres.");
        return;
    }

    const numeros = "0123456789";

    for (const letra of autorLivro) {
        if (numeros.includes(letra)) {
            alert("Nome do autor não pode ter números.");
            return;
        }
    }

    if (idLivroEmEdicao !== null) {
        const livroEncontrado = obterLivroPorId(idLivroEmEdicao);

        if (!livroEncontrado) {
            alert("Livro não encontrado.");
            return;
        }

        livroEncontrado.titulo = tituloLivro;
        livroEncontrado.autor = autorLivro;
        livroEncontrado.categoria = categoriaLivro;
        livroEncontrado.imagem = imagemLivro;

        salvarLivros();
        finalizarEdicao();
    } else {
        const idsLivros = livrosAtuais.map(livro => livro.id);
        const maiorId = idsLivros.length > 0 ? Math.max(...idsLivros) : 0;

        const novoLivro = {
            id: maiorId + 1,
            titulo: tituloLivro,
            autor: autorLivro,
            categoria: categoriaLivro,
            disponivel: true,
            imagem: imagemLivro
        };

        livrosAtuais.push(novoLivro);
        salvarLivros();
        finalizarEdicao();
    }

    form.reset();
    verificaFiltrosDePesquisa();
});