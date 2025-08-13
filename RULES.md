# Claude Code Rules

## General Principles

- Follow the established style guide for each language
- Keep functions small and focused on a single responsibility
- Avoid complexity and premature abstraction
- Prioritise clean and readable code
- Prefer composition over inheritance where appropriate
- Always analyise if the chosen approach is ideal for the situation
- If you notice a something has been changed don't revert it without asking

## Comments and Documentation

- Only use comments when necessary to explain code that is hard to understand
- Use meaningful variable and function names that describe their purpose
- Avoid redundant comments that simply restate what the code does

## Type Safety and Syntax

- Always validate syntax and type errors before submitting code
- Run appropriate linters and type checkers for the target language
- Use strict typing where available to catch errors early

## Code Reusability and Consistency

- Check for existing components or functionality before creating new ones
- Review similar files to ensure consistent coding patterns and conventions
- Follow established architectural patterns within the project
- Maintain consistent naming conventions across the codebase

## Error Handling

- Implement proper error handling and validation
- Use language-appropriate error handling mechanisms (try/catch, Result types, etc.)
- Provide meaningful error messages for debugging
- Handle edge cases and null/undefined values appropriately

## Performance Considerations

- Be mindful of obvious performance issues
- Avoid unnecessary operations and premature optimization
- Write efficient database queries with proper indexing
- Use appropriate data structures for the task
- Consider memory usage for large datasets
- Profile code when performance is critical

## Security Guidelines

- Validate all user inputs
- Use parameterized queries for database operations
- Implement proper authentication and authorization
- Avoid hardcoded secrets and credentials
- Follow OWASP guidelines for web applications
- Sanitize outputs to prevent XSS attacks

## Git and Version Control

- Write clear, descriptive commit messages
- Keep commits atomic and focused
- Use branching strategies appropriate for the project
- Review diffs before committing to catch unintended changes

## PHP

- Use PHP 8.3+ features where appropriate
- Follow PSR-12 coding standards
- Specify input parameter and return types explicitly, use PHPDoc when needed for complex types
- Use nullable types (`?Type`) and union types (`Type1|Type2`) appropriately
- Use `match` over `switch` statements where possible for better type safety
- Use constructor property promotion for cleaner code
- Use enums when a value has a small, limited set of options
- Add `use` statements with full paths at the top of files instead of inline imports

## TypeScript

- Use TypeScript strict mode configuration
- Specify explicit types for function parameters and return values
- Prefer `types` over `interfaces` unless necessary
- Prefer `const` over `let` unless the variable will change
- Avoid `any` type - use `unknown` when type is truly unknown
- Use generic types for reusable components and functions
- Use optional chaining (`?.`) and nullish coalescing (`??`) operators
- Implement proper error boundaries and type guards
- Use utility types (`Partial`, `Pick`, `Omit`) for type transformations
- Export types and interfaces when shared

## Laravel

- Use Laravel 12 features and directory structure
- Follow Laravel conventions and naming patterns
- Use Laravel artisan:make commmands to create laravel components such as controllers, policies, form requests, etc
- Use Laravel's built-in features like Eloquent, queues, validation, and form requests
- When creating controllers, put validation in form requests for better separation of concerns
- Use Spatie Data objects for controller responses to auto-generate frontend types
- Use Eloquent relationships instead of raw SQL where possible

## Inertia

- Prefer `Link` components over `router` methods for better performance and UX
- Use the auto-generated TypeScript types for page props
- Extract utility functions and hooks into a `utils` directory for reusability
- Use HeadlessUI for creating new interactive components like dropdowns and menus
- Use Inertia's form helper for handling form submissions and validation errors
- Implement proper loading states and error handling for async operations
- Use shared components for common UI elements across pages

## Tailwind

- Use Tailwind v4 including the configuration in the css file
- When the width and height it the same, use the size- utility instead of w- h-
