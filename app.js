document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sections
    initializeStaffTeam();
    initializeMusicPlayer();
    initializeUpdates();
    initializeFeaturedVideo();
    initializeSocialLinks();
    initializeProgress();
    initializeKeyboard();
    initializeServerInfo();
});

// Staff team initialization
function initializeStaffTeam() {
    const staffList = document.getElementById('staff-list');
    
    config.authors.forEach(staff => {
        const staffMember = document.createElement('div');
        staffMember.className = 'staff-member';
        staffMember.innerHTML = `
            <img src="${staff.avatar}" alt="${staff.name}">
            <div class="staff-info">
                <h3>${staff.name}</h3>
                <p>${staff.role}</p>
            </div>
        `;
        staffList.appendChild(staffMember);
    });
}

// Music player initialization
let player;
let currentVideoId = null;
let playlist = [];

function initializeMusicPlayer() {
    const playPauseBtn = document.getElementById('play-pause');
    const prevBtn = document.getElementById('prev-track');
    const nextBtn = document.getElementById('next-track');
    const showPlaylistBtn = document.getElementById('show-playlist');
    const closePlaylistBtn = document.getElementById('close-playlist');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const playlistItems = document.getElementById('playlist-items');
    const playlistUI = document.getElementById('playlist-ui');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const trackImage = document.getElementById('track-image');
    const progressBar = document.getElementById('song-progress');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    
    // Initialize YouTube Player
    window.onYouTubeIframeAPIReady = function() {
        player = new YT.Player('youtube-player', {
            height: '0',
            width: '0',
            playerVars: {
                'playsinline': 1,
                'controls': 0
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    };

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.PLAYING) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            document.querySelector('.track-image').classList.add('playing');
        } else if (event.data === YT.PlayerState.PAUSED) {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            document.querySelector('.track-image').classList.remove('playing');
        } else if (event.data === YT.PlayerState.ENDED) {
            playNext();
        }
    }

    // Update progress bar
    setInterval(() => {
        if (player && player.getCurrentTime) {
            const currentTime = player.getCurrentTime();
            const duration = player.getDuration();
            const progress = (currentTime / duration) * 100;
            
            progressBar.style.width = `${progress}%`;
            currentTimeSpan.textContent = formatTime(currentTime);
            durationSpan.textContent = formatTime(duration);
        }
    }, 1000);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // YouTube Search API
    async function searchYouTube(query) {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${config.youtube.apiKey}`);
            const data = await response.json();
            return data.items;
        } catch (error) {
            console.error('Error searching YouTube:', error);
            return [];
        }
    }

    function displaySearchResults(results) {
        searchResults.innerHTML = '';
        results.forEach(result => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            item.innerHTML = `
                <img src="${result.snippet.thumbnails.default.url}" alt="${result.snippet.title}">
                <div class="item-info">
                    <div class="title">${result.snippet.title}</div>
                    <div class="artist">${result.snippet.channelTitle}</div>
                </div>
            `;
            item.addEventListener('click', () => addToPlaylist(result));
            searchResults.appendChild(item);
        });
    }

    function addToPlaylist(video) {
        playlist.push({
            id: video.id.videoId,
            title: video.snippet.title,
            artist: video.snippet.channelTitle,
            thumbnail: video.snippet.thumbnails.default.url
        });
        updatePlaylistUI();
        
        if (!currentVideoId) {
            loadVideo(playlist[0].id);
        }
    }

    function updatePlaylistUI() {
        playlistItems.innerHTML = '';
        playlist.forEach((item, index) => {
            const element = document.createElement('div');
            element.className = 'playlist-item';
            if (item.id === currentVideoId) {
                element.classList.add('active');
            }
            element.innerHTML = `
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="item-info">
                    <div class="title">${item.title}</div>
                    <div class="artist">${item.artist}</div>
                </div>
            `;
            element.addEventListener('click', () => loadVideo(item.id));
            playlistItems.appendChild(element);
        });
    }

    function loadVideo(videoId) {
        currentVideoId = videoId;
        player.loadVideoById(videoId);
        const video = playlist.find(v => v.id === videoId);
        if (video) {
            trackTitle.textContent = video.title;
            trackArtist.textContent = video.artist;
            trackImage.src = video.thumbnail;
        }
        updatePlaylistUI();
    }

    function togglePlayPause() {
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    }

    function playNext() {
        const currentIndex = playlist.findIndex(v => v.id === currentVideoId);
        const nextIndex = (currentIndex + 1) % playlist.length;
        if (playlist[nextIndex]) {
            loadVideo(playlist[nextIndex].id);
        }
    }

    function playPrevious() {
        const currentIndex = playlist.findIndex(v => v.id === currentVideoId);
        const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        if (playlist[prevIndex]) {
            loadVideo(playlist[prevIndex].id);
        }
    }

    // Event Listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', playNext);
    prevBtn.addEventListener('click', playPrevious);
    
    showPlaylistBtn.addEventListener('click', () => {
        playlistUI.classList.add('active');
    });
    
    closePlaylistBtn.addEventListener('click', () => {
        playlistUI.classList.remove('active');
    });
    
    searchButton.addEventListener('click', async () => {
        const query = searchInput.value.trim();
        if (query) {
            const results = await searchYouTube(query);
            displaySearchResults(results);
        }
    });
    
    searchInput.addEventListener('keypress', async (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                const results = await searchYouTube(query);
                displaySearchResults(results);
            }
        }
    });
}

// Updates section
function initializeUpdates() {
    const updatesContainer = document.getElementById('updates-list');
    
    config.updates.forEach(update => {
        const updateCard = document.createElement('div');
        updateCard.className = 'update-card';
        updateCard.innerHTML = `
            <img src="assets/update-thumbnail.jpg" alt="${update.title}">
            <div class="update-info">
                <span class="date">${update.date}</span>
                <h3>${update.title}</h3>
                <p>${update.description}</p>
            </div>
        `;
        updatesContainer.appendChild(updateCard);
    });
}

// Featured Video functionality
let featuredVideoPlayer = null;

function initializeFeaturedVideo() {
    const videoContainer = document.getElementById('featured-video');
    const videoSearch = document.getElementById('video-search');
    const videoSearchBtn = document.getElementById('video-search-btn');
    const videoSearchResults = document.getElementById('video-search-results');

    // Create YouTube player
    featuredVideoPlayer = new YT.Player('featured-video', {
        height: '100%',
        width: '100%',
        videoId: config.featuredVideo.defaultVideoId || 'dQw4w9WgXcQ', // Default video if none specified
        playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0
        }
    });

    // Search functionality
    videoSearchBtn.addEventListener('click', () => searchVideos());
    videoSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchVideos();
        }
    });

    function searchVideos() {
        const query = videoSearch.value.trim();
        if (!query) return;

        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${config.youtube.apiKey}`)
            .then(response => response.json())
            .then(data => {
                videoSearchResults.innerHTML = '';
                videoSearchResults.classList.add('active');

                data.items.forEach(item => {
                    const videoItem = document.createElement('div');
                    videoItem.className = 'video-result-item';
                    videoItem.innerHTML = `
                        <img src="${item.snippet.thumbnails.medium.url}" alt="${item.snippet.title}">
                        <div class="video-result-info">
                            <h4>${item.snippet.title}</h4>
                            <p>${item.snippet.channelTitle}</p>
                        </div>
                    `;
                    videoItem.addEventListener('click', () => {
                        featuredVideoPlayer.loadVideoById(item.id.videoId);
                        videoSearchResults.classList.remove('active');
                        videoSearch.value = '';
                    });
                    videoSearchResults.appendChild(videoItem);
                });
            })
            .catch(error => {
                console.error('Error searching videos:', error);
                videoSearchResults.innerHTML = '<div class="video-result-item">Error loading results. Please try again.</div>';
            });
    }

    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.featured-video')) {
            videoSearchResults.classList.remove('active');
        }
    });
}

