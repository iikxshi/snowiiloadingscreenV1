// Set default background if none is provided
document.addEventListener('DOMContentLoaded', function() {
    // Create a fallback background gradient
    const fallbackBackground = `linear-gradient(
        45deg,
        rgba(2, 0, 36, 0.95) 0%,
        rgba(9, 9, 121, 0.85) 35%,
        rgba(0, 212, 255, 0.75) 100%
    )`;

    // Try to load the background image from config
    const configBackground = window.config && window.config.background;
    
    if (configBackground) {
        document.body.style.backgroundImage = `url('${configBackground}')`;
    } else {
        document.body.style.background = fallbackBackground;
    }

    // Add the overlay effect
    const overlay = document.createElement('div');
    overlay.className = 'background-overlay';
    document.body.appendChild(overlay);
}); 