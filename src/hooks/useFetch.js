import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import fetchAPI from '../helpers/images-api';

const useFetch = (
  Status,
  page,
  isLastPage,
  searchQuery,
  { setStatus, setImages, setTotalPages, setError }
) => {
  const searchQueryRef = useRef(searchQuery);
  useEffect(() => {
    if (isLastPage && searchQueryRef.current === searchQuery) {
      return;
    }
    searchQueryRef.current = searchQuery;

    setStatus(Status.PENDING);
    (async () => {
      try {
        const response = await fetchAPI(searchQuery, page);
        const { images, totalHits, pageSize } = response;
        if (!images.length) {
          toast.warn('Sorry, nothing found :(');
          setStatus(Status.IDLE);
          return;
        }
        setImages((prevState) => [...prevState, ...images]);
        setStatus(Status.RESOLVED);
        setTotalPages(Math.ceil(totalHits / pageSize));
      } catch (err) {
        setError(err);
        toast.error(err.message);
        setStatus(Status.REJECTED);
      }
    })();
  }, [
    searchQuery,
    page,
    isLastPage,
    Status,
    setStatus,
    setImages,
    setTotalPages,
    setError,
  ]);
};

export default useFetch;
