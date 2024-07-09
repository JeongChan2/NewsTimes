const API_KEY = `3643515049634840bf9e22e9ef948e16`
const DEPLOY_URL = `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
const TEST_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
let news = [];
const getLatestNews = async () => {
  const url = new URL(
    `${DEPLOY_URL}`
  );
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles
  console.log("rrrr", news);

};

getLatestNews();
