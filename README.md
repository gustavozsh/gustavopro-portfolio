# 🚀 Gustavo Santos - Portfolio Pessoal

Portfolio pessoal moderno e responsivo desenvolvido com React, TypeScript e design Neo-Brutalista. Apresenta projetos, experiências e informações profissionais de forma elegante e impactante.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![React](https://img.shields.io/badge/React-19.1-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.1-646cff)

## ✨ Características

- 🎨 **Design Neo-Brutalista** - Interface moderna com alto contraste e elementos geométricos
- 📱 **Totalmente Responsivo** - Adaptado para todos os dispositivos
- 🌓 **Dark/Light Mode** - Suporte a temas claro e escuro
- ⚡ **Performance Otimizada** - Construído com Vite para carregamento rápido
- 📝 **Content Driven** - Gerenciamento de conteúdo via arquivos Markdown
- 🎭 **Animações Suaves** - Transições e animações com Framer Motion
- 🔧 **TypeScript** - Código type-safe e manutenível
- 🎯 **SEO Friendly** - Otimizado para mecanismos de busca

## 🛠️ Stack de Tecnologias

### Frontend
- **React 19.1** - Biblioteca UI moderna
- **TypeScript 5.9** - Tipagem estática
- **Vite 7.1** - Build tool e dev server
- **Tailwind CSS 4** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **Wouter** - Roteamento minimalista
- **React Icons** - Ícones vetoriais
- **Streamdown** - Renderização de Markdown

### Backend (opcional)
- **Express** - Web framework Node.js
- **tRPC** - API type-safe
- **Drizzle ORM** - ORM TypeScript-first
- **MySQL** - Banco de dados relacional

### UI Components
- **Radix UI** - Componentes acessíveis e unstyled
- **shadcn/ui** - Componentes reutilizáveis
- **Lucide React** - Ícones modernos

### Ferramentas de Desenvolvimento
- **pnpm** - Gerenciador de pacotes eficiente
- **Prettier** - Formatação de código
- **Vitest** - Framework de testes
- **ESBuild** - Bundler JavaScript

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **pnpm** (versão 10 ou superior)

## 🚀 Como Executar

### 1. Clone o repositório

```bash
git clone https://github.com/gustavozsh/gustavopro-portfolio.git
cd gustavopro-portfolio
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Execute em modo desenvolvimento

```bash
pnpm dev
```

O projeto estará disponível em `http://localhost:5173`

### 4. Build para produção

```bash
pnpm build
```

### 5. Execute a versão de produção

```bash
pnpm start
```

## 📁 Estrutura do Projeto

```
gustavopro-portfolio/
├── client/                 # Aplicação frontend
│   ├── public/            # Arquivos públicos
│   │   ├── images/        # Imagens e assets
│   │   └── posts/         # Conteúdo em Markdown
│   │       ├── about.md   # Sobre mim
│   │       ├── project-*.md  # Projetos
│   │       └── event-*.md    # Eventos
│   └── src/               # Código fonte React
│       ├── components/    # Componentes reutilizáveis
│       ├── pages/         # Páginas da aplicação
│       ├── hooks/         # Custom hooks
│       ├── contexts/      # Context providers
│       └── lib/           # Utilitários e helpers
├── server/                # Backend (opcional)
│   ├── _core/            # Configuração do servidor
│   ├── db.ts             # Configuração do banco
│   └── routers.ts        # Rotas tRPC
├── shared/               # Código compartilhado
│   └── types.ts          # Tipos TypeScript
├── drizzle/              # Migrações do banco
└── package.json          # Dependências e scripts
```

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Cria build de produção |
| `pnpm start` | Inicia servidor de produção |
| `pnpm check` | Verifica tipos TypeScript |
| `pnpm format` | Formata código com Prettier |
| `pnpm test` | Executa testes com Vitest |
| `pnpm db:push` | Aplica migrações do banco |

## 📝 Gerenciamento de Conteúdo

O conteúdo do portfolio é gerenciado através de arquivos Markdown localizados em `client/public/posts/`.

### Estrutura de um Post

```markdown
---
title: "Título do Projeto"
section: "projects"
order: 1
date: "2024-01-01"
---

Conteúdo do projeto em Markdown...
```

### Seções Disponíveis

- **about** - Informações sobre você
- **projects** - Portfólio de projetos
- **events** - Eventos e palestras

## ⚙️ Configuração de Ambiente

Para funcionalidades adicionais (como upload de arquivos ou autenticação), crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados (opcional)
DATABASE_URL=mysql://user:password@localhost:3306/portfolio

# AWS S3 (opcional - para upload de arquivos)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your_bucket_name

# Outras configurações
NODE_ENV=development
```

## 🎨 Personalização

### Cores e Tema

As cores do tema podem ser customizadas em `client/src/index.css`. O projeto usa variáveis CSS para fácil personalização:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 0%;
  --accent: 142 76% 36%;
  /* ... outras variáveis */
}
```

### Fontes

As fontes são carregadas via Tailwind CSS. Customize em `client/src/index.css`.

## 🤝 Como Contribuir

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Gustavo Santos**
- Senior Data Engineer | Senior Cloud Engineer
- 10 anos de experiência em SQL Avançado, Spark, Python, Arquitetura de Dados e Cloud
- Certificações: AWS, Google Cloud, Microsoft Azure
- GDG Organizer e Palestrante Internacional

### 🔗 Links

- GitHub: [@gustavozsh](https://github.com/gustavozsh)
- LinkedIn: [Gustavo Santos](https://linkedin.com/in/gustavozsh)
- Portfolio: [gustavopro-portfolio](https://github.com/gustavozsh/gustavopro-portfolio)

## 🙏 Agradecimentos

- [Radix UI](https://www.radix-ui.com/) - Componentes primitivos acessíveis
- [shadcn/ui](https://ui.shadcn.com/) - Componentes reutilizáveis
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Vite](https://vitejs.dev/) - Build tool moderna
- [React](https://react.dev/) - Biblioteca UI

---

<div align="center">
  Feito com ❤️ por Gustavo Santos
</div>
