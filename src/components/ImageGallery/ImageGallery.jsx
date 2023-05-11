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
  };

  async componentDidUpdate(prevProps, prevState) {
    const { search } = this.props;
    const { page } = this.state;
 

    try {

      if(prevProps.search !== search){
          this.setState({
          images: null,
          page: 1,
          isLoading: true
        });
        const images = await ApiImages(page, search);
      const { hits } = images.data;
         this.setState({
          images: hits,
          isLoading: false,
        });
      }
       if (prevState.page !== page) {
        const { images } = this.state;
        this.setState({
          isLoading: true,
        })
        const data = await ApiImages({page, search});
        const { hits } = data.data;
        this.setState({
          images: [...images, ...hits],
          isLoading: false
        });
      }
    } catch (error) {
      console.log('Ошибка от бекЭнда');
    } finally {
    }
  }

  LoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        <ul className={css.ImageGallery}>
          {images?.length>0 && images?.map(image=>{
            console.log(image)
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
