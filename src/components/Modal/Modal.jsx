import React from 'react';
import css from './Modal.module.css';

const Modal = ({ alt, largeImageURL }) => {
  return (
    <div className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>
  );
};

export default Modal;
