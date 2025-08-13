# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@/RULES.md

## Development Commands

### Laravel/PHP

- `composer dev` - Start full development server (Laravel + queue + logs + Vite)
- `composer test` - Run PHPUnit tests with config clearing
- `php artisan serve` - Start Laravel development server only
- `php artisan test` - Run tests directly
- `php artisan pail --timeout=0` - View live logs
- `vendor/bin/pint` - PHP code formatting (Laravel Pint)

### Frontend

- `npm run dev` - Start Vite development server (already running in this session)
- `npm run build` - Generate TypeScript types, build TypeScript and production assets
- `npm run generate-types` - Generate TypeScript types from PHP Data classes
- `tsc` - TypeScript type checking

### Testing

- Uses Pest PHP for testing framework
- Test files in `tests/Feature/` and `tests/Unit/`
- Run single test: `php artisan test --filter=TestName`

## Architecture Overview

### Backend (Laravel 12)

- **Models**: Project management system with `Project`, `ProjectStatus`, `ProjectPriority`
- **Authentication**: Laravel Breeze with Inertia.js integration
- **Database**: SQLite with Eloquent ORM
- **API**: Uses Inertia.js for SPA-style communication (not REST API)
- **Validation**: Uses Form Request classes for controller validation
- **Data Transfer**: Spatie Data objects used for all controller responses with auto-generated TypeScript types

### Frontend (React + TypeScript + Inertia)

- **Framework**: React 19 with TypeScript in strict mode
- **Routing**: Inertia.js for SPA behavior with Laravel backend
- **Styling**: Tailwind CSS v4 (config in CSS file)
- **Components**: Custom Button component system with variants, icons (Lucide React)
- **Forms**: Inertia form helpers with validation error handling and react hook forms
- **Editor**: TipTap rich text editor integration

### Key Components

- `resources/js/Components/Button.tsx` - Unified button component with variants (primary, secondary, success, danger, warning, ghost)
- `resources/js/Components/ProjectList.tsx` & `ProjectEditor.tsx` - Project management UI
- `resources/js/stores/` - Zustand state management
- `resources/js/types/project.ts` - TypeScript definitions for Project entities
- `app/Data/` - Spatie Data objects for structured API responses
- `resources/types/generated.d.ts` - Auto-generated TypeScript types from PHP Data classes

### Database Schema

- Projects with status/priority relationships
- User authentication via Laravel Breeze
- Seeders for ProjectStatus and ProjectPriority lookup tables

## Code Style Guidelines

### PHP

- PHP 8.3+ with strict typing
- PSR-12 coding standards
- Constructor property promotion
- Use `match` over `switch` statements
- Explicit parameter/return types with PHPDoc for complex types

### TypeScript

- Strict mode enabled
- **Always prefer `type` over `interface`** for better consistency and union type support
- Use `const` over `let` when possible
- Avoid `any` type, use `unknown` when needed
- Optional chaining (`?.`) and nullish coalescing (`??`)
- Export shared types and interfaces
- **Prefer named exports over default exports** for better tree-shaking and IDE support

### Styling

- Tailwind v4 with CSS-based configuration
- Use `size-` utility for equal width/height instead of `w-` + `h-`
- HeadlessUI for interactive components

## Project Conventions

- Laravel artisan commands for creating Laravel components
- Inertia Link components preferred over router methods
- Form validation in dedicated Form Request classes
- Eloquent relationships over raw SQL
- Auto-generated TypeScript types from Spatie Data objects using TypeScript Transformer

## Code Quality Standards (Latest Update)

### Recent Optimizations

- **Consistent Exports**: All components use named exports for better tree-shaking (except Inertia pages which require default exports)
- **Type Safety**: Removed all `any` types, replaced with proper TypeScript types
- **Clean Code**: Removed commented-out code, unused imports, and console.logs
- **API Consolidation**: Removed unused hooks, created reusable CSRF utility
- **State Simplification**: Streamlined app store to only manage essential UI state

### Architecture Decisions

- **URL-based Routing**: Project selection managed through URLs instead of global state
- **Server-side Data**: Project data provided by Laravel controllers for better performance
- **Component Composition**: Clean separation between layout, sidebar, and editor components
- **Error Handling**: Proper mutation error handling instead of console logging
- **Data Objects**: Spatie Data objects provide single source of truth for data structure
- **Type Generation**: TypeScript types auto-generated from PHP Data classes on build

### Frontend Conventions

- Use kebab case for React filenames