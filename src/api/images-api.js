const API_KEY = '18257903-4453e2975e3dd917fd04b41f9';

const fetchImages = ({ searchQuery = '', page = 1, pageSize = 12 }) => {
  return fetch(
    `https://pixabay.com/api/?key=${API_KEY}&q=${searchQuery}&per_page=${pageSize}&page=${page}
      &image_type=photo&orientation=horizontal`
  )
    .then((res) => res.json())
    .then(({ hits: images }) => {
      if (!images.length) {
        throw new Error('Unfortunately, your request not found.');
      }
      return images;
    });
};

export default { fetchImages };
