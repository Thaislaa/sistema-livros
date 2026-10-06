import { livros } from "./dados.js";

// FUNÇÃO DE LISTAR LIVROS DISPONÍVEIS
function buscarLivrosDisponiveis() {
    const livrosDisponiveis = livros.filter(livro => livro.disponivel);
    return livrosDisponiveis;
}

// FUNÇÃO DE LISTAR LIVROS EMPRESTADOS
function buscarLivrosEmprestados() {
    const livrosEmprestados = livros.filter(livro => livro.disponivel === false);
    return livrosEmprestados;
}

// FUNÇÃO DE OBTER LIVRO POR ID
function obterLivroPorId(id) {
    const livro = livros.find(livro => livro.id === id);

    return livro;
}

// FUNÇÃO DE OBTER LIVRO DISPONÍVEL POR ID
function obterLivroDisponivelPorId(id) {
    const livro = obterLivroPorId(id);

    if (!livro) {
        return false;
    }

    if (livro.disponivel === true) {
        return livro;
    } else if (livro.disponivel === false) {
        return false;
    }
}

// FUNÇÃO DE EMPRESTAR LIVRO
function emprestarLivro(id) {
    const livroDisponivel = obterLivroDisponivelPorId(id);

    if (livroDisponivel) {
        const posicaoLivro = livros.findIndex(livro => livro.id === id);
        livros[posicaoLivro].disponivel = false;
    }
}

// FUNÇÃO DE DEVOLVER LIVRO
function devolverLivro(id) {
    const posicaoLivro = livros.findIndex(livro => livro.id === id);

    if (posicaoLivro === -1) {
        return false;
    }

    if (livros[posicaoLivro].disponivel === true) {
        return false;
    }

    livros[posicaoLivro].disponivel = true;
}

// FUNÇÃO DE BUSCAR LIVROS POR TÍTULO
function buscarLivrosPorTitulo(titulo) {
    const livrosEncontrados = livros.filter(livro => livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
    return livrosEncontrados;
}

// FUNÇÃO DE BUSCAR LIVROS POR AUTOR
function buscarLivrosPorAutor(autor) {
    const livrosEncontrados = livros.filter(livro => livro.autor.toLowerCase().includes(autor.toLowerCase()));

    return livrosEncontrados;
}

// FUNÇÃO DE BUSCAR LIVROS POR CATEGORIAS
function buscarLivrosPorCategoria(categoria) {
    const livrosEncontrados = livros.filter(livro => livro.categoria.toLowerCase().includes(categoria.toLowerCase()));

    return livrosEncontrados;
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

    const listaLivrosFiltrados = [];

    listaLivros.forEach(livro => {
        if (livro.categoria === categoria) {
            listaLivrosFiltrados.push(livro);
        }
    });

    return listaLivrosFiltrados;
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
        if (livro.disponivel === true) {
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

        divLivro.appendChild(btnAcaoLivro);

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
            if (btnAcaoLivro.textContent === "Emprestar") {
                emprestarLivro(Number(btnAcaoLivro.dataset.id));
            } else if (btnAcaoLivro.textContent === "Devolver") {
                devolverLivro(Number(btnAcaoLivro.dataset.id));
            }

            verificaFiltrosDePesquisa();
        });
    });
}

// FUNÇÃO QUE BUSCA LIVROS POR DISPONIBILIDADE, POR TEXTO E CATEGORIA
function buscarLivrosDisponibilidadeTextoCategoria(disponibilidade) {
    const listarLivrosTexto = buscarLivros(txtBusca.value);

    let lista = [];

    listarLivrosTexto.forEach(livro => {
        if (livro.disponivel === disponibilidade && livro.categoria === selectCategoria.value) {
            lista.push(livro);
        }
    });

    return lista;
}

// FUNÇÃO QUE BUSCA LIVROS POR DISPONIBILIDADE E CATEGORIA
function buscarLivrosDisponibilidadeCategoria(disponibilidade) {
    const listaLivrosCategoria = buscarLivrosPorCategoria(selectCategoria.value);

    const lista = [];

    listaLivrosCategoria.forEach(livro => {
        if (livro.disponivel === disponibilidade) {
            lista.push(livro)
        }
    });

    return lista;
}

// FUNÇÃO QUE BUSCA LIVROS DISPONÍVEIS E POR TEXTO
function buscarLivrosDisponibilidadeTexto(disponibilidade) {
    const livrosTexto = buscarLivros(txtBusca.value)

    const lista = [];

    livrosTexto.forEach(livro => {
        if (livro.disponivel === disponibilidade) {
            lista.push(livro);
        }
    });

    return lista;
}

// FUNÇÃO QUE VERIFICA FILTROS DE PESQUISA
function verificaFiltrosDePesquisa() {
    if (selectCategoria.value === "" && txtBusca.value.trim() === "" && selectDisponibilidade.value === "") {
        listaAtual = livros;
    } else if (selectCategoria.value === "" && txtBusca.value.trim() !== "" && selectDisponibilidade.value === "") {
        listaAtual = buscarLivros(txtBusca.value);
    } else if (selectCategoria.value !== "" && txtBusca.value.trim() === "" && selectDisponibilidade.value === "") {
        listaAtual = buscarLivrosPorCategoria(selectCategoria.value);
    } else if (selectCategoria.value !== "" && txtBusca.value.trim() !== "" && selectDisponibilidade.value === "") {
        listaAtual = buscarLivrosTextoCategoria(txtBusca.value, selectCategoria.value);
    } else if (selectDisponibilidade.value === "true" && selectCategoria.value === "" && txtBusca.value.trim() === "") {
        listaAtual = buscarLivrosDisponiveis();
    } else if (selectDisponibilidade.value === "false" && selectCategoria.value === "" && txtBusca.value.trim() === "") {
        listaAtual = buscarLivrosEmprestados();
    } else if (selectDisponibilidade.value === "true" && selectCategoria.value !== "" && txtBusca.value.trim() === "") {
        listaAtual = buscarLivrosDisponibilidadeCategoria(true);
    } else if (selectDisponibilidade.value === "false" && selectCategoria.value !== "" && txtBusca.value.trim() === "") {
        listaAtual = buscarLivrosDisponibilidadeCategoria(false);
    } else if (selectDisponibilidade.value === "true" && selectCategoria.value === "" && txtBusca.value.trim() !== "") {
        listaAtual = buscarLivrosDisponibilidadeTexto(true);
    } else if (selectDisponibilidade.value === "false" && selectCategoria.value === "" && txtBusca.value.trim() !== "") {
        listaAtual = buscarLivrosDisponibilidadeTexto(false);
    } else if (selectDisponibilidade.value === "true" && selectCategoria.value !== "" && txtBusca.value.trim() !== "") {
        listaAtual = buscarLivrosDisponibilidadeTextoCategoria(true);
    } else if (selectDisponibilidade.value === "false" && selectCategoria.value !== "" && txtBusca.value.trim() !== "") {
        listaAtual = buscarLivrosDisponibilidadeTextoCategoria(false);
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
let listaAtual = livros;
const btnLimparFiltros = document.querySelector("#btnLimparFiltros");
const selectDisponibilidade = document.querySelector("#selectDisponibilidade");

exibirLivros(livros);

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