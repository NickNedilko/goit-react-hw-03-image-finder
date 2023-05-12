import React, {PureComponent } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import ApiImages from '../services/Api';
import css from './ImageGallery.module.css';

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

      if(prevProps.search !== search ){
        this.setState({
        images: [],
        page: 1,
        isLoading: true
      });
      const images = await ApiImages(search);
    const { hits } = images.data;

    if(page === 1){
      this.setState({
        images: hits,
        isLoading: false,
      });
    }
  
    }
    if (prevState.page !== page) {
    const { search } = this.props;
        const { images } = this.state;
        this.setState({
          isLoading: true,
        })
        const data = await ApiImages(search, page);
        const { hits } = data.data;
        this.setState({
          images: [...images, ...hits],
          isLoading: false
        });
      }
      
    } catch (error) {
      this.setState({error: error})
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
          {images?.length>0 && images?.map(image=>{
            return <li key={image.id}>
              <ImageGalleryItem item={image}/>
            </li>
          })}
        </ul>
          <div className={css.spinner}>
          {isLoading && <InfinitySpin  width="200" color="#4fa94d" />}
          {images?.length && <Button onClick={this.LoadMoreBtn} />}
          </div>
      </>
    );
  }
}

export default ImageGallery;
