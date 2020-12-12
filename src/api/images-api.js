import PropTypes from 'prop-types';
const URL = 'https://pixabay.com/api/';
const API_KEY = '18257903-4453e2975e3dd917fd04b41f9';

const fetchAPI = ({ searchQuery, page = 1, pageSize = 12 }) => {
  return fetch(
    `${URL}?key=${API_KEY}&q=${searchQuery}&per_page=${pageSize}&page=${page}
      &image_type=photo&orientation=horizontal`
  )
    .then((res) => res.json())
    .then(({ hits: images, totalHits }) => {
      if (!images.length) {
        throw new Error('unfortunately, your request not found.');
      }
      return { totalHits, images };
    });
};

fetchAPI.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default fetchAPI;
