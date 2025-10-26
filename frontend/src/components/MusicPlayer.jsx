import React, { useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, Music } from 'lucide-react';

const MusicPlayer = ({ song, isPlaying, onPlayPause }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (!song) return;

        if (isPlaying) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlaying, song]);

    if (!song) {
        return (
            <div className="player">
                <Music size={60} color="#667eea" />
                <p style={{ marginTop: '20px', color: '#999' }}>No song playing</p>
                <p style={{ fontSize: '14px', color: '#bbb' }}>Tell me your mood to play a song!</p>
            </div>
        );
    }

    return (
        <div className="player">
            <div className="album-art">
                <Music size={80} color="#667eea" />
            </div>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <div className="controls">
                <button onClick={onPlayPause}>
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
            </div>
            <audio ref={audioRef} src={song.url} crossOrigin="anonymous" />
        </div>
    );
};

export default MusicPlayer;