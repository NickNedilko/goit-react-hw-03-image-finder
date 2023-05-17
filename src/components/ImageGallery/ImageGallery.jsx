import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.ImageGallery}>
      {images?.map(image => {
        return (
          <li key={image.id}>
            <ImageGalleryItem item={image} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
