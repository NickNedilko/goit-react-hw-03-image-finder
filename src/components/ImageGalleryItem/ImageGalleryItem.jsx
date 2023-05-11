import React, { Component } from 'react';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  //   componentDidUpdate() {
  //     const { showModal } = this.state;
  //     if (showModal) {
  //       //   window.addEventListener('keydown', this.closeModal);
  //       window.addEventListener('click', this.closeModal);
  //     }
  //     if (!showModal) {
  //       //   window.removeEventListener('keydown', this.closeModal);
  //       window.removeEventListener('click', this.closeModal);
  //     }
  //   }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.item;
    const { showModal } = this.state;
    if(this.props.item){
      return (
        <div>
            <img
              className={css.ImageGalleryItemImage}
              src={webformatURL}
              alt={tags}
              onClick={this.toggleModal}
            />
          {showModal && (
            <Modal
              largeImageURL={largeImageURL}
              alt={tags}
              onModal={this.toggleModal}
            />
          )}
        </div>
      );
    }
    
  }
}

export default ImageGalleryItem;
