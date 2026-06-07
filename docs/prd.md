# PRD - Avaliador de Ficcao Interativa

## 1. Visao Geral do Produto

### 1.1 Proposito

O **Avaliador de Ficcao Interativa** e uma aplicacao web full-stack que permite a usuarios cadastrar obras de ficcao interativa e registrar avaliacoes detalhadas sobre essas obras. O sistema oferece uma plataforma centralizada para catalogar ficcoes interativas, atribuir escritores e coletar avaliacoes com notas, comentarios e criterios especificos.

### 1.2 Publico-Alvo

- Leitores e entusiastas de ficcao interativa que desejam registrar e avaliar obras.
- Escritores de ficcao interativa que buscam feedback estruturado sobre suas obras.
- Comunidades academicas interessadas em catalogar e analisar ficcoes interativas.

### 1.3 Problema Resolvido

Atualmente nao existe uma plataforma dedicada ao registro e avaliacao de ficcoes interativas. Leitores e escritores carecem de um espaco centralizado para catalogar obras, atribuir autoria e coletar avaliacoes padronizadas com criterios definidos.

---

## 2. Personas

### Persona 1 - Leitor Avaliador

**Nome:** Marina, 25 anos
**Perfil:** Estudante universitaria, consumidora frequente de ficcoes interativas.
**Necessidade:** Quer registrar suas avaliacoes sobre ficcoes que leu, com notas e comentarios detalhados.
**Frustracao:** Nao encontra um local centralizado para catalogar e avaliar ficcoes interativas.

### Persona 2 - Escritor de Ficcao

**Nome:** Rafael, 32 anos
**Perfil:** Escritor independente de ficcoes interativas.
**Necessidade:** Deseja cadastrar suas obras e receber avaliacoes estruturadas de leitores.
**Frustracao:** Feedback recebido e fragmentado e sem criterios padronizados.

### Persona 3 - Curador/Administrador

**Nome:** Carla, 40 anos
**Perfil:** Professora universitaria com interesse em narrativas interativas.
**Necessidade:** Quer uma visao geral das obras cadastradas e suas avaliacoes para fins academicos.
**Frustracao:** Dados dispersos dificultam analises comparativas.

---

## 3. Historias de Usuario

### Epico 1 - Gestao de Usuarios

| ID    | Historia | Criterio de Aceite | Prioridade |
|-------|---------|-------------------|------------|
| US-01 | Como visitante, quero me cadastrar no sistema para poder acessar as funcionalidades. | Formulario com nome, email e senha. Email unico. Senha com minimo 6 caracteres. Retorna token JWT apos cadastro. | Alta |
| US-02 | Como visitante, quero fazer login para acessar minha conta. | Login com email e senha. Retorna token JWT valido. Mensagem de erro para credenciais invalidas. | Alta |
| US-03 | Como usuario autenticado, quero visualizar meu perfil. | Exibe nome e email do usuario logado obtidos via token JWT. | Media |
| US-04 | Como usuario autenticado, quero atualizar meus dados de perfil. | Permite alterar nome e senha. Validacoes aplicadas. | Baixa |

### Epico 2 - Gestao de Ficcoes Interativas

| ID    | Historia | Criterio de Aceite | Prioridade |
|-------|---------|-------------------|------------|
| US-05 | Como usuario autenticado, quero cadastrar uma ficcao interativa. | Campos: titulo (obrigatorio), descricao, genero, link, ano de publicacao. Ficcao vinculada ao usuario autor. | Alta |
| US-06 | Como usuario, quero listar todas as ficcoes interativas cadastradas. | Retorna lista paginada com titulo, genero e autor. Acessivel sem autenticacao. | Alta |
| US-07 | Como usuario, quero visualizar os detalhes de uma ficcao interativa. | Exibe todos os campos, escritores vinculados e media de avaliacoes. | Alta |
| US-08 | Como autor da ficcao, quero editar os dados de uma ficcao que cadastrei. | Somente o autor pode editar. Validacoes aplicadas. | Media |
| US-09 | Como autor da ficcao, quero excluir uma ficcao que cadastrei. | Somente o autor pode excluir. Exclusao em cascata das avaliacoes e escritores vinculados. | Media |

### Epico 3 - Gestao de Escritores

| ID    | Historia | Criterio de Aceite | Prioridade |
|-------|---------|-------------------|------------|
| US-10 | Como autor de uma ficcao, quero vincular escritores a ela. | Campos: nome do escritor, papel (autor principal, coautor, colaborador). | Alta |
| US-11 | Como usuario, quero ver os escritores de uma ficcao interativa. | Lista de escritores com nome e papel retornada junto aos detalhes da ficcao. | Media |
| US-12 | Como autor da ficcao, quero remover um escritor vinculado. | Somente o autor da ficcao pode remover escritores. | Baixa |

