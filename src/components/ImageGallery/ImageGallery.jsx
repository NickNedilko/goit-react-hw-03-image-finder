import React, { PureComponent } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import ApiImages from '../services/Api';
import css from './ImageGallery.module.css';
import { toast } from 'react-toastify';

class ImageGallery extends PureComponent {
  state = {
    images: null,
    page: 1,
    isLoading: false,
    error: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search } = this.props;
    const { page } = this.state;

    try {
      if (prevProps.search !== search) {
        this.setState({
          images: null,
          page: 1,
          isLoading: true,
        });
        const images = await ApiImages(search);
        const { hits, total } = images.data;
        toast(`Знайдено картинок ${total}`);
        if (!total) {
          toast(`Нічого не знайдено за пошуком ${search}, перевірте!!!`);
        }

        this.setState({
          page: 1,
          images: hits,
          isLoading: false,
        });
      }

      if (prevState.page !== page) {
        const { search } = this.props;
        const { images } = this.state;
        this.setState({
          isLoading: true,
        });
        const data = await ApiImages(search, page);
        const { hits } = data.data;
        this.setState({
          images: [...images, ...hits],
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({ error: error });
    }
  }

  LoadMoreBtn = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        <ul className={css.ImageGallery}>
          {images?.map(image => {
            return (
              <li key={image.id}>
                <ImageGalleryItem item={image} />
              </li>
            );
          })}
        </ul>
        <div>
          {isLoading && (
            <div className={css.spinner}>
              <InfinitySpin width="200" color="#4fa94d" />
            </div>
          )}
          {images?.length && <Button onClick={this.LoadMoreBtn} />}
        </div>
      </>
    );
  }
}

export default ImageGallery;
