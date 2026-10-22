
import {
    emprestarLivro,
    devolverLivro,
    removerLivro
} from "./livros.js";

// MOSTRA A LISTA DE LIVROS NA PÁGINA
export function exibirLivros(listaLivros, elementos, atualizarLista, editarLivro) {
    const { divLivros, divMensagemNaoEncontrado } = elementos;

    const tamanhoLista = listaLivros.length - 1;

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

        const btnMais = document.createElement("button");
        btnMais.id = "btnTresPontos";

        const imgCategoria = document.createElement("img");
        imgCategoria.src = "img/tres-pontos.png";

        const categoria = document.createElement("p");
        categoria.textContent = livro.categoria.toUpperCase();
        categoria.classList.add("categoria-livro");

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

        const btnEmprestar = document.createElement("button");
        const imgEmprestar = document.createElement("img");
        imgEmprestar.src = "img/logo-livros.png";
        btnEmprestar.textContent = "Emprestar";
        btnEmprestar.classList.add("btn-emprestar");

        const btnDevolver = document.createElement("button");
        const imgDevolver = document.createElement("img");
        imgDevolver.src = "img/devolver.png";
        btnDevolver.textContent = "Devolver";
        btnDevolver.classList.add("btn-devolver");

        btnEmprestar.appendChild(imgEmprestar);
        btnDevolver.appendChild(imgDevolver);

        divCategoria.appendChild(categoria);
        divLivro.appendChild(divCategoria);

        divLivro.appendChild(imagem);
        divLivro.appendChild(titulo);
        divLivro.appendChild(autor);

        btnMais.appendChild(imgCategoria);
        divCategoria.appendChild(btnMais);

        divDisponibilidade.appendChild(disponivel);
        divLivro.appendChild(divDisponibilidade);

        if (livro.disponivel) {
            divLivro.appendChild(btnEmprestar);
        } else {
            divLivro.appendChild(btnDevolver);
        }

        divLivros.appendChild(divLivro);

        if (livro === listaLivros[tamanhoLista]) {
            const btnAddLivro = document.createElement("button");
            btnAddLivro.classList.add("btn-add-Livro");
            btnAddLivro.id = "btnAbrirCadastro";

            const imgMais = document.createElement("img");
            imgMais.src = "../img/icon-mais.png";

            const divAdd = document.createElement("div");
            divAdd.classList.add("div-btn-AddLivros");

            const textoAdd = document.createElement("p");
            textoAdd.textContent = "Adicionar novo livro";

            btnAddLivro.appendChild(imgMais);

            divAdd.appendChild(btnAddLivro);
            divAdd.appendChild(textoAdd);

            divLivros.appendChild(divAdd);

            btnAddLivro.addEventListener("click", () => {
                const modalCadastro = document.querySelector("#modalCadastro");
                modalCadastro.style.display = "flex";
                document.body.style.overflow = "hidden";
            });
        }

        btnMais.addEventListener("click", (evento) => {
            if (document.querySelector(".div-acoes")) return;

            const div = document.createElement("div");
            div.classList.add("div-acoes");

            const btnRemoverLivro = document.createElement("button");
            btnRemoverLivro.textContent = "Remover";
            btnRemoverLivro.dataset.id = livro.id;
            btnRemoverLivro.classList.add("btn-remover");

            const btnEditarLivro = document.createElement("button");
            btnEditarLivro.textContent = "Editar";
            btnEditarLivro.dataset.id = livro.id;
            btnEditarLivro.classList.add("btn-editar");

            div.appendChild(btnEditarLivro);
            div.appendChild(btnRemoverLivro);

            divLivro.appendChild(div);

            function fecharDiv(e) {
                if (div.contains(e.target)) return;

                div.remove();
                document.removeEventListener('click', fecharDiv);
            }

            setTimeout(() => {
                document.addEventListener('click', fecharDiv);
            }, 0);

            btnRemoverLivro.addEventListener("click", () => {
                const confirmacao = confirm("Tem certeza que deseja remover esse livro?");

                if (confirmacao) {
                    removerLivro(livro.id);
                    atualizarLista();
                }
            });

            btnEditarLivro.addEventListener("click", () => {
                editarLivro(livro);
            });
        });

        btnEmprestar.addEventListener("click", () => {
            if (livro.disponivel) {
                emprestarLivro(livro.id);
            } else {
                devolverLivro(livro.id);
            }

            atualizarLista();
        });

        btnDevolver.addEventListener("click", () => {
            if (livro.disponivel) {
                emprestarLivro(livro.id);
            } else {
                devolverLivro(livro.id);
            }

            atualizarLista();
        });
    });
}