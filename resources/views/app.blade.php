<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />

    <!-- Prefetch common routes -->
    @auth
    <link rel="prefetch" href="{{ route('projects.index') }}">
    @endauth

    <!-- Preload critical resources -->
    <link rel="modulepreload" href="{{ Vite::asset('resources/js/app.tsx') }}">
    <link rel="preload" href="{{ Vite::asset('resources/css/app.css') }}" as="style">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased text-text bg-bg">
    @inertia
</body>

</html>