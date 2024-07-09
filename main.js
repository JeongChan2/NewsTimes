const API_KEY = `3643515049634840bf9e22e9ef948e16`
let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles
  console.log("rrrr", news);

};

getLatestNews();
