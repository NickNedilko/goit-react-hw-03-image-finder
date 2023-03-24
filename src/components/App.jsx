import React, { Component } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import Api from './services/Api';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import Button from './Button/Button';

class App extends Component {
  state = {
    images: [],
    search: null,
    status: true,
    page: 1,
  };

  async componentDidUpdate(_, prevState) {
    try {
      const { search, page } = this.state;
      // this.setState({ status: false });

      const images = await Api(page, search);

      const { hits } = images.data;
      if (prevState.search !== search || prevState.page !== page) {
        this.setState({
          images: [...prevState.images, ...hits],
          status: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

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
        {!status && (
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        )}
        <ImageGallery images={this.state.images} />
        {images.length > 0 && <Button onClick={this.LoadMoreBtn} />}
      </>
    );
  }
}

export default App;