### Epico 4 - Gestao de Avaliacoes

| ID    | Historia | Criterio de Aceite | Prioridade |
|-------|---------|-------------------|------------|
| US-13 | Como usuario autenticado, quero avaliar uma ficcao interativa. | Campos: nota (1-5), comentario (opcional), criterios: narrativa, interatividade, originalidade (cada 1-5). Um usuario so pode avaliar uma mesma ficcao uma vez. | Alta |
| US-14 | Como usuario, quero ver todas as avaliacoes de uma ficcao. | Lista paginada com nota, comentario, criterios e nome do avaliador. | Alta |
| US-15 | Como usuario autenticado, quero editar minha avaliacao. | Somente o autor da avaliacao pode editar. | Media |
| US-16 | Como usuario autenticado, quero excluir minha avaliacao. | Somente o autor da avaliacao pode excluir. | Baixa |
| US-17 | Como usuario, quero ver a media de avaliacoes de uma ficcao. | Media geral e media por criterio calculadas e exibidas nos detalhes da ficcao. | Media |

---

## 4. Regras de Negocio

| ID   | Regra | Descricao |
|------|-------|-----------|
| RN-01 | Unicidade de email | Nao podem existir dois usuarios com o mesmo email. |
| RN-02 | Autenticacao obrigatoria | Cadastro de ficcoes, escritores e avaliacoes requer autenticacao via JWT. |
| RN-03 | Autoria de ficcao | Somente o usuario que cadastrou uma ficcao pode edita-la ou exclui-la. |
| RN-04 | Avaliacao unica por ficcao | Um usuario so pode criar uma avaliacao por ficcao interativa. |
| RN-05 | Faixa de notas | Notas de avaliacao devem estar entre 1 e 5 (inteiros). |
| RN-06 | Criterios de avaliacao | Cada avaliacao possui tres criterios: narrativa, interatividade e originalidade, cada um de 1 a 5. |
| RN-07 | Autoria de avaliacao | Somente o autor de uma avaliacao pode edita-la ou exclui-la. |
| RN-08 | Exclusao em cascata | Ao excluir uma ficcao, todas as avaliacoes e escritores vinculados sao removidos. |
| RN-09 | Listagem publica | A listagem e detalhes de ficcoes e avaliacoes sao publicos (nao requerem autenticacao). |
| RN-10 | Senha segura | Senhas devem ter no minimo 6 caracteres e sao armazenadas com hash bcrypt. |

---

## 5. Requisitos Nao-Funcionais

| ID    | Requisito | Descricao |
|-------|-----------|-----------|
| RNF-01 | Performance | A API deve responder em menos de 500ms para operacoes de leitura. |
| RNF-02 | Seguranca | Senhas armazenadas com hash bcrypt. Autenticacao via JWT com expiracao. |
| RNF-03 | Escalabilidade | Arquitetura em camadas permitindo crescimento horizontal. |
| RNF-04 | Testabilidade | Cobertura de testes unitarios minima de 70% no backend. |
| RNF-05 | Compatibilidade | Frontend responsivo, compativel com Chrome, Firefox e Edge. |
| RNF-06 | Documentacao da API | Endpoints documentados via Swagger/OpenAPI. |

---

## 6. Escopo Fora (Out of Scope)

- Sistema de notificacoes (email ou push).
- Upload de arquivos/imagens para ficcoes.
- Sistema de comentarios em avaliacoes (respostas a avaliacoes).
- Moderacao de conteudo por administradores.
- Integracao com redes sociais.
- Sistema de recomendacao de ficcoes.
- Internacionalizacao (i18n).

---

## 7. Metricas de Sucesso

| Metrica | Descricao |
|---------|-----------|
| Funcionalidade | Todos os endpoints CRUD funcionando e testados. |
| Qualidade de Codigo | Cobertura de testes >= 70%. |
| Deploy | Backend e frontend acessiveis em producao. |
| CI/CD | Pipeline executando testes e deploy automaticamente. |
| Documentacao | Swagger funcional e acessivel em producao. |

---

## 8. Cronograma de Entregas

| Entrega | Conteudo | Artefatos |
|---------|----------|-----------|
| Entrega 1 | Documentacao e Backlog | PRD, SDD, checklist, Kanban no GitHub Projects, Video 1 |
| Entrega 2 | Backend e TDD | API NestJS com Prisma, JWT, testes automatizados, Video 2 |
| Entrega 3 | Frontend e Nuvem | Interface React, CI/CD com GitHub Actions, deploy, Video 3 |
