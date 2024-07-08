const API_KEY = `3643515049634840bf9e22e9ef948e16`
const getLatestNews = () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = fetch(url);

};

getLatestNews();
