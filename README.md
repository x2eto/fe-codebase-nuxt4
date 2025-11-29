# fe-codebase-nuxt4

A Nuxt 4 front-end example repo used to simulate and demo everyday product flows. The current demo focuses on a “quiz flow optimization” that showcases fast client-side preloading, large-list handling, lightweight transitions, and defensive navigation.

## Why This Repo

- Prototype common front-end interactions quickly without heavy setup
- Validate UX flows like prefetching, step-by-step navigation, and transitions
- Practice handling large in-memory datasets efficiently (5,000 items)
- Reuse composable-based state patterns across small demos

## Tech Stack

- Nuxt 4 (`nuxt@^4.2.1`)
- Vue 3 (`vue@^3.5.24`)
- Vue Router (`vue-router@^4.6.3`)
- TypeScript

## Current Demo: Quiz Flow Optimization

- Preload quiz data on landing, then navigate to `/quiz` (`app/pages/index.vue:51-58`, `app/pages/index.vue:76-80`)
- Progress indicator and smooth transitions with defensive redirect if data is missing (`app/pages/quiz.vue:48-51`, `app/pages/quiz.vue:54-58`)
- Shared state via `useState` + `shallowRef` for efficient large arrays (`app/composables/useQuiz.ts:8-12`)
- In-flight request caching to avoid duplicate fetches (`app/composables/useQuiz.ts:13-23`)
- Client-only `$fetch('/api/questions')` to keep SSR responsive (`app/composables/useQuiz.ts:26-33`)
- Mock API returns 5,000 questions after 1.5s delay (`server/api/questions.get.ts:5-12`, `server/api/questions.get.ts:8-19`)

## Try It

```bash
npm install
npm run dev
```

- Open `http://localhost:3000`
- Click the primary button to start; data preloads and then navigates to `/quiz`

## Extend With New Demos

- Create a page under `app/pages` for your flow
- Add a composable in `app/composables` to share state and cache requests
- Add a mock endpoint under `server/api` if needed
- Prefer client-only fetching for non-critical data to avoid SSR blocking

## Scripts

- `dev`: start development server
- `build`: build for production
- `generate`: pre-render static pages
- `preview`: preview a production build locally
- `postinstall`: prepare Nuxt

## Project Structure

- `app/pages/index.vue`: landing and preloading flow
- `app/pages/quiz.vue`: quiz UI and transitions
- `app/composables/useQuiz.ts`: shared quiz state and data loading
- `server/api/questions.get.ts`: mock API for questions
- `app/app.vue`: layout and global page transition styles
- `nuxt.config.ts`: configuration (DevTools enabled)

## Notes

- Mock data only; adjust endpoints and data shapes to your scenario
- Use `shallowRef` for large arrays and avoid deep mutations for performance

## Production

```bash
npm run build
npm run preview
```