// Social links
function initializeSocialLinks() {
    const socials = config.socials;
    
    for (const [platform, url] of Object.entries(socials)) {
        const link = document.getElementById(platform);
        if (link) {
            link.href = url;
        }
    }
}

// Initialize loading progress
function initializeProgress() {
    const progressText = document.querySelector('.progress-text .percentage');
    const circle = document.querySelector('.circle');
    let currentProgress = 0;

    function updateProgress(value) {
        // Convert value to percentage (0-100)
        const percentage = Math.round(value * 100);
        
        // Only update if the progress has changed
        if (percentage !== currentProgress) {
            currentProgress = percentage;
            
            // Update text
            progressText.textContent = `${percentage}%`;
            
            // Update circle using conic gradient
            const rotation = (percentage / 100) * 360;
            circle.style.background = `conic-gradient(
                var(--accent-color) ${rotation}deg,
                transparent ${rotation}deg
            )`;

            // Debug log
            console.log(`[Loading Screen] Progress updated: ${percentage}%`);
        }
    }

    // Handle FiveM loading events
    window.addEventListener('message', function(e) {
        const data = e.data;
        
        if (data.type === "loadProgress" && typeof data.progress === 'number') {
            console.log(`[Loading Screen] Received progress event: ${data.progress}`);
            updateProgress(data.progress);
        }
    });

    // Send ready event to client
    fetch('https://snowii_loadingscreenv1/loaded', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).catch(err => console.error('[Loading Screen] Error sending ready event:', err));

    // Initial progress update
    updateProgress(0);
}

