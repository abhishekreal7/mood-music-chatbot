const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// Sample music database
const moodPlaylists = {
    happy: [
        { title: 'Walking on Sunshine', artist: 'Katrina & The Waves', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { title: 'Good as Hell', artist: 'Lizzo', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
        { title: "Don't Stop Me Now", artist: 'Queen', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
    ],
    sad: [
        { title: 'Someone Like You', artist: 'Adele', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
        { title: 'Tears in Heaven', artist: 'Eric Clapton', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
        { title: 'The Night We Met', artist: 'Lord Huron', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' }
    ],
    energetic: [
        { title: 'Blinding Lights', artist: 'The Weeknd', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { title: "Can't Hold Us", artist: 'Macklemore & Ryan Lewis', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
        { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
    ],
    chill: [
        { title: 'Sunset', artist: 'The Midnight', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
        { title: 'Weightless', artist: 'Marconi Union', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
        { title: 're: Stacks', artist: 'Bon Iver', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' }
    ]
};

// Mood detection function
function detectMood(message) {
    const lowerMsg = message.toLowerCase();

    const moodKeywords = {
        happy: ['happy', 'excited', 'joyful', 'great', 'amazing', 'wonderful', 'love', 'good'],
        sad: ['sad', 'down', 'blue', 'depressed', 'lonely', 'upset', 'bad', 'struggling'],
        energetic: ['energetic', 'pumped', 'active', 'workout', 'party', 'dance', 'hyped'],
        chill: ['chill', 'relaxed', 'calm', 'mellow', 'peaceful', 'zen', 'relax']
    };

    for (const [mood, keywords] of Object.entries(moodKeywords)) {
        if (keywords.some(keyword => lowerMsg.includes(keyword))) {
            return mood;
        }
    }
    return null;
}

// API endpoint for chat
app.post('/api/chat', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const detectedMood = detectMood(message);

    if (!detectedMood) {
        return res.json({
            reply: 'I didn\'t catch that. Try saying: happy, sad, energetic, or chill! 🎵',
            song: null
        });
    }

    // Get random song from mood playlist
    const playlist = moodPlaylists[detectedMood];
    const randomSong = playlist[Math.floor(Math.random() * playlist.length)];

    res.json({
        reply: `I'm picking "${randomSong.title}" by ${randomSong.artist} for your ${detectedMood} mood! 🎵`,
        song: randomSong
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});