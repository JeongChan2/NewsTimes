const API_KEY = `3643515049634840bf9e22e9ef948e16`;
const NUU_URL = `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`;
const DEPLOY_URL = `https://chan-news-times.netlify.app/top-headlines?`;
const TEST_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
const X_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';

let RESULT_URL = DEPLOY_URL;
let newsList = [];

const menuList1 = document.querySelectorAll(".side-menu-list button");
const menuList2 = document.querySelectorAll(".menus button");
const menuList = [...menuList1, ...menuList2];

menuList.forEach((menuButton) => {
  menuButton.addEventListener("click", () => {
    let tmp = menuButton.textContent.toLowerCase();
    // RESULT_URL = DEPLOY_URL + "category=Entertainment";
    RESULT_URL = DEPLOY_URL + `category=${tmp}`;
    console.log(RESULT_URL);
    getLatestNews();
  });
});

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
  const url = new URL(`${RESULT_URL}`);
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  console.log("rrrr", newsList);

  render();
};

const render = () => {
  let result = ``;
  newsList.forEach((article) => {
    let author = article.author;
    const urlToImage = article.urlToImage;
    const title = article.title;
    const description = article.description;
    const publishedAt = article.publishedAt;

    // console.log(moment(publishedAt).fromNow());

    result += `<div class="row news">
          <div class="col-lg-4 image-parent">
            <img
              class="news-img-size"
              src="${urlToImage || X_IMAGE}" alt="이미지" onerror="this.onerror=null; this.src='${X_IMAGE}';"
            />
          </div>
          <div class="col-lg-8">
            <h2>${title}</h2>
            <p>${
              description == null || description == ""
                ? "내용없음"
                : description.length > 200
                ? description.substring(0, 200) + "..."
                : description
            }</p>
            <div>
              ${author || "no source"}  ${moment(publishedAt).fromNow()}
            </div>
          </div>
        </div>`;
  }); // map으로 썼을땐 .join('')까지 해주기
  document.getElementById("news-board").innerHTML = result;
};

getLatestNews();
