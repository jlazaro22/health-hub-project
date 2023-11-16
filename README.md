# HealthHub - Projecto final - Flag 2023

Plataforma de gestão para clínica médica

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
  npm install
  ```

- Inicialização do docker container com PostgreSQL (BD = _health-hub_ / user e password = _docker_)
    `docker compose up -d`

- Correr as migrações e seeds do Prisma para a BD (**importante** ler comentário na linha 23, no ficheiro `backend/prisma/seeds/db-seed.ts`).
  `npx prisma migrate dev`

- Por defeito, a BD é inicializada com os perfis de utilizador base (`ADMINISTRADOR`, `COLABORADOR`, `MEDICO`,`PACIENTE`) e um _superuser_ com perfil de _ADMINISTRADOR_:
  - Nome: superuser
  - Email: <superuser@example.com>
  - Senha: 123456

#### Requisitos funcionais

- [ ] O _paciente_ deve poder registar-se e autenticar-se;
- [ ] Permitir obter o perfil do utilizador activo;
- [ ] O paciente pode marcar uma consulta de forma autónoma;
- [ ] O paciente pode consultar a sua agenda de consultas (passadas e futuras);
- [ ] O médico pode consultar a ficha do paciente com todo o histórico;
- [ ] O médico pode consultar a sua agenda
- [ ] O médico deve ter acesso a uma lista de fármacos que pode receitar;

#### Regras de negócio

- [ ] O utilizador não pode registar-se com um e-mail duplicado;
- [ ] A password do utilizador deve ter um mínimo de 6 caracteres;
- [ ] Caso não venha no pedido o tipo de perfil do utilizador (`ADMINISTRADOR`, `COLABORADOR`, `MEDICO`,`PACIENTE`), por defeito é criado um utilizador com perfil de _PACIENTE_;
- [ ] Apenas utilizadores com o perfil _ADMINISTRADOR_ podem registar outros utilizadores com perfil _ADMINISTRADOR_ e _COLABORADOR_;
- [ ] Apenas utilizadores com perfil _ADMINISTRADOR_ e _COLABORADOR_ podem registar utilizadores com perfil _MEDICO_;
- [ ] Os utilizadores com perfil _ADMINISTRADOR_ e _COLABORADOR_ podem registar utilizadores com perfil _PACIENTE_ e registar novas consultas para um paciente.
- [ ] Uma consulta só pode ser marcada para uma data no futuro, desde que a data esteja livre para o médico escolhido;

#### Requisitos não funcionais

- [ ] A password do utilizador vai ser criptografada;
- [ ] Os dados da aplicação vão estar persistidos numa base de dados PostgreSQL;
- [ ] Todas as listas de dados vão ser paginadas com 20 registos por página;
- [ ] O utilizador vai ser identificado por um JWT (JSON Web Token);
