import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatBox = ({ onSendMessage }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="chat-input-container">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Tell me your mood..."
            />
            <button onClick={handleSend}>
                <Send size={20} />
            </button>
        </div>
    );
};

export default ChatBox;