import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const socket = io('http://localhost:3000');
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const messagesContainerRef = useRef(null);

  const fetchInitialMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Error loading initial messages:', error.message);
    }
  };

  useEffect(() => {
    fetchInitialMessages();

    // Écouter les nouveaux messages du serveur
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('disconnect', () => {
      // Gérer la redirection côté client
      window.location.href = '/join';
    });

    // Nettoyer les écouteurs lorsque le composant est démonté
    return () => {
      socket.off('chat message');
      socket.off('disconnect');
    };
  }, [inputMessage]);

  useEffect(() => {
    // Faire défiler la partie des messages vers le bas à chaque mise à jour
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== '') {
      socket.emit('chat message', { username, message: inputMessage });
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      <div className="flex-1 p-4 overflow-y-auto" ref={messagesContainerRef}>
        <h2 className="text-2xl font-bold mb-4">Welcome to the Chat Room, {username}!</h2>
        <div className="mb-4">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2 bg-black/20 rounded-l ">
              <strong className="text-rose-500">{msg.auteur}:</strong> {msg.contenu} <div className=''>{new Date(msg.timestamp).getHours()}:{new Date(msg.timestamp).getMinutes ()}</div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="py-4 px-6 bg-gray-50 dark:bg-gray-700">
        <label htmlFor="chat" className="sr-only">
          Your message
        </label>
        <div className="flex items-center">
          <textarea
            id="chat"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            rows="1"
            className="flex-1 p-2.5 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
          ></textarea>
          <button
            type="submit"
            className="inline-flex justify-center p-2 text-rose-500 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          >
            <svg
              className="w-6 h-6 rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatRoom;
