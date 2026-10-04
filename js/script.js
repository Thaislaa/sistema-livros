import { livros } from "./dados.js";

// FUNÇÃO DE LISTAR LIVROS DISPONÍVEIS
function listarLivrosDisponiveis() {
    const livrosDisponiveis = livros.filter(livro => livro.disponivel);
    return livrosDisponiveis;
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
        console.log("Livro não disponível");
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
        console.log("Livro não encontrado.");
        return false;
    }

    if (livros[posicaoLivro].disponivel === true) {
        console.log("O livro não pode ser devolvido pois ele está disponível.");
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

        const btnEmprestar = document.createElement("button");
        btnEmprestar.textContent = "Emprestar";
        btnEmprestar.dataset.id = livro.id;
        btnEmprestar.classList.add("btn-emprestar");

        if (!livro.disponivel) {
            btnEmprestar.style.display = "none";
        }

        divLivro.appendChild(btnEmprestar);

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

        btnEmprestar.addEventListener("click", () => {
            emprestarLivro(Number(btnEmprestar.dataset.id));
            exibirLivros(livros);
        });
    });
}

const divLivros = document.querySelector(".livros");
const divMensagemNaoEncontrado = document.querySelector(".div-mensagem-nao-encontrado");
const txtBusca = document.querySelector("#txtBusca");
const selectCategoria = document.querySelector("#selectCategoria");

exibirLivros(livros);

txtBusca.addEventListener("input", () => {

    if (txtBusca.value.trim() === "") {
        exibirLivros(livros);
    } else {
        const novaLista = buscarLivros(txtBusca.value);

        exibirLivros(novaLista);

        if (novaLista.length === 0) {
            const mensagem = document.createElement("p");
            mensagem.textContent = "Nenhum livro foi encontrado.";

            divMensagemNaoEncontrado.appendChild(mensagem);
        }

    }
});

selectCategoria.addEventListener("change", () => {
    if (selectCategoria.value === "") {
        exibirLivros(livros);
    } else {
        const novaLista = buscarLivrosPorCategoria(selectCategoria.value);

        exibirLivros(novaLista);
    }
});