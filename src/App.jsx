import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import JoinPage from './components/JoinPage';
import ChatRoom from './components/ChatRoom';
//import io from "socket.io-client";
//const socket =  io('http://localhost:6000'); 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/join'
          element={<JoinPage />}
        />
        <Route
          path='/chat'
          element={<ChatRoom  />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
