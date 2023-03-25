import React, { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log(e.code);
      this.props.onModal();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onModal();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    const { largeImageURL, alt } = this.props;
    return (
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>
    );
  }
}

export default Modal;
