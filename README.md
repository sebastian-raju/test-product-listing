# Products

A React + TypeScript app that lists products from [DummyJSON](https://dummyjson.com/docs/products) in a table. Users can search by name (debounced by 300 ms), sort by price and page through the results.

## Stack

Vite · React 19 · TypeScript (strict) · TanStack Query v5 · Tailwind CSS v4 · ESLint (typescript-eslint `strictTypeChecked`) · Prettier

## Getting started

```bash
npm install
npm run dev
```

Optional: copy `.env.example` to `.env.local` to point at a different API base URL.

| Script                            | Purpose                                 |
| --------------------------------- | --------------------------------------- |
| `npm run dev`                     | Start the dev server                    |
| `npm run build`                   | Type-check and build for production     |
| `npm run preview`                 | Serve the production build              |
| `npm run typecheck`               | Type-check only                         |
| `npm run lint` / `lint:fix`       | Lint (fails on any warning) / auto-fix  |
| `npm run format` / `format:check` | Format with Prettier / check formatting |

## How search, sort and pagination work

The catalogue is small (about 200 products), so the app fetches it **once** (`/products?limit=0&select=id,title,price,category`, about 10 KB). TanStack Query caches it, and everything else happens in the browser:

```
products ──► filterByTitle (debounced 300 ms) ──► sortProducts ──► paginate (10 / page) ──► table
```

| Step       | Function                                                               | Notes                                                            |
| ---------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Search     | `features/products/utils/filterByTitle`                                | Case-insensitive "name contains"; runs 300 ms after typing stops |
| Sort       | `features/products/utils/sortProducts` → `shared/utils/sort#sortItems` | Stable, never mutates its input; unsorted keeps API order        |
| Pagination | `shared/utils/paginate`                                                | Clamps the page; search/sort changes reset to page 1             |

Searching, sorting and paging never make a network request. Each step is a separate `useMemo`, so changing pages doesn't re-filter or re-sort.

**If the catalogue grows large** (thousands of rows), move search, sort and paging back to the server. Only `productsApi.ts` and `useProductsTable.ts` need to change. The components and state reducer stay the same.

## Project structure

```
src/
  app/                 App shell and global providers
  config/              Typed environment configuration
  lib/
    http/              fetch wrapper (getJson) and typed errors
    validation/        Reusable runtime type guards
    queryClient.ts     TanStack Query defaults
  shared/              Feature-agnostic building blocks
    components/        DataTable, SortableHeader, SearchInput, Pagination, status states
    hooks/             useDebouncedValue
    types/ utils/      Sort types, paginate, formatters
  features/
    products/
      index.ts         Public API of the feature: import from here only
      api/             URL building, fetching, response guards, query keys
      hooks/           State (reducer) → orchestration (useProductsTable)
      components/      Container (ProductsPage) + presentational components
      types/ utils/    Domain types and pure helpers
      constants.ts     Debounce delay, page size
```

**Layers:** `components → hooks → api → lib`. Presentational components only receive props. Hooks handle state and data. The API layer does I/O only. `shared/` and `lib/` never import from `features/`.

### Type safety

- `strict` plus `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes` and `noImplicitOverride`.
- No `any`: `response.json()` is treated as `unknown` and validated with a type guard (`isProductsResponse`) before use. ESLint's `no-explicit-any` and `no-unsafe-*` rules enforce this.

## Extending

- **Make another column sortable** (e.g. title): add `'title'` to `ProductSortField` in `types/product.ts`, then set `sortField: 'title'` on that column in `components/productColumns.ts`.
- **Add a column:** add an entry to `productColumns`. If it needs a new API field, add the field to `Product`, `isProduct` and `PRODUCT_FIELDS`.
- **Add a filter** (e.g. category): add it to `ProductsTableState` and the reducer, pass it through `FetchProductsParams`/`buildProductsUrl`, and render a control in `ProductsToolbar`. The query key picks it up automatically.
- **Add a feature:** create `src/features/<name>/` with the same layout and export its public pieces from `index.ts`.
