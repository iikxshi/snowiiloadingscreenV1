# Advanced FiveM Loading Screen

A modern, feature-rich loading screen for FiveM servers with a sleek design, music player, server information, and more.

## Features

### 1. Modern Three-Column Layout
- Left Panel: Staff Team & Updates
- Center: Music Player & Social Links
- Right Panel: Featured Video & Server Information

### 2. Staff Team Section
- Clean list of staff members
- Profile pictures
- Role display
- Hover animations
- Custom styling for different ranks

### 3. Updates Section
- Server update announcements
- Date and version tracking
- Clean card-based layout
- Hover effects
- Scrollable list

### 4. Minimalist Music Player
- YouTube integration
- Sleek controls:
  - Play/Pause
  - Previous/Next track
  - Shuffle and Repeat options
- Progress bar with time display
- Track title and artist display
- Fixed position at bottom of screen

### 5. Server Information
- Real-time player count
- Current server time
- Server status indicator
- Server description
- Animated info cards
- Auto-updating statistics

### 6. Featured Video
- YouTube video showcase
- Custom video player
- Server promotional content
- Configurable video source

### 7. Social Links
- Discord integration
- YouTube channel link
- Twitch stream link
- Facebook page link
- Clean icon design
- Hover effects

### 8. Loading Status
- Clean loading text display
- Bottom-right position
- Semi-transparent background
- Progress indication

## Installation

1. Download the resource
2. Place it in your server's resources folder
3. Add to your server.cfg:
```cfg
ensure snowii_loadingscreenv1
```

## Configuration

All features can be customized through the `config.js` file:

```javascript
const config = {
    // Server Information
    serverName: "Your Server Name",
    serverDescription: "Welcome to our FiveM server!",
    
    // YouTube Configuration
    youtube: {
        apiKey: "YOUR_API_KEY",
        defaultPlaylist: [
            "VIDEO_ID_1",
            "VIDEO_ID_2"
        ]
    },
    
    // Staff Team Configuration
    authors: [
        {
            name: "Staff Name",
            role: "Staff Role",
            avatar: "path/to/avatar.jpg"
        }
    ],
    
    // Updates Configuration
    updates: [
        {
            date: "Date",
            title: "Update Title",
            description: "Update Description"
        }
    ],
    
    // Featured Video
    featuredVideo: {
        defaultVideoId: "VIDEO_ID",
        autoplay: false,
        showControls: true
    },
    
    // Social Media Links
    socials: {
        discord: "your-discord-url",
        youtube: "your-youtube-url",
        twitch: "your-twitch-url",
        facebook: "your-facebook-url"
    },
    
    // Theme Settings
    settings: {
        accentColor: "#00ffff",
        loadingBarColor: "#00ffff"
    }
}
```

## Customization

The loading screen can be customized through:
- `main.css` for visual modifications
- `config.js` for content and functionality
- `index.html` for structure changes

## Requirements

- FiveM server
- YouTube API key (for music player functionality)

## Support

For support or feature requests, please contact:
- Discord: [Your Discord]
- GitHub Issues: [Your GitHub]

## License

MIT License - See LICENSE file for details

## Credits

Created by snowiii
Version 2.0 