// Keyboard Information
function initializeKeyboard() {
    const keyboardLayout = document.querySelector('.keyboard-layout');
    const categoryButtons = document.querySelectorAll('.category-btn');
    let activeKeys = new Set();

    // Handle category switching
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateKeyBindings(button.dataset.category);
        });
    });

    // Function to update key bindings based on category
    function updateKeyBindings(category) {
        // Reset all keys
        document.querySelectorAll('.key').forEach(key => {
            key.classList.remove('bound');
            const actionSpan = key.querySelector('.key-action');
            if (actionSpan) {
                actionSpan.textContent = '';
            }
        });

        // Get keybinds for the selected category
        const keybinds = getKeybindsForCategory(category);
        
        // Update keys with their actions
        keybinds.forEach(keybind => {
            const keyElement = keyboardLayout.querySelector(`[data-key="${keybind.key}"]`);
            if (keyElement) {
                keyElement.classList.add('bound');
                const actionSpan = keyElement.querySelector('.key-action');
                if (actionSpan) {
                    actionSpan.textContent = keybind.action;
                }
            }
        });
    }

    // Function to handle key press animation
    function handleKeyPress(key) {
        const keyElement = keyboardLayout.querySelector(`[data-key="${key}"]`);
        if (keyElement && !activeKeys.has(key)) {
            activeKeys.add(key);
            keyElement.classList.add('active', 'pressed');
            
            // Remove pressed class after animation
            setTimeout(() => {
                keyElement.classList.remove('pressed');
            }, 200);
        }
    }

    // Function to handle key release
    function handleKeyRelease(key) {
        const keyElement = keyboardLayout.querySelector(`[data-key="${key}"]`);
        if (keyElement) {
            activeKeys.delete(key);
            keyElement.classList.remove('active');
        }
    }

    // Listen for keybind updates from FiveM
    window.addEventListener('message', (event) => {
        if (event.data.type === 'updateKeybinds') {
            // Update with new keybinds
            const activeCategory = document.querySelector('.category-btn.active');
            if (activeCategory) {
                updateKeyBindings(activeCategory.dataset.category);
            }
        }
    });

    // Initialize with general category
    updateKeyBindings('general');

    // Add keyboard event listeners for real-time key highlighting
    document.addEventListener('keydown', (e) => {
        handleKeyPress(e.key.toUpperCase());
    });

    document.addEventListener('keyup', (e) => {
        handleKeyRelease(e.key.toUpperCase());
    });
}

// Helper function to get keybinds for a specific category
function getKeybindsForCategory(category) {
    // This will be populated by the data from keybinds.lua
    const keybinds = {
        general: [
            { key: "M", action: "Open Phone" },
            { key: "F1", action: "Help Menu" },
            { key: "T", action: "Chat" },
            { key: "L", action: "Lock Vehicle" }
        ],
        vehicle: [
            { key: "W", action: "Accelerate" },
            { key: "S", action: "Brake/Reverse" },
            { key: "A", action: "Turn Left" },
            { key: "D", action: "Turn Right" },
            { key: "SHIFT", action: "Handbrake" },
            { key: "H", action: "Horn" }
        ],
        combat: [
            { key: "SPACE", action: "Jump/Climb" },
            { key: "CTRL", action: "Crouch" },
            { key: "R", action: "Reload" },
            { key: "Q", action: "Quick Item" }
        ],
        custom: [] // Will be populated from server
    };

    return keybinds[category] || [];
}

// Initialize server information
function initializeServerInfo() {
    const playerCount = document.getElementById('player-count');
    const serverTime = document.getElementById('server-time');

    // Handle server info updates
    window.addEventListener('message', function(e) {
        const data = e.data;
        
        if (data.type === "serverInfo" && data.data) {
            // Update player count
            if (data.data.playerCount) {
                playerCount.textContent = data.data.playerCount;
            }
            
            // Update server time
            if (data.data.serverTime) {
                serverTime.textContent = data.data.serverTime;
            }

            console.log('[Server Info] Updated:', data.data);
        }
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...
    
    // Initialize featured video after YouTube API is ready
    if (window.YT && window.YT.Player) {
        initializeFeaturedVideo();
    } else {
        window.onYouTubeIframeAPIReady = initializeFeaturedVideo;
    }
}); 