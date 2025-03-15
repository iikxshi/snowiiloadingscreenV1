fx_version 'cerulean'
game 'gta5'

author 'snowiii'
description 'Advanced FiveM Loading Screen with Music Player, Authors, Updates, and Featured Video'
version '1.0.0'

loadscreen 'index.html'

files {
    -- HTML, CSS, JS files
    'index.html',
    'styles/main.css',
    'js/config.js',
    'js/app.js',

    -- Assets directories (automatically loads all files in these directories)
    'assets/**/*',
    'assets/authors/*.jpg',
    'assets/music/*.mp3',
    'assets/video/*.*'
}

loadscreen_manual_shutdown 'yes'

client_script 'client.lua' 