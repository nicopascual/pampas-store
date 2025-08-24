# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Pampas Store**, an e-commerce platform designed specifically for Latin American markets. This is the frontend client built with TanStack Start, focusing on superior user experience and LATAM market integration.

## Architecture

### Frontend (client/)

- **Framework**: TanStack Start with React & TypeScript
- **Routing**: File-based routing via TanStack Router
- **Data Management**: TanStack Query for server state, TanStack Forms for forms
- **Styling**: Tailwind CSS 4 with Shadcn/ui components
- **Internationalization**: Paraglide.js for Spanish/Portuguese/English support
- **Monitoring**: Sentry for error tracking and instrumentation

## Development Commands

```bash
npm install           # Install dependencies
npm run dev          # Development server (port 3000)
npm run build        # Production build
npm run start        # Start production server
npm run test         # Run Vitest tests
npm run lint         # ESLint check
npm run format       # Prettier format
npm run check        # Format and lint fix
```

### Adding Components

Use the latest Shadcn version:

```bash
pnpx shadcn@latest add button
```

## Key File Locations

### Router Configuration

- `src/router.tsx` - Main router factory with TanStack Query integration
- `src/routeTree.gen.ts` - Auto-generated route tree (don't edit)
- `src/routes/` - File-based route definitions

### Internationalization

- `project.inlang/settings.json` - Paraglide configuration
- `messages/` - Translation files (en.json, es.json, pt.json)
- `src/lib/paraglide/` - Generated i18n files

### Component Structure

- `src/components/ui/` - Shadcn UI components
- `src/components/` - Custom application components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and configurations

## Development Notes

### Sentry Integration

- Error collection configured in `src/router.tsx`
- Instrument server functions with `Sentry.startSpan`
- Import: `import * as Sentry from '@sentry/tanstackstart-react'`

### Demo Files

Files prefixed with `demo` can be safely deleted - they're provided as examples.

## Code Style

- Follow TanStack conventions for routing and data fetching
- Use TypeScript strictly
- Prefer TanStack Query for server state management
- Use TanStack Forms for form handling
- Follow Shadcn patterns for UI components

## Important Patterns

1. **Router Factory**: Use `createRouter()` function from `router.tsx`, don't import a static router instance
2. **Server Functions**: Wrap lengthy operations with Sentry spans
3. **Internationalization**: Messages managed through Paraglide.js system
4. **Component Structure**: UI components in `src/components/ui/` following Shadcn patterns
