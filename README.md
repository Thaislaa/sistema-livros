# 📚 Sistema de Livros

Aplicação web desenvolvida para organizar e gerenciar uma coleção de livros, permitindo cadastrar obras, consultar informações e controlar a disponibilidade para empréstimo.

O projeto foi desenvolvido com **HTML, CSS e JavaScript**, com foco na prática de desenvolvimento front-end, manipulação do DOM, organização do código em módulos e armazenamento de dados no navegador.

## ✨ Funcionalidades

- **Cadastro de livros:** adicione novos livros informando título, autor, categoria e URL da imagem da capa.
- **Edição de livros:** atualize as informações dos livros cadastrados.
- **Remoção de livros:** exclua livros da coleção.
- **Empréstimo e devolução:** altere a disponibilidade dos livros conforme sua situação.
- **Busca de livros:** encontre obras por informações como título e autor.
- **Filtros:** refine a exibição por categoria e disponibilidade.
- **Combinação de filtros:** utilize diferentes critérios de pesquisa simultaneamente.
- **Validação de dados:** verifique informações preenchidas no formulário antes de cadastrar ou editar um livro.
- **Armazenamento local:** mantenha os dados cadastrados no navegador utilizando `localStorage`.
- **Interface dinâmica:** visualize os livros em cards e utilize um modal para cadastrar ou editar informações.

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- JavaScript Modules (`import` e `export`)
- DOM API
- LocalStorage
- Git e GitHub

## 📁 Estrutura do projeto

```text
sistema-livros/
├── index.html
├── css/
│   └── style.css
├── img/
├── js/
│   ├── dados.js
│   ├── livros.js
│   ├── filtros.js
│   ├── interface.js
│   └── script.js
└── README.md
```

### Organização dos arquivos JavaScript

- **`dados.js`:** contém os dados iniciais dos livros.
- **`livros.js`:** concentra as operações de gerenciamento dos livros e o armazenamento local.
- **`filtros.js`:** reúne as funções de busca e filtragem.
- **`interface.js`:** cuida da criação e exibição dos elementos da interface.
- **`script.js`:** integra os módulos, os eventos da página, os filtros e as operações do formulário.

Essa divisão ajuda a manter o código organizado e facilita a manutenção e a evolução da aplicação.

## 💾 Armazenamento dos dados

Os livros são armazenados no `localStorage` do navegador, permitindo que os dados permaneçam disponíveis após atualizar ou fechar a página.

Como o armazenamento é local, os dados ficam vinculados ao navegador e à origem utilizada para acessar a aplicação. Eles não são sincronizados automaticamente entre dispositivos ou navegadores diferentes.

## 🎯 Objetivo do projeto

Este projeto faz parte da minha jornada de aprendizado em desenvolvimento web e tem como objetivo aplicar conceitos de HTML, CSS e JavaScript na construção de uma aplicação interativa.

Durante o desenvolvimento, foram praticados conceitos como:

- Manipulação do DOM e tratamento de eventos.
- Funções, arrays e objetos.
- Métodos de busca e filtragem de dados.
- Validação de formulários.
- Modularização do JavaScript.
- Persistência de dados com `localStorage`.
- Organização e versionamento do código com Git e GitHub.

## 🔗 Acesse o projeto

- **Demonstração online:** [Sistema de Livros](https://thaislaa.github.io/sistema-livros/)
- **Repositório:** [GitHub — Sistema de Livros](https://github.com/Thaislaa/sistema-livros)

**Desenvolvido por:** [Thaislaa](https://github.com/Thaislaa)
