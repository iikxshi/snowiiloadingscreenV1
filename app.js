document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sections
    initializeStaffTeam();
    initializeMusicPlayer();
    initializeUpdates();
    initializeFeaturedVideo();
    initializeSocialLinks();
    initializeProgress();
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

// Featured video
function initializeFeaturedVideo() {
    const videoContainer = document.getElementById('featured-video');
    
    videoContainer.innerHTML = `
        <video controls poster="${config.featuredVideo.thumbnail}">
            <source src="${config.featuredVideo.url}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;
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

    // Handle FiveM loading events
    window.addEventListener('message', function(e) {
        if (e.data.eventName === 'loadProgress') {
            const loadFraction = e.data.loadFraction;
            currentProgress = Math.round(loadFraction * 100);
            updateProgress(currentProgress);
        }
    });

    // Listen for NUI messages from FiveM
    window.addEventListener('load', function() {
        fetch('https://snowii_loadingscreenv1/loaded', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
    });

    function updateProgress(value) {
        // Update text
        progressText.textContent = `${value}%`;

        // Update circle rotation
        const rotation = (value / 100) * 360;
        circle.style.background = `conic-gradient(
            var(--accent-color) ${rotation}deg,
            transparent ${rotation}deg
        )`;
    }

    // Initial progress update
    updateProgress(0);
} 