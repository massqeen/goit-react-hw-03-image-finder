import PropTypes from 'prop-types';
import styles from './Container.module.css';

const Container = ({ children }) => (
  <div className={styles.Container}>{children}</div>
);
Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};
export default Container;
