import { livrosAtuais } from "./livros.js";

// FUNÇÃO DE LISTAR LIVROS DISPONÍVEIS
export function buscarLivrosDisponiveis() {
    return livrosAtuais.filter(livro => livro.disponivel);
}

// FUNÇÃO DE LISTAR LIVROS EMPRESTADOS
export function buscarLivrosEmprestados() {
    return livrosAtuais.filter(livro => livro.disponivel === false);
}

// FUNÇÃO DE BUSCAR LIVROS POR TÍTULO
export function buscarLivrosPorTitulo(titulo) {
    return livrosAtuais.filter(livro =>
        livro.titulo.toLowerCase().includes(titulo.toLowerCase())
    );
}

// FUNÇÃO DE BUSCAR LIVROS POR AUTOR
export function buscarLivrosPorAutor(autor) {
    return livrosAtuais.filter(livro =>
        livro.autor.toLowerCase().includes(autor.toLowerCase())
    );
}

// FUNÇÃO DE BUSCAR LIVROS POR CATEGORIA
export function buscarLivrosPorCategoria(categoria) {
    return livrosAtuais.filter(livro =>
        livro.categoria.toLowerCase().includes(categoria.toLowerCase())
    );
}

// FUNÇÃO DE BUSCAR LIVROS POR AUTOR OU TÍTULO
export function buscarLivros(texto) {
    const listaLivrosTitulo = buscarLivrosPorTitulo(texto);
    const listaLivrosAutor = buscarLivrosPorAutor(texto);

    const listaLivros = [...listaLivrosTitulo, ...listaLivrosAutor];

    return listaLivros.filter((livro, index) => {
        return listaLivros.findIndex(
            livroEncontrado => livroEncontrado.id === livro.id
        ) === index;
    });
}

// FUNÇÃO QUE BUSCA POR TEXTO E CATEGORIA
export function buscarLivrosTextoCategoria(texto, categoria) {
    const listaLivros = buscarLivros(texto);

    return listaLivros.filter(livro => livro.categoria === categoria);
}

// FUNÇÃO QUE BUSCA POR DISPONIBILIDADE, TEXTO E CATEGORIA
export function buscarLivrosDisponibilidadeTextoCategoria(
    disponibilidade,
    texto,
    categoria
) {
    const listaLivrosTexto = buscarLivros(texto);

    return listaLivrosTexto.filter(livro =>
        livro.disponivel === disponibilidade &&
        livro.categoria === categoria
    );
}

// FUNÇÃO QUE BUSCA POR DISPONIBILIDADE E CATEGORIA
export function buscarLivrosDisponibilidadeCategoria(
    disponibilidade,
    categoria
) {
    const listaLivrosCategoria = buscarLivrosPorCategoria(categoria);

    return listaLivrosCategoria.filter(
        livro => livro.disponivel === disponibilidade
    );
}

// FUNÇÃO QUE BUSCA LIVROS POR DISPONIBILIDADE E TEXTO
export function buscarLivrosDisponibilidadeTexto(
    disponibilidade,
    texto
) {
    const livrosTexto = buscarLivros(texto);

    return livrosTexto.filter(
        livro => livro.disponivel === disponibilidade
    );
}