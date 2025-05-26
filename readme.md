# Users API

Crud básico utilizando express para aprender conceitos de API REST.

## Rotas

1. **GET** **_/users_** - retorna todos os usuários

1. **POST** **_/users_** - cria um novo usuário

1. **PATCH** **_/users_** - edita parcialmente um usuário utilizando o id (email não pode ser alterado).

1. **DELETE** **_/users_** - deletar usuário utilizando o id.

## Arquitetura

### Banco de dados

Com o banco de dados em MongoDB criado através de um Docker Compose para ser executado em container.

### Repository

Utilizo repositories para se comunicar com o DB e extrair essa lógica dos controllers.

### Controllers

Utilizando o conceito do **Single Responsibility Principle** (SRP), cada endpoint tem seu controller específico para cada ação.

Seguindo o conceito do **Dependency Inversion Principle** (DIP), utilizo interfaces para injetar a dependência do repository dentro do controller, assim não dependo desse único repositório que mexe com o Mongo, caso queria trocar o banco de dados só criar outro repository que implemente a interface.

### Model

Criado uma interface para indicar a forma de como o objeto será guardado no banco de dados, fazendo com que o Typescript sabia quais propriedades acessar quando for manipular o dado nos repositories.
