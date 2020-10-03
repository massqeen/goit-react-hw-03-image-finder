import React from 'react';
import styles from './Button.module.css';

const Button = ({ onLoadMore }) => (
  <button
    id="loadMore"
    type="button"
    className={styles.button}
    onClick={() => onLoadMore()}
  >
    Load more
  </button>
);

export default Button;
