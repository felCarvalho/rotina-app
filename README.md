# RotinaApp

Projeto de aprendizado em Angular para gerenciamento de tarefas e rotinas pessoais.

> **Aviso:** Este projeto foi desenvolvido exclusivamente para fins de aprendizado e prática em Angular. Não é destinado para uso em produção.

## Tech Stack

- Angular 22 (standalone components)
- Angular Material 3
- Tailwind CSS 4
- TypeScript 6
- RxJS 7
- Vitest (testes)

## Funcionalidades

- Cadastro e login de usuários
- Criação, edição e exclusão de tarefas
- Organização por categorias
- Marcar tarefas como concluídas/incompletas
- Visualização de perfil do usuário
- Autenticação com refresh token automático

## Estrutura do Projeto

```
src/app/
├── auth/           # Módulo de autenticação (login)
├── account/        # Módulo de conta do usuário
├── home/           # Módulo principal (dashboard, tarefas)
├── landing-page/   # Página inicial pública
├── utils/          # Utilitários (localStorage, formatação de datas)
└── interceptors/   # Interceptors HTTP (refresh token)
```

## Como Rodar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
ng serve

# Acessar: http://localhost:4200
```

**Pré-requisitos:** Node.js e npm instalados. Backend esperado em `http://localhost:3000/`.

## Comandos Úteis

```bash
ng build          # Build para produção
ng test           # Executar testes
ng generate component nome  # Gerar novo componente
```

## Autor

Felipe Carvalho - 2026
