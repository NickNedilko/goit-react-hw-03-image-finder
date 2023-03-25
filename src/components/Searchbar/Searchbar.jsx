import React, { Component } from 'react';
import { toast } from 'react-toastify';
// import { FaTelegram } from 'react-icons/fa';
import css from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleSearchInputChange = e => {
    this.setState({
      search: e.target.value,
    });
  };

  resetForm = () => {
    this.setState({
      search: '',
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.search.trim() === '') {
      return toast.warn('Введите строку поиска');
    }
    this.props.onSubmit(this.state.search);
    this.resetForm();
  };

  render() {
    const { search } = this.state;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          {/* <FaTelegram width="1140" height="1140"  /> */}

          <input
            className={css.SearchFormInput}
            type="text"
            name="search"
            value={search}
            onChange={this.handleSearchInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
