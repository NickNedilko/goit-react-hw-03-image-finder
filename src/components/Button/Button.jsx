import React from 'react';
import css from './Button.module.css';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className={css.Button} type="button">
      Load More
    </button>
  );
};

export default Button;
