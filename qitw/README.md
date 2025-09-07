# Questionário de Avaliação Roblox (Nota Única por Item)

Agora o usuário escolhe apenas UM item (navegando por Categoria > Subcategoria > Item) e dá uma nota geral de 1 a 5, opcionalmente adicionando um comentário. O registro é salvo no Realtime Database em `avaliacoes_unicas`.

## Estrutura
- `index.html` – página principal
- `assets/styles.css` – estilos
- `assets/app.js` – lógica + integração Firebase (seleção hierárquica + envio)

## Customização
Edite o objeto `DATASET` em `assets/app.js` para ajustar categorias, subcategorias e itens. Estrutura:
```js
const DATASET = {
  'Categoria': {
     'Subcategoria': ['Item 1','Item 2']
  }
}
```

## Firebase Security Rules (exemplo simples)
Ajuste regras no console Firebase para evitar abusos. Exemplo permissivo inicial (NÃO usar em produção permanente):
```json
{
  "rules": {
    "avaliacoes": {
      ".read": false,
      ".write": true
    }
  }
}
```
Depois, restrinja (ex: limite tamanho, sanitize, auth etc.).

## Hospedagem local
Basta abrir `index.html` em um navegador moderno. Para evitar problemas de CORS future, pode usar um servidor simples:

### Node (opcional)
```bash
npx http-server . -p 8080
```

## Campos salvos
```json
{
  "nick": "Usuario",
  "at": "@Usuario",
  "item": { "category": "Veículos", "subcategory": "Tanques", "name": "M1 Abrams", "slug": "veiculos-tanques-m1-abrams" },
  "rating": 5,
  "comment": "Muito equilibrado",
  "meta": {
    "ts": 1690000000000,
    "tzOffsetMinutes": -180,
    "userAgent": "Mozilla/..",
    "submittedAtServer": 1690000001000
  }
}
```

## Próximos passos sugeridos
- Implementar autenticação anônima ou por conta para limitar spam.
- Adicionar pagina de dashboard para visualizar médias.
- Validar que cada usuário só envia 1 vez (hash por @?).
- Adicionar honeypot ou atraso mínimo.

---
Dúvidas ou ajustes, peça aqui.
