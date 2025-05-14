# Melhores Práticas de Uso do React

Este documento reúne regras e recomendações baseadas na documentação oficial do React (2025) para garantir código limpo, eficiente e sustentável em projetos React.

## 1. Regras Fundamentais
- **Hooks devem ser usados apenas no topo de componentes de função ou custom hooks.**
  - Nunca use hooks dentro de loops, condições, funções internas, classes ou blocos try/catch.
- **Não chame componentes como funções.**
  - Use `<MeuComponente />` e não `MeuComponente()`.
- **Não crie Higher Order Hooks.**
  - Prefira criar hooks customizados com lógica explícita.
- **Não passe hooks como props.**
  - Use hooks diretamente dentro do componente.

## 2. Gerenciamento de Estado
- **Sempre use funções atualizadoras para múltiplos updates de estado sequenciais:**
  ```js
  setAge(a => a + 1);
  setAge(a => a + 1);
  setAge(a => a + 1);
  ```
- **Evite armazenar valores derivados no estado.** Calcule valores derivados durante o render.
- **Para objetos e funções em dependências de hooks, use useMemo/useCallback.**

## 3. Efeitos e useEffect
- **Separe efeitos por propósito.**
  ```js
  useEffect(() => { /* conexão */ }, [dep]);
  useEffect(() => { /* analytics */ }, [dep]);
  ```
- **Declare todas as dependências no array do useEffect.**
- **Nunca sufoque o linter de dependências.**
- **Implemente sempre a função de cleanup quando necessário.**

## 4. Otimização de Performance
- **Use useMemo para cálculos caros ou filtragens de listas:**
  ```js
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  ```
- **Use useCallback para funções passadas como props:**
  ```js
  const handleSubmit = useCallback((data) => { ... }, [deps]);
  ```
- **Prefira criar objetos/funções dentro do useMemo/useCallback ou dentro do próprio useEffect.**

## 5. Contexto e Custom Hooks
- **Use useContext apenas em hooks ou componentes de função.**
- **Otimize valores de contexto com useMemo e funções com useCallback.**
- **Nomeie custom hooks de acordo com seu propósito.**

## 6. Formulários e Estado
- **Use useFormStatus para feedback de envio em formulários.**
- **Evite re-renderizações desnecessárias em formulários, isolando o estado do input.**

## 7. Outras Recomendações
- **Prefira classes ES5 para exemplos de classe (caso necessário).**
- **Evite mutações diretas em objetos de estado.**
- **Implemente sempre o cleanup de refs e listeners.**

---

> Baseado na documentação oficial do React (https://react.dev) e exemplos de 2025.
