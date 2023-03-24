import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  closeModal = e => {
    if (e.code === 'Escape') {
      console.log(e.code);
      this.handleOpenModal();
    }
    if (e.target === e.currentTarget) {
      this.closeModal();
    }
  };

  componentDidUpdate() {
    const { showModal } = this.state;
    if (showModal) {
      window.addEventListener('keydown', this.closeModal);
      window.addEventListener('click', this.closeModal);
    }
    if (!showModal) {
      window.removeEventListener('keydown', this.closeModal);
      window.removeEventListener('click', this.closeModal);
    }
  }

  handleOpenModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    const { id, src, alt, largeImageURL } = this.props;
    const { showModal } = this.state;
    return (
      <>
        <li key={id} className={css.ImageGalleryItem}>
          <img
            className={css.ImageGalleryItemImage}
            src={src}
            alt={alt}
            onClick={this.handleOpenModal}
          />
        </li>
        {showModal && <Modal largeImageURL={largeImageURL} alt={alt} />}
      </>
    );
  }
}

export default ImageGalleryItem;
