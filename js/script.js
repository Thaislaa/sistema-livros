import { livros } from "./dados.js";

// LISTA TODOS OS LIVROS
livros.forEach(livro => {
    let disponibilidade = "Indisponível";
    if (livro.disponivel) {
        disponibilidade = "Disponível";
    }
    console.log(`${livro.titulo} - ${livro.autor} - ${livro.categoria} - ${disponibilidade}`);
});