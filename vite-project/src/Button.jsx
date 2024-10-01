import React from 'react';
import './Button.css';

const Button = ({ onClick, children, type = 'button' }) => {
  return (
    <button className="btn" onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
