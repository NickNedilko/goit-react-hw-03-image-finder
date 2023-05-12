import axios from 'axios';

const ApiImages = async (search, page=1) => {
  const images = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '31317963-93e1be27f3dc3526dd5fff289',
      q: search,
      page,
      per_page: 12,
    },
  });

  return images;
};


export default ApiImages;
