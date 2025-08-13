# Project Memory

## File Naming Conventions

### React Components & Pages
- **Use kebab-case for ALL React filenames** (components, pages, hooks, utils)
- Examples:
  - `confirm-password.tsx` ✅ (not `ConfirmPassword.tsx`)
  - `project-header.tsx` ✅ (not `ProjectHeader.tsx`) 
  - `user-menu.tsx` ✅ (not `UserMenu.tsx`)

### Auth Pages (Completed Migration)
- All auth pages migrated to kebab-case:
  - `confirm-password.tsx`
  - `register.tsx` 
  - `forgot-password.tsx`
  - `verify-email.tsx`
  - `reset-password.tsx`
  - `login.tsx` (already correct)

### Controllers Updated
- All Laravel auth controllers updated to reference kebab-case page names:
  - `'auth/confirm-password'` instead of `'Auth/ConfirmPassword'`
  - `'auth/register'` instead of `'Auth/Register'`
  - etc.

## Code Quality Standards

### Import Organization
- **Prettier with import sorting configured** using prettier-plugin-import-sort
- Imports automatically sorted in order:
  1. External libraries (react, @inertiajs/react, etc.)
  2. Internal modules with @/ alias
  3. Relative imports
- Configuration in `.prettierrc` and `package.json`

### Form Management  
- **Migrated from Zustand to React Hook Form** for project editing
- Component-scoped form state instead of global state
- Auto-save using `useInterval` with form dirty detection
- Form reset using `reset(undefined, { keepValues: true })` after successful saves

### Component Patterns
- **Controlled components**: Use `value`/`onChange` props, not `{...register()}`
- **Named exports preferred** over default exports (except Inertia pages)
- **TypeScript strict mode** with proper typing throughout

## Current Architecture

### Project Management
- URL-based routing for project selection
- React Hook Form for form state management  
- TipTap editor with toolbar state tracking using `useEditorState`
- Auto-save functionality with debouncing
- HeadlessUI dropdowns for status/priority selection

### Key Issues Resolved
- ✅ Priority/status dropdowns using proper controlled component props
- ✅ Editor toolbar active states syncing with cursor position
- ✅ Auto-save with proper dirty state management
- ✅ Consistent kebab-case file naming across auth pages
- ✅ Import sorting with Prettier integration

## Development Commands
- `npm run format` - Format code and sort imports
- `composer dev` - Start full Laravel development server
- `npm run dev` - Start Vite development server
- `npm run build` - Generate types and build assets