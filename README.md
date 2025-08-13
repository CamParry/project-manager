# Project Manager

A clean and simple project management application built with Laravel and React.

## Features

- **Project Management**: Create, edit, and organize projects with status tracking
- **Priority System**: Set project priorities (Urgent, High, Medium, Low)
- **Status Tracking**: Track progress through status updates (Not Started, Waiting, In Progress, On Hold, Cancelled, Completed)
- **Rich Text Editing**: Write detailed project descriptions with TipTap editor
- **Clean Interface**: Minimal, focused design for productivity

## Tech Stack

- **Backend**: Laravel 12 with SQLite database
- **Frontend**: React 19 + TypeScript + Inertia.js
- **Styling**: Tailwind CSS v4
- **Authentication**: Laravel Breeze
- **Type Safety**: Auto-generated TypeScript types from PHP Data classes

## Quick Start

1. **Install dependencies**

    ```bash
    composer install
    npm install
    ```

2. **Setup environment**

    ```bash
    cp .env.example .env
    php artisan key:generate
    php artisan migrate:refresh --seed
    ```

3. **Start development servers**

    ```bash
    composer dev  # Starts Laravel + queue + logs + Vite
    ```

4. **Create a user**
    ```bash
    php artisan user:create your@email.com password123
    ```

Visit `http://localhost:8000` and login to start managing your projects.

## Commands

- `composer dev` - Full development server
- `composer test` - Run tests
- `npm run build` - Build for production
- `vendor/bin/pint` - Format PHP code

## License

Open source project for personal and educational use.
