WaProject Teste Guilherme
==================

### Tecnologias

* Node/Typescript
* NestJs (Framework)
* Docker
* Objection (ORM) / Knex (Query builder e migrations)
* Mailgun (envio de email)
* AWS (envio de email/s3)
* JWT (tokens)
* Bcrypt (criptografia para senhas)
* Sentry.io (log de erros)
* Pug (templates de email)

### Rodando o testes

criar um arquivo `.env` com base no `.env.example`

```bash
# install docker https://docs.docker.com/install

git clone git@github.com:GMarroquio/testeWaGuilhermeBack.git
yarn install # ou npm install

[sudo] docker-compose build

[sudo] docker-componse up
# levantará o docker com o banco de dados e a aplicação.
# Ele aplicará as migrations/seeds do banco e depois dará watch nos arquivos
# e iniciará o node com a api
```
