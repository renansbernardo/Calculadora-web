# Calculadora React

Uma calculadora web moderna, responsiva e acessível, desenvolvida com React, TypeScript e Vite.

## Funcionalidades
- Operações básicas: adição (+), subtração (-), multiplicação (×), divisão (÷), porcentagem (%) e inversão de sinal (±)
- Histórico das últimas operações
- Suporte a números decimais com precisão e remoção de zeros desnecessários
- Feedback sonoro opcional ao clicar nos botões
- Tema escuro/claro com alternância manual e automática (respeita o sistema)
- Layout totalmente responsivo
- Acessibilidade: navegação por teclado, contraste, ARIA labels e suporte a leitor de tela
- Testes unitários completos para todos os componentes e operações

## Tecnologias Utilizadas
- React 19 + TypeScript
- Vite
- CSS Modules
- Jest + Testing Library

## Como usar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse em [http://localhost:5173](http://localhost:5173)

## Estrutura do Projeto
- `src/components/Calculator/` — Componente principal da calculadora
- `src/components/Button/` — Botão reutilizável com feedback sonoro
- `src/components/Display/` — Display de resultados com formatação
- `docs/` — Documentação, PRD e melhores práticas

## Testes
- Execute todos os testes com:
  ```bash
  npm test
  ```
- Cobertura para operações, histórico, precisão decimal, tema escuro e feedback sonoro

## Acessibilidade
- Navegação por teclado
- ARIA labels e roles
- Contraste alto
- Compatível com leitores de tela

## Melhorias e Conclusão
- Todas as tarefas do PRD e melhorias sugeridas foram implementadas
- Código documentado e pronto para manutenção

---
Desenvolvido em 2025 por Renan S. Bernardo
