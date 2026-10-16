
import {
    emprestarLivro,
    devolverLivro,
    removerLivro
} from "./livros.js";

// MOSTRA A LISTA DE LIVROS NA PÁGINA
export function exibirLivros(listaLivros, elementos, atualizarLista, editarLivro) {
    const { divLivros, divMensagemNaoEncontrado } = elementos;

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
        divDisponibilidade.className = "div-disponibilidade";

        const disponivel = document.createElement("p");

        if (livro.disponivel) {
            disponivel.innerHTML = "<span class='bolinha'>&bull;</span> Disponível";
            disponivel.className = "p-disponivel";
        } else {
            disponivel.innerHTML = "<span class='bolinha'>&bull;</span> Indisponível";
            disponivel.className = "p-indisponivel";
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

        divDisponibilidade.appendChild(disponivel);
        divLivro.appendChild(divDisponibilidade);

        divLivros.appendChild(divLivro);

        btnAcaoLivro.addEventListener("click", () => {
            if (livro.disponivel) {
                emprestarLivro(livro.id);
            } else {
                devolverLivro(livro.id);
            }

            atualizarLista();
        });

        btnRemoverLivro.addEventListener("click", () => {
            const confirmacao = confirm(
                "Tem certeza que deseja remover esse livro?"
            );

            if (confirmacao) {
                removerLivro(livro.id);
                atualizarLista();
            }
        });

        btnEditarLivro.addEventListener("click", () => {
            editarLivro(livro);
        });
    });
}