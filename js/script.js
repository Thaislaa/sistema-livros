import { livros } from "./dados.js";

// FUNÇÃO DE LISTAR TODOS OS LIVROS
function listarLivros() {
    return livros.forEach(livro => {
        let disponibilidade = "Indisponível";
        if (livro.disponivel) {
            disponibilidade = "Disponível";
        }
        console.log(`${livro.titulo} - ${livro.autor} - ${livro.categoria} - ${disponibilidade}`);
    });
}

// FUNÇÃO DE LISTAR LIVROS DISPONÍVEIS
function listarLivrosDisponiveis() {
    const livrosDisponiveis = livros.filter(livro => livro.disponivel);
    return livrosDisponiveis;
}

// FUNÇÃO DE OBTER LIVRO POR ID
function obterLivroPorId(id) {
    const livro = livros.find(livro => livro.id === id);

    if (!livro) {
        console.log("Livro não encontrado.");
        return false;
    }

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
        console.log(livros[posicaoLivro]);
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

    if (livrosEncontrados.length === 0) {
        console.log("Nenhum livro com esse título foi encontrado.");
        return false;
    }

    return livrosEncontrados;
}

// FUNÇÃO DE BUSCAR LIVROS POR AUTOR
function buscarLivrosPorAutor(autor) {
    const livrosEncontrados = livros.filter(livro => livro.autor.toLowerCase().includes(autor.toLowerCase()));

    if (livrosEncontrados.length === 0) {
        console.log("Nenhum livro desse autor foi encontrado.");
        return false;
    }

    return livrosEncontrados;
}

// FUNÇÃO DE BUSCAR LIVROS POR CATEGORIAS
function buscarLivrosPorCategoria(categoria) {
    const livrosEncontrados = livros.filter(livro => livro.categoria.toLowerCase().includes(categoria.toLowerCase()));

    if (livrosEncontrados.length === 0) {
        console.log("Nenhum livro nessa categoria foi encontrado.");
        return false;
    }

    return livrosEncontrados;
}

const divLivros = document.querySelector(".livros");

livros.forEach(livro => {
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
});
