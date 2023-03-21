import React, { Component } from 'react';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';

class App extends Component {
  state = {
    images: [],
    search: null,
    status: 'edle',
  };

  componentDidUpdate() {}

  searchInput = message => {
    console.log(message);
    this.setState({
      search: message,
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.searchInput} />
        <ImageGallery />
      </>
    );
  }
}

export default App;
