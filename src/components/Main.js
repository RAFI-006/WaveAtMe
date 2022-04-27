import React, { useState } from 'react';

const Main = ({ sendWave }) => {
  const [message, setMessage] = useState('');

  const messageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className='main'>
      <h1 className='title'>
         <span className='text-gradient'>Wave</span> At Me
      </h1>
      <p className='subtitle'>
        Hi I am blockchain developer building cool dapps on buildspace
      </p>

      <input
        className='transition-all ring-blue-500'
        id='message'
        type='text'
        name='message'
        placeholder='Enter your messege...'
        value={message}
        onChange={messageChange}
      />

      <button
        className='wave'
        onClick={() => {
          sendWave(message);
          setMessage('');
        }}>
        Lets Wave !!
      </button>
    </div>
  );
};

export default Main;
