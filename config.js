const config = {
    // Server Information
    serverName: "Your Server Name",
    serverDescription: "Welcome to our FiveM server!",
    
    // Background Configuration
    background: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg",
    
    // YouTube Configuration
    youtube: {
        apiKey: "YOUR_API_KEY", // Replace with your actual YouTube API key
        defaultPlaylist: [
            "s2WSQMKvn9U", // Example video ID
            "VIDEO_ID_2",
            "VIDEO_ID_3"
        ]
    },
    
    // Staff Team
    authors: [
        {
            name: "John Deere",
            role: "Owner of a Project",
            avatar: "assets/authors/john.jpg"
        },
        {
            name: "Romario O'Neal",
            role: "Designer",
            avatar: "assets/authors/romario.jpg"
        },
        {
            name: "Alice Smith",
            role: "Community Manager",
            avatar: "assets/authors/alice.jpg"
        },
        {
            name: "Michael Johnson",
            role: "Lead Developer",
            avatar: "assets/authors/michael.jpg"
        }
    ],
    
    // Music Player Configuration
    music: [
        {
            title: "Travis Scott",
            artist: "FEIN",
            file: "assets/music/track1.mp3",
            image: "assets/music/track1.jpg"
        }
    ],
    
    // Updates Section
    updates: [
        {
            date: "01.01.2024 / 12:00",
            title: "Update 1.0",
            description: "Initial release of the application with core features.",
            image: "assets/updates/update1.jpg"
        },
        {
            date: "15.01.2024 / 14:30",
            title: "Update 1.1",
            description: "Bug fixes and performance improvements.",
            image: "assets/updates/update2.jpg"
        }
    ],
    
    // Featured Video
    featuredVideo: {
        defaultVideoId: "dQw4w9WgXcQ", // Default video to show (can be changed)
        autoplay: false, // Whether to autoplay the video
        showControls: true // Whether to show video controls
    },
    
    // Social Media Links
    socials: {
        discord: "https://discord.gg/yourserver",
        youtube: "https://youtube.com/yourchannel",
        twitch: "https://twitch.tv/yourchannel",
        facebook: "https://facebook.com/yourpage"
    },
    
    // Theme Settings
    settings: {
        accentColor: "#00f2ff",
        loadingBarColor: "#00f2ff"
    },

    // Keybinds Configuration
    keybinds: {
        general: [
            { key: "M", action: "Open Phone", position: { x: 45, y: 30, width: 30, height: 30 } },
            { key: "F1", action: "Help Menu", position: { x: 15, y: 10, width: 30, height: 30 } },
            { key: "I", action: "Inventory", position: { x: 40, y: 30, width: 30, height: 30 } },
            { key: "T", action: "Chat", position: { x: 25, y: 30, width: 30, height: 30 } }
        ],
        vehicle: [
            { key: "F", action: "Enter/Exit Vehicle", position: { x: 35, y: 30, width: 30, height: 30 } },
            { key: "L", action: "Toggle Lights", position: { x: 50, y: 30, width: 30, height: 30 } },
            { key: "X", action: "Hands Up", position: { x: 30, y: 30, width: 30, height: 30 } },
            { key: "B", action: "Toggle Seatbelt", position: { x: 40, y: 40, width: 30, height: 30 } }
        ],
        combat: [
            { key: "SPACE", action: "Jump/Climb", position: { x: 35, y: 50, width: 90, height: 30 } },
            { key: "CTRL", action: "Crouch", position: { x: 15, y: 50, width: 40, height: 30 } },
            { key: "R", action: "Reload", position: { x: 35, y: 30, width: 30, height: 30 } }
        ],
        custom: []  // Will be populated from server
    }
}; 