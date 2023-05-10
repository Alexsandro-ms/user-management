# User Management
Api simples de gerenciamento de usuários com nivel de permissão.

#### Como executar o projeto
Para executar o projeto, siga os seguintes passos:

#### Clone este repositório em sua máquina:

```bash
git clone https://github.com/exemplo/chat-socket.io.git
```
1. Instale as dependências do projeto utilizando o npm:

```bash
npm install
```

2. Execute o comando:

```bash
docker compose up
```

3. Crie um arquivo .env, com uma secretKey:

SECRETKEY=`Sua key`

4. Execute o servidor com o seguinte comando:

```bash
 npm run dev ## ou yarn dev
```

#### Funcionamento da api

A api tem os seguintes endpoints:

router.get('/', HomeController.index);

router.get('/user', AdminAuth, UserController.index);

router.get('/user/:id', AdminAuth, UserController.findUser);

router.post('/user', UserController.create);

router.put('/user', UserController.edit);

router.delete('/user/:id', AdminAuth, UserController.remove);

router.post('/signin', UserController.signIn);

router.post('/recoverpassword', UserController.recoverPassword);

router.post('/changepassword', UserController.changePassword);

Cada um responsável por executar uma tarefa, taís como: criar, editar, remover e até buscar usuários.


#### Considerações finais

Este é um projeto bastante simples e pode ser utilizado como base para o desenvolvimento de varias outras apis, que necessitam de gerenciamento de usuários, como ecommerce, chats e etc...
