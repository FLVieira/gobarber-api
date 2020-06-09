<h1 align="center">
<img src="logo-purple.svg" width="180"/>

<br />
<br />
GoBarber 
</h1>

<p align="center">
  <a href="#tecnologias-utilizadas">Tecnologias utilizadas</a> |
  <a href="#como-usar">Como Usar</a> |
  <a href="#rotas">Rotas</a>
</p>

Este é o backend de um projeto criado durante os módulos 8, 9 e 10 no Bootcamp da Rocketseat. Nele desenvolvemos um serviço apelidado de GoBarber onde os usuários podem se cadastrar como prestador de serviços na [aplicação web](https://github.com/FLVieira/gobarber-front) feita em ReactJS, e outros usuários podem agendar horário com estes prestadores através do [aplicativo](https://github.com/FLVieira/gobarber-mobile) desenvolvido em React-native, sendo toda a lógica gerenciada por esta api desenvolvida em NodeJS.

## Tecnologias utilizadas

- [sentry/node](https://github.com/getsentry/sentry-javascript/tree/master/packages/node)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md)
- [bee-queue](https://github.com/bee-queue/bee-queue)
- [cors](https://github.com/expressjs/cors)
- [date-fns](https://github.com/date-fns/date-fns)
- [dotenv](https://github.com/motdotla/dotenv)
- [express](https://github.com/expressjs/express)
- [express-async-errors](https://github.com/davidbanham/express-async-errors)
- [express-handlebars](https://github.com/ericf/express-handlebars)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [mongoose](https://github.com/Automattic/mongoose)
- [multer](https://github.com/expressjs/multer)
- [nodemailer](https://github.com/nodemailer/nodemailer)
- [nodemailer-express-handlebars](https://github.com/yads/nodemailer-express-handlebars)
- [pg](https://github.com/brianc/node-postgres)
- [pg-hstore](https://github.com/scarney81/pg-hstore)
- [sequelize](https://github.com/sequelize/sequelize)
- [sequelize-cli](https://github.com/sequelize/cli)
- [youch](https://github.com/poppinss/youch)
- [yup](https://github.com/jquense/yup)

## Instalação

1. git clone https://github.com/FLVieira/gobarber-api.git
2. cd gobarber-api

#### Pré-requisitos:

Ferramentas -

- Yarn/Npm
- Docker

Serviços -

- Postgres
- Redis
- Mongodb

#### Configurando as variavéis de ambiente

1. Renomeie o arquivo '.env_example' para '.env' e substitua as informações de configuração conforme explicado nos passos seguintes

2. É necessário ter uma instância de banco de dados postgres rodando e a partir dela criar uma base de dados com um nome qualquer, adicionando então, estes dados ao arquivo de configuração

> \$ docker run --name gobarber-postgres -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres

```
# Database
DB=
DB_HOST=
DB_PORT=
DB_USER=
DB_USERNAME=
DB_PASSWORD=
```

4. Devemos instânciar também o redis e o mongodb, e alterar os dados no arquivo .env

> \$ docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine

> \$ docker run --name gobarber-mongo r -p 27017:27017 -d -t mongo

```
MONGO_URL=mongodb://localhost:27017/gobarber
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

5. Para simular o envio de emails utilizamos o serviço [mailtrap.io](https://mailtrap.io). Crie uma conta e coloque os dados fornecidos por eles nas linhas abaixo do arquivo .env

```
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
```

#### Iniciado a aplicação

Depois de configurada as variavéis de ambiente e, tendo o postgres, o mongodb e o redis rodando podemos iniciar a api

1. Rodamos o comando yarn para fazer a instalação das dependências passadas no package.json

   > yarn

2. Executamos as migrations para criar as tabelas no banco de dados

   > yarn sequelize db:migrate

3. Rodamos a aplicação da api

   > yarn dev

4. Rodamos a aplicação da fila

   > yarn queue

## Rotas

Se tudo ocorreu bem até aqui significa que a api está rodando, agora, para poder testar as rotas dessa aplicação basta importar o arquivo imsomnia.json na raíz do projeto para o seu imsomnia.
