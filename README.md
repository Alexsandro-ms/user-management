# User Management
Api simples de gerenciamento de usuários com nivel de permissão.

#### Como executar o projeto
Para executar o projeto, siga os seguintes passos:

1. Clone este repositório em sua máquina:

```bash
https://github.com/Alexsandro-ms/user-management.git
```

2. Depois de clonar o repositório, navegue até a pasta do projeto.

```bash
cd user-management
```

3. Crie um arquivo .env na raiz do projeto e configure as variáveis de ambiente necessárias. Por exemplo:

`DB_HOST=localhost`
`DB_USER=root`
`DB_PASSWORD=my-secret-pw`
`DB_NAME=seu_banco_de_dados`
`SECRETKEY=sua_chave_secreta_para_jwt`

4. Agora, execute o seguinte comando para iniciar o contêiner Docker com o MySQL e a aplicação API:

```bash
docker-compose up
```

- Isso iniciará os contêineres Docker do MySQL e da aplicação API, conforme especificado no arquivo docker-compose.yml.
- Aguarde até que o contêiner do MySQL seja iniciado e o banco de dados seja criado.

5. Depois que o banco de dados for criado, mas antes de iniciar a aplicação API, você precisará executar o script SQL que cria a tabela no banco de dados.

```bash
docker exec -i seu_projeto_db_1 mysql -uroot -pmy-secret-pw seu_banco_de_dados < ./scripts/create-tables.sql
```

- Isso executará o script SQL que cria a tabela no banco de dados.

6. Agora, inicie a aplicação API com o seguinte comando:
```
npm start
```

Isso iniciará a aplicação API e permitirá que você acesse os endpoints da API.

#### Funcionamento da api

A api tem os seguintes endpoints:

`GET /user` - Lista todos os usuários, deve ter permissão de adm. Token deve ser passado via headers["authorization"].

`GET /user/:id` - Lista um usuário pelo seu id, deve ter permissão de adm. Token deve ser passado via headers["authorization"].

`POST /user` - Cria um usuário, deve-se passar name, email e password, por padrao a role é 0 (permissão default).

`PUT /user` - Edita um usuário, deve-se passar o campo a ser editado.

`DELETE /user/:id` - Deleta um usuário, deve-se passar o campo id como parâmetro.

`POST /signin` - Faz login de um usuário, deve-se passar os campos email e password no corpo da requisição.

`POST /recoverpassword` - Gera um token, que poderá ser usado para redefinir a senha, deve-se passar o campo de email no corpo da requisição.

`POST /changepassword` - Altera a senha de um usuário, que poderá ser usado para redefinir a senha, deve-se passar o campo de token e password ( A nova senha), no corpo da requisição.

#### Considerações finais

Este é um projeto bastante simples e pode ser utilizado como base para o desenvolvimento de varias outras apis, que necessitam de gerenciamento de usuários, como ecommerce, chats e etc...
