# Documentação Técnica: Portfolio Website

## 1. Introdução

Este documento fornece uma análise técnica detalhada do projeto **Portfolio Website**, uma aplicação web moderna e responsiva projetada para servir como um portfólio pessoal. A aplicação é construída com **React** e **Vite**, e apresenta um design inspirado no estilo Neo-Brutalista. Uma característica central do projeto é seu sistema de gerenciamento de conteúdo (CMS) baseado em arquivos **Markdown**, que permite atualizações de conteúdo sem a necessidade de modificar o código-fonte da aplicação.

A documentação abrange a arquitetura do projeto, a estrutura de arquivos, os componentes principais, o sistema de gerenciamento de conteúdo, a estilização, a internacionalização e as instruções para build e deploy.

## 2. Arquitetura e Tecnologias

O projeto segue uma arquitetura de frontend desacoplada, onde a interface do usuário (UI) é construída como uma Single Page Application (SPA) com React. O conteúdo é consumido de forma dinâmica a partir de arquivos Markdown locais, simulando um CMS "headless".

### 2.1. Tecnologias Utilizadas

A tabela abaixo detalha as principais tecnologias e bibliotecas utilizadas no projeto:

| Categoria | Tecnologia | Descrição |
| --- | --- | --- |
| **Core** | React 19.2.1 | Biblioteca para construção da interface de usuário. |
| | Vite 7.2.7 | Ferramenta de build e servidor de desenvolvimento rápido. |
| **Linguagem** | JavaScript (ES6+) | Linguagem principal do projeto, utilizando sintaxe de módulos. |
| **Estilização** | CSS Puro | Folhas de estilo tradicionais com variáveis CSS para theming. |
| **Roteamento** | React Router DOM 7.12.0 | Gerenciamento de navegação e rotas na aplicação. |
| **Internacionalização**| i18next 25.7.2 | Framework para tradução e suporte a múltiplos idiomas. |
| | react-i18next 16.4.0 | Integração do i18next com o React. |
| **Conteúdo** | gray-matter 4.0.3 | Parser de frontmatter YAML em arquivos Markdown. |
| | react-markdown 10.1.0 | Componente para renderizar Markdown como componentes React. |
| **Ícones** | Lucide React 0.556.0 | Biblioteca de ícones SVG. |

## 3. Estrutura de Arquivos

A estrutura de arquivos do projeto é organizada para separar claramente as preocupações entre código-fonte, arquivos públicos e conteúdo.

```
/yduqs-project
├── public/
│   ├── images/         # Imagens e assets visuais
│   └── posts/          # Conteúdo em Markdown (CMS)
│       ├── about/
│       ├── contact/
│       ├── events/
│       └── projects/
├── src/
│   ├── components/     # Componentes React reutilizáveis
│   ├── hooks/          # Custom Hooks (lógica reutilizável)
│   ├── styles/         # Arquivos de estilização CSS
│   ├── App.jsx         # Componente principal da aplicação
│   ├── i18n.js         # Configuração de internacionalização
│   └── main.jsx        # Ponto de entrada da aplicação
├── .gitignore          # Arquivos e pastas ignorados pelo Git
├── index.html          # Template HTML principal
├── package.json        # Dependências e scripts do projeto
├── vite.config.js      # Arquivo de configuração do Vite
└── DOCUMENTACAO.md     # Esta documentação
```

## 4. Componentes Principais

A aplicação é modularizada em componentes React, cada um com uma responsabilidade específica.

### 4.1. Ponto de Entrada (`main.jsx`)

O arquivo `src/main.jsx` é o ponto de entrada da aplicação. Ele é responsável por renderizar o componente principal `App` na DOM.

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css' // Estilos globais
import './i18n.js'          // Configuração de idiomas

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 4.2. Componente Raiz (`App.jsx`)

O `src/App.jsx` é o componente que estrutura o layout principal da página, importando e organizando todas as seções principais como `Navbar`, `Hero`, `About`, etc. Ele também gerencia o estado de carregamento inicial e a lógica para troca de idioma.

