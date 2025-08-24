# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Pampas Store**, an e-commerce platform designed specifically for Latin American markets. It's a full-stack application with TanStack Start frontend and Laravel backend, focusing on superior LATAM payment integration, inventory management, and business tools.

## Architecture

### Frontend (client/)
- **Framework**: TanStack Start with React & TypeScript
- **Routing**: File-based routing via TanStack Router
- **Data Management**: TanStack Query for server state, TanStack Forms for forms
- **Styling**: Tailwind CSS 4 with Shadcn/ui components
- **Internationalization**: Paraglide.js for Spanish/Portuguese/English support
- **Monitoring**: Sentry for error tracking and instrumentation

### Backend (server/)
- **Framework**: Laravel 12 (PHP 8.2+)
- **Testing**: Pest testing framework
- **Code Style**: Laravel Pint for formatting
- **Queue System**: Laravel Queues for background jobs
- **Development**: Concurrent server/queue/vite with concurrently

## Development Commands

### Frontend Development (client/)
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

### Backend Development (server/)
```bash
composer install           # Install PHP dependencies
composer run dev          # Start all services (server + queue + vite)
composer run test         # Run Pest tests
php artisan serve         # Laravel dev server only
php artisan queue:listen  # Queue worker
php artisan migrate       # Run database migrations
```

### Adding Components
Use the latest Shadcn version:
```bash
pnpx shadcn@latest add button
```

## Key File Locations

### Router Configuration
- `client/src/router.tsx` - Main router factory with TanStack Query integration
- `client/src/routeTree.gen.ts` - Auto-generated route tree (don't edit)
- `client/src/routes/` - File-based route definitions

### Internationalization
- `client/project.inlang/settings.json` - Paraglide configuration
- `client/messages/` - Translation files (en.json, de.json)
- `client/src/lib/paraglide/` - Generated i18n files

### Backend Structure
- `server/app/` - Laravel application code
- `server/routes/web.php` - Web routes
- `server/database/migrations/` - Database schema
- `server/tests/` - Pest test files

## Development Notes

### Sentry Integration
- Error collection configured in `client/src/router.tsx`
- Instrument server functions with `Sentry.startSpan`
- Import: `import * as Sentry from '@sentry/tanstackstart-react'`

### Database
- Uses SQLite for development (`server/database/database.sqlite`)
- Migrations auto-run on project setup

### Demo Files
Files prefixed with `demo` can be safely deleted - they're provided as examples.

## Code Style

### Frontend
- Follow TanStack conventions for routing and data fetching
- Use TypeScript strictly
- Prefer TanStack Query for server state management
- Use TanStack Forms for form handling

### Backend
- Follow Laravel conventions and PSR standards
- Use Eloquent ORM for database operations
- Test with Pest framework
- Format with Laravel Pint

## Important Patterns

1. **Router Factory**: Use `createRouter()` function from `router.tsx`, don't import a static router instance
2. **Server Functions**: Wrap lengthy operations with Sentry spans
3. **Internationalization**: Messages managed through Paraglide.js system
4. **Component Structure**: UI components in `client/src/components/ui/` following Shadcn patterns
   === tailwindcss/core rules ===

## Tailwind Core

- Use Tailwind CSS classes to style HTML, check and use existing tailwind conventions within the project before writing your own.
- Offer to extract repeated patterns into components that match the project's conventions (i.e. Blade, JSX, Vue, etc..)
- Think through class placement, order, priority, and defaults - remove redundant classes, add classes to parent or child carefully to limit repetition, group elements logically
- You can use the `search-docs` tool to get exact examples from the official documentation when needed.

### Spacing
- When listing items, use gap utilities for spacing, don't use margins.

    <code-snippet name="Valid Flex Gap Spacing Example" lang="html">
        <div class="flex gap-8">
            <div>Superior</div>
            <div>Michigan</div>
            <div>Erie</div>
        </div>
    </code-snippet>


### Dark Mode
- If existing pages and components support dark mode, new pages and components must support dark mode in a similar way, typically using `dark:`.


=== tailwindcss/v4 rules ===

## Tailwind 4

- Always use Tailwind CSS v4 - do not use the deprecated utilities.
- `corePlugins` is not supported in Tailwind v4.
- In Tailwind v4, you import Tailwind using a regular CSS `@import` statement, not using the `@tailwind` directives used in v3:

<code-snippet name="Tailwind v4 Import Tailwind Diff" lang="diff"
- @tailwind base;
- @tailwind components;
- @tailwind utilities;
+ @import "tailwindcss";
  </code-snippet>


### Replaced Utilities
- Tailwind v4 removed deprecated utilities. Do not use the deprecated option - use the replacement.
- Opacity values are still numeric.

| Deprecated |	Replacement |
|------------+--------------|
| bg-opacity-* | bg-black/* |
| text-opacity-* | text-black/* |
| border-opacity-* | border-black/* |
| divide-opacity-* | divide-black/* |
| ring-opacity-* | ring-black/* |
| placeholder-opacity-* | placeholder-black/* |
| flex-shrink-* | shrink-* |
| flex-grow-* | grow-* |
| overflow-ellipsis | text-ellipsis |
| decoration-slice | box-decoration-slice |
| decoration-clone | box-decoration-clone |
</laravel-boost-guidelines>
- memorize, the php path is in C:\Users\pascu\.config\herd\bin\php.bat