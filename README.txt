// Desenvolvendo o back-end da aplicação GoBarber

1 - Configurações básicas

2 - Configurando Sucrase, Nodemon e Configurações do Debugger do VSCODE (Ver vídeo 02 do módulo 05 de Dominando NodeJS.)

3 - Crie/Configurando .gitignore; Configurando eslint, prettier e .editorconfig.

4 - Configurando DB relacional

Crie uma instância do db PostgreSQL:

sudo docker run --name gobarber-postgres -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres:11

Abra o PostBird e crie uma db gobarber.

5 - Configurando Sequelize (veja as Configurações, você sabe onde).

6 - Migration de usuário e CRUD de usuário. (Validações e Autenticação)

7 - Configurando o Multer para upload de arquivos.

8 - Configurando providers e agendamentos.

9 - Criando listagem de agendamentos para um usuário provider e usuário não provider.

10 - Configurando DB não relacional para guardar dados que não precisam de relação/estruturação.

Crie uma instância do db MongoDB:

sudo docker run --name gobarber-mongo -p 27017:27017 -d -t mongo

Abra o MongoDB Compass

11 - Configurando MongooseORM

12 - Notificando novos agendamentos

13 - Listando e marcando notificações como lidas.

14 - Cancelamento de agendamento

15 - Configurando nodemailer

Para SMTP em produção, use Amazon SES, Mailgun, Sparkpost.
Não é legal usar o SMTP em produção direto do GMAIL, pois ele bloqueia a gente em certas ações.
Para desenvolvimento usaremos o MailTrap. (que não funcionará em produção).

16 - Configurando templates de emails

17 - Configurando fila/background jobs com Redis (db não relacional sem schemas, somente com chave/valor)

sudo docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine

Instale o Bee Queue (Ferramento de background jobs/filas) - yarn add bee-queue e o configure.
Obs: Todos os trabalhos dentro de uma fila são chamados de Jobs, assim como Models para um db
relacional ou Schemas para o MongoDB.

18 - Monitorando falhas na fila

19:
1 - Adicionando CORS
2 - Retornando avatar e campo provider na autenticação do usuário
3 - Retornando avatar na edição do usuário
4 - Retornando o nome do usuário no schedulecontroller