### 4.3. Componentes de Seção

O corpo da aplicação é dividido nas seguintes seções, cada uma representada por um componente:

- **`Navbar.jsx`**: Barra de navegação fixa e responsiva. Inclui links para as seções da página, um botão de CTA para contato e um seletor de idiomas (PT/EN).
- **`Hero.jsx`**: A primeira seção visível da página. Apresenta o nome, cargo e links para redes sociais, além de uma imagem de perfil. O conteúdo de texto é carregado dinamicamente.
- **`About.jsx`**: Seção "Sobre Mim", que exibe uma biografia e informações sobre a trajetória profissional do usuário. O conteúdo é carregado de um arquivo Markdown.
- **`Projects.jsx`**: Exibe uma galeria de projetos em formato de cartões. Permite filtrar entre projetos "Destaques" e "Todos". Os dados de cada projeto são carregados de arquivos Markdown individuais.
- **`Events.jsx`**: Mostra eventos e palestras, com informações como data, local e tipo de participação. Inclui uma galeria de fotos em um modal.
- **`Contact.jsx`**: Apresenta um formulário de contato e links para redes sociais. O formulário é preparado para ser integrado com serviços como o Formspree.
- **`Footer.jsx`**: Rodapé da página, contendo um botão "Voltar ao Topo", ícones de redes sociais e informações de copyright.

### 4.4. Componentes Reutilizáveis

- **`SocialIcons.jsx`**: Renderiza uma lista de ícones de redes sociais com base nos links fornecidos pelo sistema de conteúdo. Pode ser usado em diferentes seções com variantes de estilo (claro/escuro).

## 5. Sistema de Gerenciamento de Conteúdo (CMS) via Markdown

Uma das características mais importantes do projeto é a capacidade de gerenciar o conteúdo do site através de arquivos Markdown, localizados em `public/posts/`. Isso permite que um usuário não-técnico possa atualizar textos, projetos e eventos sem precisar alterar o código React.

### 5.1. Hooks de Conteúdo (`useContent.js`)

A lógica para carregar e processar o conteúdo Markdown é abstraída em dois custom hooks:

- **`useContent(section, filename)`**: Carrega um único arquivo Markdown. É usado para conteúdos de páginas únicas, como a seção "Sobre".
- **`useContentList(section)`**: Carrega uma lista de arquivos Markdown a partir de um arquivo `index.json` dentro da pasta da seção. É utilizado para carregar múltiplos itens, como projetos e eventos.

### 5.2. Estrutura do Conteúdo

Cada arquivo Markdown utiliza **frontmatter** no formato YAML para metadados estruturados (ex: título, data, imagem de capa) e o corpo do arquivo para conteúdo de texto longo.

**Exemplo de Frontmatter (`/posts/projects/project-1.md`):**

```yaml
---
tid: 1
title: Cloud Cost Agent
description: Sistema multi-agentes de IA para análise de custos de nuvem...
thumbnail: /images/projects/ecommerce.png
codeUrl: https://github.com/gustavozsh/cloud-cost-analyzer-mcp
siteUrl: https://y0h0i3cqn6yq.manus.space/
featured: true
tags: [ia, crewai, cloud, machine learning, data science]
---

O corpo do markdown começa aqui, com a descrição detalhada do projeto...
```

O hook `useContent` parseia o frontmatter e o corpo, retornando um objeto JavaScript que o componente pode renderizar.

## 6. Estilização (CSS)

A estilização do projeto é feita com CSS puro, seguindo uma abordagem modular e organizada. O arquivo principal de estilos é o `src/styles/index.css`.

### 6.1. Variáveis CSS (Custom Properties)

O projeto faz uso extensivo de variáveis CSS para garantir consistência e facilitar a customização do tema. As variáveis são definidas no seletor `:root` e incluem cores, tipografia, espaçamentos e transições.

**Exemplo de Variáveis de Cor:**
```css
:root {
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-gray-light: #E8E8E8;
  --color-blue: #041145;
  --text-dark: #1A1A1A;
  --text-light: #FFFFFF;
}
```

