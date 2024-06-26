# HealthHub - Projecto final - Flag 2023

Descrição: Plataforma de gestão para clínica médica.

Deploy: <https://health-hub-2w2j.onrender.com>

## Tecnologias utilizadas

- NodeJS
- Typescript
- Fastify
- Prisma ORM
- PostgreSQL
- React

## Modelo ERD

`/project-resources/data-model/`

## Inicialização do projecto

### Backend

- Instalação das dependências da aplicação

  ```shell
  cd backend
  npm install
  ```

- Inicialização do docker container com PostgreSQL (BD = _health-hub_ / user e password = _docker_)

  ```shell
  docker compose up -d
  ```

- Criar ficheiro `backend/.env` à semelhança do ficheiro `backend/.env.example` e incluir o `DATABASE_URL` (incluo o user e password por ser um exercício, num caso real não o faria):

  ```env
  NODE_ENV=dev
  PORT=3333

  JWT_SECRET=ToBeDefinedSecretToken

  # Prisma connection string
  DATABASE_URL="postgresql://docker:docker@localhost:5432/health-hub?schema=public"
  ```

- Correr as migrações e seeds do Prisma para a BD (**importante** ler comentário na linha 23, no ficheiro `backend/prisma/seeds/db-seed.ts`).

  ```shell
  npx prisma migrate dev
  ```

- Caso optar por alterar o seed (**importante** ler comentário na linha 23, no ficheiro `backend/prisma/seeds/db-seed.ts`):

  ```shell
  npx prisma migrate reset
  ```

- Correr o projecto:

  ```shell
  npm run start:dev
  ```

  URL de acesso no browser: <http://localhost:3333>

- Por defeito, a BD é inicializada com os perfis de utilizador base (`ADMINISTRADOR`, `COLABORADOR`, `MEDICO`,`PACIENTE`) e um _superuser_ com perfil de _ADMINISTRADOR_:

  - Nome: superuser
  - Email: <superuser@example.com>
  - Senha: 123456

- Lista de rotas da API (documentado com o Swagger): <http://localhost:3333/documentation>

  Nota: implementei alguns schemas ("routesSchemas.ts"), que planeio incluir nas rotas para melhor documentar a API, mas como não me foi possível terminar, mantive só os ficheiros.

### Frontend

- A implementar brevemente...

---

#### Requisitos funcionais

- [x] O _paciente_ deve poder registar-se e autenticar-se;
- [x] Permitir obter o perfil do utilizador activo;
- [x] O paciente pode marcar uma consulta de forma autónoma;
- [x] O paciente pode consultar a sua agenda de consultas (passadas e futuras);
- [x] O médico pode consultar a ficha do paciente com todo o histórico;
- [x] O médico pode consultar a sua agenda
- [x] O médico deve ter acesso a uma lista de fármacos que pode receitar;

#### Regras de negócio

- [x] O utilizador não pode registar-se com um e-mail duplicado;
- [x] A password do utilizador deve ter um mínimo de 6 caracteres;
- [x] Caso não venha no pedido o tipo de perfil do utilizador (`ADMINISTRADOR`, `COLABORADOR`, `MEDICO`,`PACIENTE`), por defeito é criado um utilizador com perfil de _PACIENTE_;
- [x] Apenas utilizadores com o perfil _ADMINISTRADOR_ podem registar outros utilizadores com perfil _ADMINISTRADOR_ e _COLABORADOR_;
- [x] Apenas utilizadores com perfil _ADMINISTRADOR_ e _COLABORADOR_ podem registar utilizadores com perfil _MEDICO_;
- [x] Apenas utilizadores com perfil _ADMINISTRADOR_ e _COLABORADOR_ podem registar novas `especialidades` (_specialties_), `medicamentos` (_medicines_) e actualizar a `agenda` dos médicos (_doctor-schedules_);
- [x] Os utilizadores com perfil _ADMINISTRADOR_ e _COLABORADOR_ podem registar utilizadores com perfil _PACIENTE_ e registar novas consultas para um paciente.
- [x] A agenda dos médicos não pode conter horários de consultas repetidos (mesmo dia e intervalo de tempo)
- [x] Um horário da agenda de um médico só pode ser removido da BD com data no futuro (prevenir que sejam removidos horários em que possa ter havido consultas)
- [x] Uma consulta só pode ser marcada para uma data no futuro e desde que a data esteja livre para o médico escolhido;
- [x] Uma consulta só pode ser cancelada com data no futuro, consultas já efectuadas não podem ser canceladas

#### Requisitos não funcionais

- [x] A password do utilizador vai ser criptografada;
- [x] Os dados da aplicação vão estar persistidos numa base de dados PostgreSQL;
- [x] Todas as listas de dados vão ser paginadas com 10 registos por página;
- [x] O utilizador vai ser identificado por um JWT (JSON Web Token);
