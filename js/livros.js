import { livros } from "./dados.js";

export let livrosAtuais = JSON.parse(localStorage.getItem("livros")) || livros;

export function obterLivroPorId(id) {
    return livrosAtuais.find(livro => livro.id === id);
}

export function obterLivroDisponivelPorId(id) {
    const livro = obterLivroPorId(id);

    if (livro && livro.disponivel) {
        return livro;
    }

    return null;
}

export function emprestarLivro(id) {
    const livro = obterLivroDisponivelPorId(id);

    if (!livro) {
        return false;
    }

    livro.disponivel = false;
    salvarLivros();

    return true;
}

export function devolverLivro(id) {
    const livro = obterLivroPorId(id);

    if (!livro || livro.disponivel) {
        return false;
    }

    livro.disponivel = true;
    salvarLivros();

    return true;
}

export function removerLivro(id) {
    const livro = obterLivroPorId(id);

    if (!livro) {
        return false;
    }

    livrosAtuais = livrosAtuais.filter(livro => livro.id !== id);
    salvarLivros();

    return true;
}

export function salvarLivros() {
    localStorage.setItem("livros", JSON.stringify(livrosAtuais));
}