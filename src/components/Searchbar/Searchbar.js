import React, { Component } from 'react';
import styles from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = { query: '' };

  handleChange = (e) => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={styles.bar}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.button}>
            <span className={styles.label}>Search</span>
          </button>
          <input
            className={styles.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
