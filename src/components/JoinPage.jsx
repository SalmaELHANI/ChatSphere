import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

function JoinPage() {
  const [inputUsername, setInputUsername] = useState({
    pseudonyme: '',
  });
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      const socket = io('http://localhost:3000');
      socket.emit('create user', inputUsername);
      localStorage.setItem('username', inputUsername.pseudonyme);
      if (inputUsername.pseudonyme) {
          navigate('/chat');
      }else{
        alert("the field is empty")
      }
    } catch (error) {
      console.log(error);
    }
    setInputUsername({
      pseudonyme: '',
    });
  };

  return (
    <div class="bg-white h-screen overflow-hidden flex items-center justify-center">
      <div class="bg-gray-300 lg:w-5/12 md:6/12 w-10/12 shadow-2xl shadow-black rounded-xl">
        <div class="bg-gray-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
          <img src="public/logo2.png" alt="logo" className='h-10 w-10' />
        </div>
        <form class="p-12 md:p-24 rounded-s">
          <div class="flex items-center text-lg mb-6 md:mb-8">
            <svg class="absolute ml-3" width="24" viewBox="0 0 24 24">
              <path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
            </svg>
            <input
              type="text"
              id="username"
              class="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full rounded-xl "
              placeholder="Username"
              value={inputUsername.pseudonyme}
              onChange={(e) => setInputUsername({ pseudonyme: e.target.value })}
            />
          </div>
          <button
            onClick={handleJoin}
            class="bg-rose-500 shadow-sm shadow-black font-medium rounded-xl p-2 md:p-4 text-white uppercase w-full"
          >
            Join now
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinPage;
