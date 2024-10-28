let currentMood = null;

// Load and display songs for a mood
function loadSongs(mood) {
    currentMood = mood;
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = '<div class="loading">Loading songs...</div>';

    chrome.storage.sync.get('songs', (data) => {
        const songs = data.songs[mood] || [];
        
        if (songs.length === 0) {
            recommendationsDiv.innerHTML = '<div class="song-item"><div class="song-title">No songs added for this mood yet!</div></div>';
            return;
        }

        recommendationsDiv.innerHTML = songs.map((song, index) => `
            <div class="song-item">
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <a href="${song.link}" target="_blank" class="song-link">Listen on YouTube</a>
                </div>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `).join('');

        // Add delete button listeners
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                deleteSong(parseInt(this.dataset.index));
            });
        });
    });
}

// Delete a song
function deleteSong(index) {
    chrome.storage.sync.get('songs', (data) => {
        const songs = data.songs;
        songs[currentMood].splice(index, 1);
        chrome.storage.sync.set({ songs }, () => {
            loadSongs(currentMood);
        });
    });
}

// Add a new song
function addSong(title, link) {
    if (!currentMood) {
        alert('Please select a mood first!');
        return;
    }

    chrome.storage.sync.get('songs', (data) => {
        const songs = data.songs;
        if (!songs[currentMood]) {
            songs[currentMood] = [];
        }
        songs[currentMood].push({ title, link });
        chrome.storage.sync.set({ songs }, () => {
            loadSongs(currentMood);
        });
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Mood selection
    document.querySelectorAll('.mood-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            loadSongs(button.dataset.mood);
        });
    });

    // Add song form
    const toggleAddForm = document.getElementById('toggleAddForm');
    const addSongForm = document.getElementById('addSongForm');
    const addSongBtn = document.getElementById('addSongBtn');
    const cancelBtn = document.getElementById('cancelBtn');

    toggleAddForm.addEventListener('click', () => {
        addSongForm.classList.toggle('visible');
    });

    addSongBtn.addEventListener('click', () => {
        const titleInput = document.getElementById('songTitle');
        const linkInput = document.getElementById('songLink');
        
        if (!titleInput.value || !linkInput.value) {
            alert('Please fill in both fields!');
            return;
        }

        addSong(titleInput.value, linkInput.value);
        titleInput.value = '';
        linkInput.value = '';
        addSongForm.classList.remove('visible');
    });

    cancelBtn.addEventListener('click', () => {
        document.getElementById('songTitle').value = '';
        document.getElementById('songLink').value = '';
        addSongForm.classList.remove('visible');
    });
});