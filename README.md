# Landing page — KNDev's Solutions

Landing page em React, TypeScript e Vinext, criada a partir do brandbook do repositório.

## Executar localmente

Requer Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

Validações disponíveis:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Canal de contato

Copie `.env.example` para `.env.local` e configure:

```env
NEXT_PUBLIC_CONTACT_ENDPOINT=https://seu-endpoint-seguro.example/contato
```

O endpoint deve aceitar `POST` com `Content-Type: application/json`, liberar a origem do site via CORS e retornar um status `2xx` somente quando a mensagem for realmente recebida. A carga inclui `name`, `company`, `contact`, `solutionType`, `description`, `consent` e `source`.

Sem essa variável, o formulário valida os campos, mas informa claramente que o canal não está configurado e não apresenta sucesso falso.

## Conteúdo editável

- Textos, serviços, benefícios, etapas e projetos: `lib/site-content.ts`.
- Projetos só aparecem quando `projects` contém dados reais e confirmados.
- Canais oficiais devem substituir a mensagem provisória no rodapé quando forem definidos.
- Metadados e dados estruturados: `app/layout.tsx` e `app/page.tsx`.
