import React, { useState } from 'react';
import axios from 'axios';
import ChatBox from './components/ChatBox';
import MusicPlayer from './components/MusicPlayer';
import './App.css';

function App() {
    const [messages, setMessages] = useState([
        { text: "Hey! 🎵 What's your mood today? Tell me how you're feeling and I'll pick the perfect song for you!", sender: 'bot' }
    ]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleSendMessage = async (userMessage) => {
        // Add user message to chat
        setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);

        try {
            // Send to backend
            const response = await axios.post('http://localhost:5000/api/chat', {
                message: userMessage
            });

            // Add bot response and song
            setMessages(prev => [...prev, { text: response.data.reply, sender: 'bot' }]);
            if (response.data.song) {
                setCurrentSong(response.data.song);
                setIsPlaying(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages(prev => [...prev, { text: 'Error connecting to server. Make sure backend is running!', sender: 'bot' }]);
        }
    };

    return (
        <div className="app">
            <div className="chat-section">
                <div className="header">
                    <h1>💬 Mood Music Chat</h1>
                </div>
                <div className="messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`message ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <ChatBox onSendMessage={handleSendMessage} />
            </div>
            <div className="player-section">
                <MusicPlayer
                    song={currentSong}
                    isPlaying={isPlaying}
                    onPlayPause={() => setIsPlaying(!isPlaying)}
                />
            </div>
        </div>
    );
}

export default App;