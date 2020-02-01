<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel-Vuetify-Auth</title>

        <link rel="stylesheet" href="{{ asset('css/app.css')}} ">

    </head>
    <body>
        <v-app id="app">
            <example-component></example-component>
        </v-app>

        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
