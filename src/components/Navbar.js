import React from 'react';

const Navbar = ({ account, connectWallet }) => {
  return (
    <div className='navbar'>
    
      <button
        className={'connect' + (account ? ' connected' : '')}
        onClick={() => {
          connectWallet();
        }}>
        {account
          ? account.toString()
          : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default Navbar;
