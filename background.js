// background.js
chrome.runtime.onInstalled.addListener(() => {
    // Initialize default songs in Chrome storage
    const defaultSongs = {
      happy: [
        { title: "Happy - Pharrell Williams", link: "https://www.youtube.com/watch?v=ZbZSe6N_BXs" },
        { title: "Can't Stop the Feeling! - Justin Timberlake", link: "https://www.youtube.com/watch?v=ru0K8uYEZWw" }
      ],
      sad: [
        { title: "Someone Like You - Adele", link: "https://www.youtube.com/watch?v=hLQl3WQQoQ0" },
        { title: "All of Me - John Legend", link: "https://www.youtube.com/watch?v=450p7goxZqg" }
      ],
      energetic: [
        { title: "Eye of the Tiger - Survivor", link: "https://www.youtube.com/watch?v=btPJPFnesV4" },
        { title: "Thunder - Imagine Dragons", link: "https://www.youtube.com/watch?v=fKopy74weus" }
      ],
      calm: [
        { title: "River Flows in You - Yiruma", link: "https://www.youtube.com/watch?v=7maJOI3QMu0" },
        { title: "Weightless - Marconi Union", link: "https://www.youtube.com/watch?v=UfcAVejslrU" }
      ]
    };
  
    chrome.storage.sync.set({ songs: defaultSongs }, () => {
      
    });

    chrome.storage.sync.set({ theme: 'light' }, () => {
      console.log('Default theme initialized');
    });
    
  });