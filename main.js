const API_KEY = `3643515049634840bf9e22e9ef948e16`;
const NUU_URL = `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`;
const DEPLOY_URL2 = `https://chan-news-times.netlify.app/top-headlines?`;
const DEPLOY_URL = `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?`;
const TEST_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
const X_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png';

let RESULT_URL = DEPLOY_URL;
let newsList = [];

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const menuList1 = document.querySelectorAll(".side-menu-list button");
const menuList2 = document.querySelectorAll(".menus button");
const menuList = [...menuList1, ...menuList2];

const searchInput = document.getElementById("search-input");

const searchNews = async () => {
  
  RESULT_URL = DEPLOY_URL + `q=${searchInput.value}`;
  console.log(RESULT_URL)
  await getLatestNews();
  
}

searchInput.addEventListener("keypress", (event) => {
  if(event.key == "Enter"){
    searchNews();
  }
})

menuList.forEach((menuButton) => {
  menuButton.addEventListener("click", async () => {
    document.getElementById("mySidenav").style.width = "0";
    let tmp = menuButton.textContent.toLowerCase();
    // RESULT_URL = DEPLOY_URL + "category=Entertainment";
    RESULT_URL = DEPLOY_URL + `category=${tmp}`;
    console.log(RESULT_URL);
    await getLatestNews();
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
  try{
    const url = new URL(`${RESULT_URL}`);

    url.searchParams.set("page",page);
    url.searchParams.set("pageSize",pageSize);

    const response = await fetch(url);
    const data = await response.json();

    if(response.status === 200){
      if(data.articles.length === 0){
        throw new Error("No result for this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      // console.log("rrrr", newsList);
      render();
      paginationRender();

    } else {
      throw new Error(data.message)
    }

  } catch (error){
    errorRender(error.message);
  }
  
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
  </div>`;
  document.getElementById("news-board").innerHTML = errorHTML
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

const paginationRender=() => {
  // totalResult,
  // page
  // pageSize
  // totalPages
  const totalPages = Math.ceil(totalResults/pageSize);
  // groupSize
  // pageGroup
  const pageGroup = Math.ceil(page/groupSize)
  // lastPage
  let lastPage = pageGroup * groupSize;
  // 마지막 페이지그룹이 그룹사이즈보다 작다? lastPage = totalPage
  if(lastPage > totalPages) {
    lastPage = totalPages;
  }

  // firstPage
  const firstPage = lastPage - (groupSize - 1)<=0?1:lastPage - (groupSize - 1);

  let pagiNationHTML=`<li class="page-item ${page===1  || totalPages <= groupSize?"hide":""}" onclick="moveToPage(1)"><a class="page-link">&lt;&lt;</a></li>`;
  pagiNationHTML+=`<li class="page-item ${page===1  || totalPages <= groupSize?"hide":""}" onclick="moveToPage(${page-1})"><a class="page-link">&lt;</a></li>`;

  for(let i=firstPage;i<=lastPage;i++){
    pagiNationHTML += `<li class="page-item ${i === page?"active":""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
  }

  pagiNationHTML += `<li class="page-item ${page+1>totalPages || totalPages <= groupSize?"hide":""}" onclick="moveToPage(${page+1})"><a class="page-link">&gt;</a></li>`;
  pagiNationHTML += `<li class="page-item ${page+1>totalPages || totalPages <= groupSize?"hide":""}" onclick="moveToPage(${totalPages})"><a class="page-link">&gt;&gt;</a></li>`;
  document.querySelector(".pagination").innerHTML=pagiNationHTML;

//   <nav aria-label="Page navigation example">
//   <ul class="pagination">
//     <li class="page-item">
//       <a class="page-link" href="#" aria-label="Previous">
//         <span aria-hidden="true">&laquo;</span>
//       </a>
//     </li>
//     <li class="page-item"><a class="page-link" href="#">1</a></li>
//     <li class="page-item"><a class="page-link" href="#">2</a></li>
//     <li class="page-item"><a class="page-link" href="#">3</a></li>
//     <li class="page-item">
//       <a class="page-link" href="#" aria-label="Next">
//         <span aria-hidden="true">&raquo;</span>
//       </a>
//     </li>
//   </ul>
// </nav>
}

const moveToPage=(pageNum)=>{
  page = pageNum;
  getLatestNews();
}

getLatestNews();