Essa abordagem permite que a paleta de cores ou a tipografia do site sejam alteradas de forma centralizada, modificando apenas os valores no `:root`.

### 6.2. Design Responsivo

O layout é totalmente responsivo e se adapta a diferentes tamanhos de tela, desde dispositivos móveis até desktops. A responsividade é implementada utilizando **Media Queries** no CSS. Os principais breakpoints são `1024px` (tablets) e `768px` (dispositivos móveis).

**Exemplo de Media Query:**
```css
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr; /* Altera o layout do hero para uma única coluna */
  }

  .navbar-menu {
    display: none; /* Esconde o menu desktop */
  }

  .menu-toggle {
    display: flex; /* Exibe o botão de menu mobile */
  }
}
```

### 6.3. Animações

Animações sutis são utilizadas para melhorar a experiência do usuário. Elas são criadas com `@keyframes` e transições CSS. Por exemplo, a animação `fadeInUp` é usada para fazer os elementos surgirem suavemente na tela.

## 7. Internacionalização (i18n)

O projeto oferece suporte a múltiplos idiomas (Português e Inglês) através da biblioteca **i18next** e sua integração com o React (`react-i18next`).

### 7.1. Configuração (`i18n.js`)

O arquivo `src/i18n.js` é responsável por configurar o i18next. Ele define os recursos de tradução (strings) para cada idioma suportado e define o idioma padrão.

**Estrutura dos Recursos de Tradução:**

```javascript
const resources = {
  pt: {
    translation: {
      nav: {
        about: 'Sobre',
        projects: 'Projetos',
      },
      // ... outras chaves
    }
  },
  en: {
    translation: {
      nav: {
        about: 'About',
        projects: 'Projects',
      },
      // ... outras chaves
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt', // Idioma padrão
    fallbackLng: 'en', // Idioma de fallback
    // ...
  });
```

### 7.2. Uso nos Componentes

Nos componentes, o hook `useTranslation` é utilizado para acessar a função `t`, que busca a string de tradução correspondente à chave fornecida.

```jsx
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t } = useTranslation();

  return (
    <a href="#about">{t('nav.about')}</a>
  );
}
```

A troca de idioma é gerenciada no componente `App.jsx` e passada como prop para o `Navbar`, que contém os botões para alternar entre 'PT' e 'EN'.

## 8. Build e Deploy

O projeto utiliza o **Vite** como ferramenta de build, que otimiza a aplicação para produção, gerando arquivos estáticos (HTML, CSS, JS) minificados e otimizados.

### 8.1. Scripts

Os seguintes scripts estão disponíveis no `package.json` para gerenciar o ciclo de vida da aplicação:

- **`npm run dev`**: Inicia o servidor de desenvolvimento do Vite em `http://localhost:5173` com Hot Module Replacement (HMR).
- **`npm run build`**: Executa o processo de build para produção. Os arquivos otimizados são gerados na pasta `dist/`.
- **`npm run preview`**: Inicia um servidor local para pré-visualizar a versão de produção (após a execução do `build`).

### 8.2. Deploy

Como a aplicação é composta por arquivos estáticos, ela pode ser hospedada em qualquer serviço de hospedagem de sites estáticos, como:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

O processo de deploy geralmente envolve conectar o repositório do Git ao serviço de hospedagem, que irá automaticamente executar o comando `npm run build` e publicar o conteúdo da pasta `dist/`.

## 9. Guia de Personalização de Conteúdo

Esta seção fornece um guia passo a passo para que um novo usuário possa personalizar o conteúdo do portfólio.

### 9.1. Alterando Informações Pessoais

Para alterar o nome e o cargo exibidos na seção Hero, edite o arquivo `public/posts/about/hero.md`:

```yaml
---
name: Seu Nome Completo
role: Seu Cargo ou Profissão
---
```

### 9.2. Atualizando a Seção "Sobre Mim"

Edite os arquivos `public/posts/about/main-pt.md` (para Português) e `public/posts/about/main-en.md` (para Inglês) com sua biografia.

