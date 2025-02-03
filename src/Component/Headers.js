import React from 'react';
// import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={headerStyle}>
      <h1>My React App</h1>
      <nav>
        <a href="/">Home</a> | <a href="/about">About</a>
      </nav>
    </header>
  );
};

const headerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '10px',
  textAlign: 'center',
};

export default Header;
