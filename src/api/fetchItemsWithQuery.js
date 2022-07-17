import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const myKey = '12834219-728ffad88c8528418d4b5c68f';

export const fetchItemsWithQuery = async (searchQuery, page) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${myKey}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data.hits;
};
