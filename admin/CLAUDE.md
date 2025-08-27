# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit-based admin application for the Pampas Store, featuring internationalization support and modern UI components. The project uses Svelte 5, TypeScript, TailwindCSS, and shadcn-svelte components.

## Commands

### Development
- `npm run dev` - Start development server on port 3000
- `npm run dev -- --open` - Start dev server and open browser

### Building & Preview
- `npm run build` - Create production build
- `npm run preview` - Preview production build

### Code Quality
- `npm run check` - Type check with svelte-check
- `npm run check:watch` - Type check in watch mode
- `npm run lint` - Run prettier check and ESLint
- `npm run format` - Format code with prettier

### Testing
- `npm run test:unit` - Run unit tests with Vitest
- `npm run test:e2e` - Run end-to-end tests with Playwright
- `npm run test` - Run both unit and e2e tests

## Architecture

### Core Technologies
- **SvelteKit**: Full-stack framework with adapter-auto
- **Svelte 5**: Component framework with new syntax ($props, {@render})
- **TypeScript**: Strict mode enabled with bundler module resolution
- **TailwindCSS 4.0**: Utility-first CSS with Vite plugin
- **Vite**: Build tool and dev server

### Internationalization (i18n)
- **Paraglide JS**: Type-safe i18n with inlang integration
- **Supported locales**: English (en), Spanish (es), Portuguese (pt)
- **Message files**: Located in `messages/{locale}.json`
- **Generated code**: Auto-generated in `src/lib/paraglide/`
- **Middleware**: Handles locale detection and URL rewriting via hooks

### UI Components
- **shadcn-svelte**: Modern component library with bits-ui primitives
- **Components**: Located in `src/lib/components/ui/`
- **Utilities**: `cn()` function for conditional class merging
- **Theme**: Stone base color scheme
- **Icons**: Lucide Svelte for consistent iconography

### Testing Setup
- **Unit Tests**: Vitest with browser mode using Playwright
- **E2E Tests**: Playwright with automated build and preview
- **Component Tests**: Svelte-specific testing with vitest-browser-svelte
- **Test Files**: `.spec.ts` and `.test.ts` patterns supported

### Project Structure
- `src/routes/` - SvelteKit pages and layouts
- `src/lib/components/` - Reusable Svelte components
- `src/lib/components/ui/` - shadcn-svelte UI components
- `src/lib/paraglide/` - Auto-generated i18n code (do not edit manually)
- `src/hooks.ts` - Client-side hooks for URL handling
- `src/hooks.server.ts` - Server-side hooks for i18n middleware
- `messages/` - Translation files
- `e2e/` - End-to-end test files

### Key Configuration Files
- `components.json` - shadcn-svelte configuration with path aliases
- `project.inlang/settings.json` - Internationalization settings
- `vite.config.ts` - Vite configuration with Paraglide plugin
- `svelte.config.js` - SvelteKit configuration with adapter-auto

### Development Patterns
- Use `$props()` for component properties in Svelte 5
- Use `{@render children?.()}` for slot content
- Import UI components from `$lib/components/ui/` barrel exports
- Use `cn()` utility for conditional class names
- Follow existing TypeScript strict mode conventions
- always use pnpm as the package manager