### 9.3. Adicionando um Novo Projeto

1.  Crie um novo arquivo Markdown em `public/posts/projects/`, por exemplo, `project-4.md`.
2.  Adicione o frontmatter com os dados do projeto:

    ```yaml
    ---
    id: 4
    title: Nome do Novo Projeto
    description: Uma breve descrição do projeto.
    thumbnail: /images/projects/nova-imagem.png
    codeUrl: https://github.com/seu-usuario/seu-projeto
    siteUrl: https://link-do-site.com
    featured: false
    tags: [react, node, api]
    ---

    Descrição longa do projeto em Markdown.
    ```
3.  Atualize o arquivo `public/posts/projects/index.json` para incluir o novo arquivo:

    ```json
    {
      "files": [
        "project-1.md",
        "project-2.md",
        "project-3.md",
        "project-4.md"
      ]
    }
    ```

### 9.4. Configurando Redes Sociais

Edite o arquivo `public/posts/contact/social.md` e preencha os links das suas redes sociais. Deixe o campo vazio para não exibir o ícone correspondente.

```yaml
---
links:
  github: https://github.com/seu-usuario
  linkedin: https://linkedin.com/in/seu-usuario
  email: mailto:seu@email.com
  twitter:
  instagram:
  youtube:
---
```

## 10. Diagrama de Arquitetura de Componentes

O diagrama a seguir ilustra a hierarquia e o fluxo de dados entre os principais componentes da aplicação.

```
                              ┌─────────────────────────────────────────┐
                              │              index.html                 │
                              │         (Template HTML Raiz)            │
                              └───────────────────┬─────────────────────┘
                                                  │
                                                  ▼
                              ┌─────────────────────────────────────────┐
                              │               main.jsx                  │
                              │         (Ponto de Entrada React)        │
                              │  - Importa i18n.js                      │
                              │  - Importa index.css                    │
                              └───────────────────┬─────────────────────┘
                                                  │
                                                  ▼
                              ┌─────────────────────────────────────────┐
                              │                App.jsx                  │
                              │         (Componente Raiz)               │
                              │  - Gerencia estado de idioma            │
                              │  - Orquestra layout principal           │
                              └───────────────────┬─────────────────────┘
                                                  │
          ┌───────────────────┬───────────────────┼───────────────────┬───────────────────┐
          │                   │                   │                   │                   │
          ▼                   ▼                   ▼                   ▼                   ▼
    ┌───────────┐       ┌───────────┐       ┌───────────┐       ┌───────────┐       ┌───────────┐
    │  Navbar   │       │   Hero    │       │   About   │       │ Projects  │       │  Events   │
    │           │       │           │       │           │       │           │       │           │
    │ - Menu    │       │ - Nome    │       │ - Bio     │       │ - Cards   │       │ - Cards   │
    │ - Lang    │       │ - Foto    │       │ - Imagem  │       │ - Filtros │       │ - Galeria │
    └───────────┘       └─────┬─────┘       └─────┬─────┘       └─────┬─────┘       └─────┬─────┘
                              │                   │                   │                   │
          ┌───────────────────┴───────────────────┴───────────────────┴───────────────────┘
          │
          ▼
    ┌───────────────────────────────────────────────────────────────────────────────────────┐
    │                                    useContent.js                                      │
    │                              (Custom Hook para Conteúdo)                              │
    │  - Busca arquivos .md em /public/posts/                                               │
    │  - Parseia frontmatter YAML                                                           │
    │  - Retorna dados estruturados para os componentes                                     │
    └───────────────────────────────────────────────────────────────────────────────────────┘
```

## 11. Conclusão

O projeto **Portfolio Website** é uma solução robusta e flexível para a criação de portfólios pessoais. Sua arquitetura baseada em componentes React, combinada com um sistema de CMS baseado em Markdown, oferece um equilíbrio ideal entre customização e facilidade de uso. A utilização de tecnologias modernas como Vite e i18next garante uma experiência de desenvolvimento ágil e uma aplicação final performática e acessível a um público global.

---

**Documento gerado por Manus AI**
