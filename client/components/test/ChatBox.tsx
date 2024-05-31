import React, { useState } from 'react';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white shadow rounded-lg">
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 mb-2 bg-gray-100 rounded-lg">
            {msg}
          </div>
        ))}
      </div>
      <div className="flex">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          className="flex-grow p-2 border rounded-l-lg" 
          placeholder="Type a message..." 
        />
        <button onClick={handleSend} className="px-4 py-2 bg-blue-500 text-white rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
