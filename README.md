# Snowii Loading Screen v1

A modern, feature-rich loading screen for FiveM servers with music integration, staff information, updates section, and more.

## Features

### 1. Dynamic Loading Progress
- Real-time loading progress synchronization with FiveM
- Sleek circular progress indicator
- Smooth animations and transitions
- Centered loading percentage display

### 2. Music Player
- YouTube integration for music playback
- Full playlist management system
- Features:
  - Play/Pause functionality
  - Next/Previous track controls
  - Track progress bar with time display
  - Search YouTube videos directly
  - Custom playlist creation
  - Beautiful album art display
  - Rotating album art animation during playback

### 3. Staff Team Section
- Display server staff members
- For each staff member:
  - Profile picture
  - Name
  - Role
  - Custom styling for different staff ranks

### 4. Updates Section
- List of server updates and announcements
- Features for each update:
  - Title
  - Date
  - Description
  - Thumbnail image
  - Clean card-based layout

### 5. Featured Video
- Showcase important server content
- Video player with custom controls
- Thumbnail support
- Autoplay configuration options

### 6. Social Links
- Integrated social media connections
- Supported platforms:
  - Discord
  - YouTube
  - Twitch
  - Facebook
- Customizable icons and links

### 7. Keyboard Information
- Display of important keybinds
- Server-specific information
- Clean, minimalist design

## Configuration

All features can be customized through the `config.js` file:

```javascript
{
    youtube: {
        apiKey: "YOUR_API_KEY"  // Required for YouTube integration
    },
    authors: [
        {
            name: "Staff Name",
            role: "Staff Role",
            avatar: "path/to/avatar.png"
        }
        // Add more staff members
    ],
    updates: [
        {
            title: "Update Title",
            date: "Update Date",
            description: "Update Description"
        }
        // Add more updates
    ],
    featuredVideo: {
        url: "path/to/video.mp4",
        thumbnail: "path/to/thumbnail.jpg"
    },
    socials: {
        discord: "your-discord-url",
        youtube: "your-youtube-url",
        twitch: "your-twitch-url",
        facebook: "your-facebook-url"
    }
}
```

## Installation

1. Download the resource
2. Place it in your server's resources folder
3. Add `ensure snowii_loadingscreenv1` to your server.cfg
4. Configure the `config.js` file with your settings
5. Restart your server

## Requirements

- FiveM server
- YouTube API key (for music player functionality)

## Customization

The loading screen can be customized through:
- `styles/main.css` for visual modifications
- `config.js` for content and functionality
- `index.html` for structure changes

## Performance

- Optimized for fast loading
- Minimal resource usage
- Smooth animations and transitions
- Efficient event handling

## Support

For support or feature requests, please contact through:
- Discord: [snowiii]
- GitHub Issues: [https://github.com/iikxshi]

## License

MIT License

Copyright (c) 2024 snowiii

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Credits

Created by [snowiii]
Version 1.0 
