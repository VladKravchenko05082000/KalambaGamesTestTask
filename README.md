# Conduit — Frontend Engineer Assignment

Frontend implementation of [Conduit](https://demo.realworld.io/) (a Medium clone) on the provided
Create React App skeleton, consuming the provided Dockerized API.

## Tech stack

- **React 17 + TypeScript** (CRA skeleton)
- **react-router-dom v5** — routing (`HashRouter`, per the skeleton)
- **@tanstack/react-query v4** — server state: caching, optimistic updates
- **axios** — HTTP client
- **date-fns** — date formatting
- **marked + DOMPurify** — optional Markdown → sanitized HTML for article bodies

Auth (client state) uses **Context + `useReducer`**; server state uses **React Query**. No
state-management library — see [Trade-offs](#trade-offs).

## Getting started

**Prerequisites:** Docker + Docker Compose; Node.js `14.17.3` (`.nvmrc`) for the dev server.

**1. Backend (provided API)** — from the repo root:

```bash
docker-compose up                              # start API on http://localhost:3000
docker-compose run --rm api npm run db:reset   # seed / reset the database
docker-compose down --remove-orphans           # tear down
```

**2a. Frontend via Docker** (how reviewers run it; backend must be running):

```bash
docker build -t job-assignment-frontend-engineer .
docker run --rm -p 8080:80 job-assignment-frontend-engineer   # http://localhost:8080
```

**2b. Frontend dev server:**

```bash
npm install
npm start   # http://localhost:8080 (PORT=8080 in .env — no clash with the API on 3000)
```

**Test credentials:**

| Email             | Password           |
| ----------------- | ------------------ |
| alice@example.com | `I_<3-R0ber7`      |
| bob@example.com   | `4L1ce-I5 mY_li3f` |

## Testing

```bash
npm test
```

Small, representative suite (not full coverage, per the brief): **`FavoriteButton`** and
**`FollowButton`** call the API when authenticated and redirect anonymous users to login;
`FollowButton` also hides on the user's own profile.

## Project structure & import conventions

```
src/
  api/         HTTP client, endpoint functions, request/response types
  context/     AuthContext (Context + useReducer)
  store/       authStore (token persistence)
  components/  shared UI (Layout, Avatar, FavoriteButton, FollowButton)
  hooks/       cross-cutting hooks (useToggleFavorite, useToggleFollow)
  lib/         queryKeys, markdown, shared interfaces/types, ApiError
  pages/       route-level features (home, article, profile, login/logout)
```

**Module boundaries:** a flat folder (no subfolders) exposes its files directly; a folder with
subfolders exposes a single **`index.ts`** as its public API — everything else inside is internal and
must not be imported by sibling modules.

## Architecture

- **Layered HTTP.** `api/client` is a thin transport (axios instance + error normalization to
  `ApiError`); endpoint functions wrap requests per resource. A request interceptor attaches the token;
  a `401` while a token is present clears the session.
- **Auth.** `AuthContext` owns the current user; `authStore` persists the JWT. Login/logout
  invalidate/clear the React Query cache so personalized flags (`favorited` / `following`) never leak
  across users.
- **Server state.** React Query with a centralized query-key factory (`lib/queryKeys`). Favorite/follow
  use optimistic updates with snapshot rollback on error and invalidation on settle.
- **Markdown.** Article bodies are parsed with `marked` and sanitized with `DOMPurify` before
  `dangerouslySetInnerHTML` (XSS mitigation).

## Trade-offs

- **Context + `useReducer` over a state library.** The only global client state is the current user;
  React Query owns server state. A store (Redux/Zustand) would add a dependency without clear benefit
  at this scope. Trade-off: a dedicated store scales better if global client state grows.
- **`authStore` is a thin `localStorage` wrapper, not a reactive store.** The client reads the token
  live on each request, so there is no in-memory copy to keep in sync. Trade-off: transport knows the
  token lives in storage (minor session-concern leak), accepted for simplicity.
- **JWT in `localStorage`, not an httpOnly cookie.** `localStorage` is XSS-vulnerable; an
  httpOnly + Secure cookie is safer, but the API returns the token in the body and expects it in the
  `Authorization` header — cookies would require backend changes (backend is provided as-is). Conscious
  trade-off; see TODOs.
- **`401` handled in the axios interceptor** — it clears the session and redirects, slightly coupling
  transport to routing. Cleaner: the interceptor only reports the `401` and `AuthContext` owns the
  policy.
- **Optimistic updates add complexity** (snapshot + rollback) but are the intended UX showcase for the
  favorite/follow buttons.
- **Pinned versions for the legacy toolchain.** react-scripts 4 uses webpack 4, so `date-fns@2`,
  `marked@4`, and `dompurify@2` are pinned — newer ESM-only releases fail to build.
- **Vendored `main.css`.** The skeleton's theme CDN (`//demo.productionready.io/main.css`) now `404`s,
  so a known-good copy is vendored in `public/` for a self-contained, reproducible build (incl. Docker).
  Design is unchanged — this only restores the intended styles.

## Intentionally out of scope

Per the brief ("implement at most the listed pages", "do not implement requirements not listed"):

- **Tags** and **comments** — kept visually where present, not wired.
- **User registration**, **Settings**, and **Editor** pages.
- **Guarded routes** — all required pages are public in Conduit; the only private pages
  (Settings/Editor) are out of scope.
- **Pagination**, **"Your Feed"**, and the profile **"Favorited Articles"** tab.
- **Followers count** — follow reflects state and performs the action, but no count is shown: the API
  does not return one (`Profile` only exposes `following`). The skeleton's count is a placeholder.

## TODOs / future improvements

- Migrate auth to server-managed **httpOnly + Secure cookies** (needs backend support) to remove the
  `localStorage` XSS exposure.
- Add a **token-refresh flow** (the API issues one long-lived JWT, no refresh endpoint).
- Move the **`401` policy** out of transport into `AuthContext`.
- Make the **API base URL runtime-configurable** (currently baked at build time via
  `REACT_APP_API_URL`, default `http://localhost:3000/api`).
- Add **route guards** once Settings/Editor exist.
- Implement **pagination** (`limit` / `offset`), **tag filtering**, **comments**, **"Your Feed"**, and
  the profile **"Favorited Articles"** tab.
- Replace text loading/error states with **skeletons** and user-facing **error toasts**.
- Promote shared **`ArticlePreview`** / **`useArticles`** out of `pages/home` (reused by the profile
  page).
- Broaden **test coverage** (auth reducer, optimistic-update hooks, page-level integration tests).
