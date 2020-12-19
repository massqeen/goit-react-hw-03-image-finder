import { useEffect, useRef, useCallback } from 'react';
import { toast } from 'react-toastify';

const useLazyLoading = (imgSelector, items) => {
  const imgObserver = useCallback((node) => {
    const intObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          const currentImg = entry.target;
          const newImgSrc = currentImg.dataset.src;

          if (!newImgSrc) {
            toast.error('Image source is invalid');
          } else {
            currentImg.src = newImgSrc;
          }
          intObs.unobserve(node);
        }
      });
    });
    intObs.observe(node);
  }, []);

  const imagesRef = useRef(null);
  useEffect(() => {
    imagesRef.current = document.querySelectorAll(imgSelector);
    if (imagesRef.current) {
      imagesRef.current.forEach((img) => imgObserver(img));
    }
  }, [imgObserver, imagesRef, imgSelector, items]);
};

export default useLazyLoading;
