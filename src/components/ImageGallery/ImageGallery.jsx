import React, { PureComponent } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import Api from '../services/Api';
import css from './ImageGallery.module.css';

class ImageGallery extends PureComponent {
  state = {
    images: null,
    page: 1,
    status: 'edle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search } = this.props;
    const { page } = this.state;

    try {
      if (prevProps.search !== search) {
        this.setState({
          images: null,
          page: 1,
        });
      }
      const images = await Api(page, search);
      const { hits } = images.data;
      if (prevProps.search !== search) {
        this.setState({
          images: [...hits],
          status: 'resolved',
        });
      }
      if (prevState.page !== page) {
        const { images } = this.state;

        this.setState({
          images: [...images, ...hits],
          status: 'resolved',
        });
      }
    } catch (error) {
      console.log('Ошибка от бекЭнда');
    }
  }

  LoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      status: 'pending',
    }));
    console.log(this.state.page);
  };

  render() {
    const { images, status, page } = this.state;

    if (status === 'pending' && page === 1) {
      return <InfinitySpin width="200" color="#4fa94d" />;
    }

    if (status === 'resolved') {
      return (
        <ul className={css.ImageGallery}>
          {images &&
            images.map(({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  id={id}
                  src={webformatURL}
                  alt={tags}
                  largeImageURL={largeImageURL}
                />
              );
            })}
          <Button onClick={this.LoadMoreBtn} />
        </ul>
      );
    }
    if (status === 'pending' && page > 1) {
      return <InfinitySpin width="200" color="#4fa94d" />;
    }
  }
}

export default ImageGallery;
