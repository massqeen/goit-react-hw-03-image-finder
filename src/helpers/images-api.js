const URL = 'https://pixabay.com/api/';
const API_KEY = '18257903-4453e2975e3dd917fd04b41f9';

const getFetch = () => {
  return async (searchQuery, page = 1, pageSize = 12) => {
    const response = await fetch(`${URL}?key=${API_KEY}&q=${searchQuery}&per_page=${pageSize}&page=${page}
      &image_type=photo&orientation=horizontal`);
    const { hits: images, totalHits } = await response.json();
    return { totalHits, pageSize, images };
  };
};

const fetchAPI = getFetch();

export default fetchAPI;
