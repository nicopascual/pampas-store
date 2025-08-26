# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Build application for production
- `pnpm preview` - Preview production build locally
- `pnpm install` - Install dependencies

### Code Generation & GraphQL
- `pnpm codegen` - Generate TypeScript types from GraphQL schema
- `pnpm codegen:watch` - Watch mode for GraphQL code generation

### UI Components
- `pnpm shadcn:add <component>` - Add shadcn/ui components

### Linting
- ESLint is configured via `.nuxt/eslint.config.mjs` (auto-generated)

## Architecture Overview

This is a **Nuxt 4** admin panel application with the following key architectural decisions:

### Framework Stack
- **Nuxt 4** with Vue 3 and TypeScript
- **TailwindCSS 4** for styling with Vite plugin integration
- **shadcn/ui** components (New York style) with Lucide icons
- **Apollo Client** for GraphQL API communication
- **Nuxt i18n** for internationalization (English, Spanish, Portuguese)

### Project Structure
- `app/` - Main application directory (Nuxt 4 structure)
  - `app.vue` - Root application component
  - `components/ui/` - shadcn/ui components
  - `lib/utils.ts` - Utility functions
  - `assets/css/tailwind.css` - TailwindCSS entry point
- `graphql/queries/` - GraphQL query definitions
- `i18n/locales/` - Translation files (en.json, es.json, pt.json)
- `types/graphql.ts` - Auto-generated GraphQL TypeScript types

### Key Configuration
- **Path alias**: `@/*` maps to `./app/*`
- **GraphQL endpoint**: `http://server.test/graphql`
- **Component directory**: `./app/components/ui` for shadcn components
- **i18n strategy**: `no_prefix` with browser language detection

### GraphQL Integration
- Uses `@graphql-codegen/cli` to generate types from schema
- Apollo client configured for GraphQL endpoint
- Vue composition functions generated for queries/mutations
- GraphQL files are watched for auto-generation

### Styling & UI
- TailwindCSS 4 with CSS variables for theming
- shadcn/ui components with neutral base color
- Component aliases configured in `components.json`
- Lucide icons as the icon library

### Development Workflow
1. GraphQL schema changes trigger automatic type generation
2. Components use generated composables for type-safe GraphQL operations
3. i18n keys should be added to all three locale files
4. New UI components added via `pnpm shadcn:add`

You are an expert in TypeScript, Node.js, NuxtJS, Vue 3, Shadcn Vue, Radix Vue, VueUse, and Tailwind.

   Code Style and Structure
    - Write concise, technical TypeScript code with accurate examples.
    - Use composition API and declarative programming patterns; avoid options API.
    - Prefer iteration and modularization over code duplication.
    - Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError).
    - Structure files: exported component, composables, helpers, static content, types.

   Naming Conventions
    - Use lowercase with dashes for directories (e.g., components/auth-wizard).
    - Use PascalCase for component names (e.g., AuthWizard.vue).
    - Use camelCase for composables (e.g., useAuthState.ts).

   TypeScript Usage
    - Use TypeScript for all code; prefer types over interfaces.
    - Avoid enums; use const objects instead.
    - Use Vue 3 with TypeScript, leveraging defineComponent and PropType.

   Syntax and Formatting
    - Use arrow functions for methods and computed properties.
    - Avoid unnecessary curly braces in conditionals; use concise syntax for simple statements.
    - Use template syntax for declarative rendering.

   UI and Styling
    - Use Shadcn Vue, Radix Vue, and Tailwind for components and styling.
    - Implement responsive design with Tailwind CSS; use a mobile-first approach.

   Performance Optimization
    - Leverage Nuxt's built-in performance optimizations.
    - Use Suspense for asynchronous components.
    - Implement lazy loading for routes and components.
    - Optimize images: use WebP format, include size data, implement lazy loading.

   Key Conventions
    - Use VueUse for common composables and utility functions.
    - Optimize Web Vitals (LCP, CLS, FID).
    - Utilize Nuxt's auto-imports feature for components and composables.

   Nuxt-specific Guidelines
    - Follow Nuxt 4 directory structure (e.g., pages/, components/, composables/).
    - Use Nuxt's built-in features:
        - Auto-imports for components and composables.
        - File-based routing in the pages/ directory.
        - Server routes in the server/ directory.
        - Leverage Nuxt plugins for global functionality.
    - Use useFetch and useAsyncData for data fetching.
    - Implement SEO best practices using Nuxt's useHead and useSeoMeta.

   Vue 3 and Composition API Best Practices
    - Use <script setup> syntax for concise component definitions.
    - Leverage ref, reactive, and computed for reactive state management.
    - Use provide/inject for dependency injection when appropriate.
    - Implement custom composables for reusable logic.

   Follow the official Nuxt.js and Vue.js documentation for up-to-date best practices on Data Fetching, Rendering, and Routing.
      