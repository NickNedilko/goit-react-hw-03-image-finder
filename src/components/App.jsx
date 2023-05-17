import React, { Component } from 'react';
import Button from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import ApiImages from 'services/Api';
import css from './App.module.css';

class App extends Component {
  state = {
    search: '',
    images: null,
    page: 1,
    isLoading: false,
    error: '',
  };

  async componentDidUpdate(_, prevState) {
    const { page, search } = this.state;
    try {
      if (prevState.search !== search) {
        this.setState({
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

  searchInput = message => {
    this.setState({
      search: message,
      images: null,
      page: 1,
    });
  };

  LoadMoreBtn = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchInput} />
        <ImageGallery images={images} />
        <ToastContainer autoClose={1500} />
        {isLoading && (
          <div className={css.spinner}>
            <InfinitySpin width="200" color="#4fa94d" />
          </div>
        )}
        {images?.length && <Button onClick={this.LoadMoreBtn} />}
      </>
    );
  }
}

export default App;
