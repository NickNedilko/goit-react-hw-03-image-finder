import React, { Component } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api from './services/Api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';

class App extends Component {
  state = {
    images: [],
    search: null,
    status: 'false',
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    try {
      const { search, page } = this.state;
      // this.setState({ status: true });
      const images = await Api(page, search);
      const { hits } = images.data;
      if (prevState.search !== search || prevState.page !== page) {
        this.setState({
          images: [...prevState.images, ...hits],
          // status: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
    // this.setState({ status: false });
  }

  // componentDidUpdate(_, prevState) {}

  searchInput = message => {
    console.log(message);
    this.setState({
      search: message,
    });
  };

  LoadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    console.log(this.state.page);
  };

  render() {
    const { images, status } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchInput} />
        {status && <InfinitySpin width="200" color="#4fa94d" />}
        <ImageGallery images={this.state.images} />
        {images.length > 0 && <Button onClick={this.LoadMoreBtn} />}
        <ToastContainer />
      </>
    );
  }
}

export default App;
