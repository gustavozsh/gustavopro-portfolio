---
title: "IA Agentes Diário Oficial"
section: "projects"
description: "Multi-agentes de IA para automação do Diário Oficial da União"
descriptionEn: "Multi-agent AI for Official Gazette automation"
thumbnail: "/images/project-placeholder.png"
tags: ["CrewAI", "Python", "NLP", "Web Scraping", "Automação", "IA"]
projectUrl: "https://github.com/gustavozsh/ia-agentes-diario-oficial-uniao"
codeUrl: "https://github.com/gustavozsh/ia-agentes-diario-oficial-uniao"
---

## Sobre o Projeto

Este projeto implementa um sistema de cinco agentes de IA especializados para automatizar a extração, processamento e organização de dados do Diário Oficial da União (DOU) do Brasil. Cada agente possui uma função específica no pipeline de processamento, garantindo eficiência e precisão na coleta de informações governamentais.

## Arquitetura de Agentes

- **DOU-Collector**: Agente responsável por extrair o conteúdo bruto do Diário Oficial
- **DOU-Processor**: Transforma o conteúdo em dados estruturados e normalizados
- **DOU-Organizer**: Compila e organiza os dados em formato CSV para análise
- **DOU-Searcher**: Permite recuperação inteligente de informações específicas
- **DOU-Coordinator**: Gerencia o fluxo de trabalho entre todos os agentes

## Funcionalidades

- Extração automática diária do DOU
- Processamento de linguagem natural para categorização
- Busca semântica por temas específicos
- Exportação em múltiplos formatos (CSV, JSON, PDF)
- Alertas personalizados por palavras-chave

## Tecnologias Utilizadas

- **CrewAI**: Orquestração de múltiplos agentes de IA
- **Python**: Desenvolvimento do backend e agentes
- **BeautifulSoup/Scrapy**: Web scraping do portal do DOU
- **Pandas**: Processamento e análise de dados
- **LangChain**: Framework para aplicações com LLMs
- **ChromaDB**: Banco de dados vetorial para busca semântica
