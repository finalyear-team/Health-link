import React, { useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        console.log(messages);
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <input type="text" />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
