import {
    livrosAtuais,
    obterLivroPorId,
    emprestarLivro,
    devolverLivro,
    removerLivro,
    salvarLivros
} from "./livros.js";

// FUNÇÃO DE LISTAR LIVROS DISPONÍVEIS
function buscarLivrosDisponiveis() {
    return livrosAtuais.filter(livro => livro.disponivel);
}

// FUNÇÃO DE LISTAR LIVROS EMPRESTADOS
function buscarLivrosEmprestados() {
    return livrosAtuais.filter(livro => livro.disponivel === false);
}

// FUNÇÃO DE BUSCAR LIVROS POR TÍTULO
function buscarLivrosPorTitulo(titulo) {
    return livrosAtuais.filter(livro => livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
}

// FUNÇÃO DE BUSCAR LIVROS POR AUTOR
function buscarLivrosPorAutor(autor) {
    return livrosAtuais.filter(livro => livro.autor.toLowerCase().includes(autor.toLowerCase()));
}

// FUNÇÃO DE BUSCAR LIVROS POR CATEGORIAS
function buscarLivrosPorCategoria(categoria) {
    return livrosAtuais.filter(livro => livro.categoria.toLowerCase().includes(categoria.toLowerCase()));
}

// FUNÇÃO DE BUSCAR LIVROS POR AUTOR OU TÍTULO
function buscarLivros(texto) {
    const listaLivrosTitulo = buscarLivrosPorTitulo(texto);
    const listaLivrosAutor = buscarLivrosPorAutor(texto);

    const listaLivros = [...listaLivrosTitulo, ...listaLivrosAutor];

    const listaLivrosSemDuplicados = listaLivros.filter((livro, index) => {
        return listaLivros.findIndex(livroEncontrado => livroEncontrado.id === livro.id) === index;
    });

    return listaLivrosSemDuplicados;
}

// FUNÇÃO QUE BUSCA POR TEXTO (TÍTULO E AUTOR) E CATEGORIA 
function buscarLivrosTextoCategoria(texto, categoria) {
    const listaLivros = buscarLivros(texto);

    return listaLivros.filter(livro => livro.categoria === categoria);
}

// FUNÇÃO QUE BUSCA LIVROS POR DISPONIBILIDADE, POR TEXTO E CATEGORIA
function buscarLivrosDisponibilidadeTextoCategoria(disponibilidade) {
    const listarLivrosTexto = buscarLivros(txtBusca.value);

    return listarLivrosTexto.filter(livro =>
        livro.disponivel === disponibilidade &&
        livro.categoria === selectCategoria.value
    );
}

// FUNÇÃO QUE BUSCA LIVROS POR DISPONIBILIDADE E CATEGORIA
function buscarLivrosDisponibilidadeCategoria(disponibilidade) {
    const listaLivrosCategoria = buscarLivrosPorCategoria(selectCategoria.value);

    return listaLivrosCategoria.filter(livro => livro.disponivel === disponibilidade);
}

// FUNÇÃO QUE BUSCA LIVROS DISPONÍVEIS E POR TEXTO
function buscarLivrosDisponibilidadeTexto(disponibilidade) {
    const livrosTexto = buscarLivros(txtBusca.value);

    return livrosTexto.filter(livro => livro.disponivel === disponibilidade);
}

// FUNÇÃO QUE MOSTRA A LISTA DE LIVROS NA PÁGINA
function exibirLivros(listaLivros) {
    divLivros.innerHTML = "";

    divMensagemNaoEncontrado.innerHTML = "";

    listaLivros.forEach(livro => {
        const divLivro = document.createElement("div");
        divLivro.className = "card";

        const titulo = document.createElement("h2");
        titulo.textContent = livro.titulo;

        const autor = document.createElement("p");
        autor.textContent = livro.autor;

        const divCategoria = document.createElement("div");
        divCategoria.className = "div-categoria";

        const imgCategoria = document.createElement("img");
        imgCategoria.src = "img/icon-livro.png";

        const categoria = document.createElement("p");
        categoria.textContent = livro.categoria;

        const divDisponibilidade = document.createElement("div");
        divDisponibilidade.className = "div-disponibilidade"

        const disponivel = document.createElement("p");
        if (livro.disponivel) {
            disponivel.innerHTML = "<span class='bolinha'>&bull;</span> Disponível";
            disponivel.className = "p-disponivel";
        } else {
            disponivel.innerHTML = "<span class='bolinha'>&bull;</span> Indisponível";
            disponivel.className = "p-indisponivel"
        }

        const imagem = document.createElement("img");
        imagem.src = livro.imagem;
        imagem.alt = livro.titulo;

        const hr = document.createElement("hr");

        const btnAcaoLivro = document.createElement("button");
        btnAcaoLivro.textContent = livro.disponivel ? "Emprestar" : "Devolver";
        btnAcaoLivro.dataset.id = livro.id;
        btnAcaoLivro.classList.add("btn-emprestar");

        const btnRemoverLivro = document.createElement("button");
        btnRemoverLivro.textContent = "Remover";
        btnRemoverLivro.dataset.id = livro.id;
        btnRemoverLivro.classList.add("btn-remover");

        const btnEditarLivro = document.createElement("button");
        btnEditarLivro.textContent = "Editar";
        btnEditarLivro.dataset.id = livro.id;
        btnEditarLivro.classList.add("btn-editar");

        divLivro.appendChild(btnAcaoLivro);

        if (livro.disponivel) {
            divLivro.appendChild(btnRemoverLivro);
        }

        divLivro.appendChild(btnEditarLivro);

        divLivro.appendChild(imagem);
        divLivro.appendChild(titulo);
        divLivro.appendChild(autor);

        divCategoria.appendChild(imgCategoria);
        divCategoria.appendChild(categoria);

        divLivro.appendChild(divCategoria);

        divLivro.appendChild(hr);

        divDisponibilidade.appendChild(disponivel)

        divLivro.appendChild(divDisponibilidade);

        divLivros.appendChild(divLivro);

        btnAcaoLivro.addEventListener("click", () => {
            if (livro.disponivel) {
                emprestarLivro(livro.id);
            } else {
                devolverLivro(livro.id);
            }

            verificaFiltrosDePesquisa();
        });

        btnRemoverLivro.addEventListener("click", () => {
            const confirmacao = confirm("Tem certeza que deseja remover esse livro?");

            if (confirmacao) {
                removerLivro(livro.id);

                verificaFiltrosDePesquisa();
            }
        });

        btnEditarLivro.addEventListener("click", () => {
            idLivroEmEdicao = livro.id;

            const titleCadastro = document.querySelector(".title-cadastro");
            titleCadastro.textContent = "Editar livro";

            const titulo = document.querySelector("#titulo");
            titulo.value = livro.titulo;

            const autor = document.querySelector("#autor");
            autor.value = livro.autor;

            const categoria = document.querySelector("#categoria");
            categoria.value = livro.categoria;

            const urlImagem = document.querySelector("#urlImagem");
            urlImagem.value = livro.imagem;
        })
    });
}

// FUNÇÃO QUE VERIFICA FILTROS DE PESQUISA
function verificaFiltrosDePesquisa() {
    const categoria = selectCategoria.value;
    const texto = txtBusca.value.trim();
    const disponibilidade = selectDisponibilidade.value;

    listaAtual = livrosAtuais;

    if (texto !== "") {
        listaAtual = buscarLivros(texto);
    }

    if (categoria !== "") {
        listaAtual = listaAtual.filter(livro =>
            livro.categoria === categoria
        );
    }

    if (disponibilidade !== "") {
        listaAtual = listaAtual.filter(livro =>
            livro.disponivel === (disponibilidade === "true")
        );
    }

    exibirLivros(listaAtual);

    if (listaAtual.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhum livro foi encontrado.";

        divMensagemNaoEncontrado.appendChild(mensagem);
    }
}

const divLivros = document.querySelector(".livros");
const divMensagemNaoEncontrado = document.querySelector(".div-mensagem-nao-encontrado");
const txtBusca = document.querySelector("#txtBusca");
const selectCategoria = document.querySelector("#selectCategoria");
let listaAtual = livrosAtuais;
const btnLimparFiltros = document.querySelector("#btnLimparFiltros");
const selectDisponibilidade = document.querySelector("#selectDisponibilidade");

const form = document.querySelector("form");
const titulo = document.querySelector("#titulo");
const autor = document.querySelector("#autor");
const categoria = document.querySelector("#categoria");
const imagem = document.querySelector("#urlImagem");
const formulario = document.querySelector(".formulario");
let idLivroEmEdicao = null;

exibirLivros(livrosAtuais);

txtBusca.addEventListener("input", () => {
    verificaFiltrosDePesquisa();
});

selectCategoria.addEventListener("change", () => {
    verificaFiltrosDePesquisa();
});

btnLimparFiltros.addEventListener("click", () => {
    txtBusca.value = "";
    selectCategoria.value = "";
    selectDisponibilidade.value = "";
    verificaFiltrosDePesquisa();
});

selectDisponibilidade.addEventListener("change", () => {
    verificaFiltrosDePesquisa();
});

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
        livro => livro.id !== idLivroEmEdicao &&
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

        livroEncontrado.titulo = tituloLivro;
        livroEncontrado.autor = autorLivro;
        livroEncontrado.categoria = categoriaLivro;
        livroEncontrado.imagem = imagemLivro;

        salvarLivros();

        verificaFiltrosDePesquisa();
        form.reset();
        idLivroEmEdicao = null;
        document.querySelector(".title-cadastro").textContent = "Cadastrar livro";
        return;
    }

    const idsLivros = livrosAtuais.map(livro => livro.id);
    const maiorId = idsLivros.length > 0 ? Math.max(...idsLivros) : 0;
    const proximoId = maiorId + 1;

    const novoLivro = {
        id: proximoId,
        titulo: tituloLivro,
        autor: autorLivro,
        categoria: categoriaLivro,
        disponivel: true,
        imagem: imagemLivro
    }

    livrosAtuais.push(novoLivro);
    salvarLivros();

    exibirLivros(livrosAtuais);

    form.reset();
});
