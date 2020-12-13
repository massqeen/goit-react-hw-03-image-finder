import { useEffect, useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import classNames from 'classnames/bind';
import styles from './ScrollTop.module.css';

const ScrollTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  });

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <FaArrowCircleUp
      className={classNames(styles.scrollTop, {
        [styles.hideScroll]: !showScroll,
      })}
      onClick={scrollTop}
    />
  );
};

export default ScrollTop;
