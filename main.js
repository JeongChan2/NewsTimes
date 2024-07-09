const API_KEY = `3643515049634840bf9e22e9ef948e16`
const NUU_URL = `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`
const DEPLOY_URL = `https://chan-news-times.netlify.app/top-headlines`
const TEST_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`


let news = [];

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const getLatestNews = async () => {
  const url = new URL(
    `${DEPLOY_URL}`
  );
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles
  console.log("rrrr", news);

  news.forEach(article => {
    const urlToImage = article.urlToImage;
    console.log("기사의 이미지 URL:", urlToImage);
    // 여기서 urlImage를 사용하여 원하는 작업을 수행할 수 있습니다.
  });

};

getLatestNews();
