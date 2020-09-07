let mix = require('laravel-mix');

mix.options({
    processCssUrls: false
});

mix
    .js('resources/js/app.js', 'public/js')
    .less('resources/markup/styles/main.less', 'public/css/main.css')
