fx_version 'cerulean'
game 'gta5'

author 'snowiii'
description 'Advanced FiveM Loading Screen with Music Player, Authors, Updates, and Featured Video'
version '1.0.0'

loadscreen 'index.html'

-- Enable manual shutdown and mouse focus
loadscreen_manual_shutdown 'yes'
loadscreen_cursor 'yes'

files {
    -- Core files
    'index.html',
    'config.js',
    'app.js',
    'background.js',
    'main.css',

    -- Assets directories
    'assets/**/*',
    'assets/authors/*.jpg',
    'assets/music/*.mp3',
    'assets/video/*.*'
}

client_script 'client.lua' 