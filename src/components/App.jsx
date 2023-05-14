import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    search: '',
  };

  searchInput = message => {
    this.setState({
      search: message,
    });
  };

  render() {
    const { search } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.searchInput} />
        <ImageGallery search={search} />
        <ToastContainer autoClose={1500} />
      </>
    );
  }
}

export default App;
