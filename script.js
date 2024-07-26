const url1 = `https://newsapi.org/v2/everything?`;
const url2 = `https://newsapi.org/v2/top-headlines?`
const apikey = `&apiKey=b66a445ff4f34310ad75cd1ac8d47824`;

let searchbtn = document.querySelector("#searchButton");
let textbox = document.querySelector("#searchBox");
let entertainmentBtn = document.querySelector("#entertainment");
let businessBtn = document.querySelector("#business");
let sportsBtn = document.querySelector("#sports");
let technologyBtn = document.querySelector("#technology");
let scienceBtn = document.querySelector("#science");
let topicBar = document.querySelector("#topic");
let logo = document.querySelector("#logo");

let loadIndianNews = () => {
    (async function fetchData() {
        let response = await fetch(`${url2}country=in${apikey}`);
        let data = await response.json();
        topicBar.innerHTML = `<h1> India Headlines</h1>`;
        displayNews(data);
    })();
}
let loadCatagoryNews = (type) => {
    (async function fetchData() {
        let response = await fetch(`${url2}country=in&category=${type}${apikey}`);
        let data = await response.json();
        topicBar.innerHTML = `<h1> ${type} Headlines</h1>`;
        displayNews(data);
    })();
}
let searchNews = () => {
    let text = textbox.value;
    if(text == "") {
        content.innerHTML = "";
        topicBar.innerHTML = "<h1> Type Something in Search Bar </h1>";
        return;
    }
    (async function fetchData() {
        let response = await fetch(`${url1}q=${text}${apikey}`);
        let data = await response.json();
        topicBar.innerHTML = `<h1>Results for ${text}</h1>`;
        displayNews(data);
    })();
}

window.addEventListener("load",loadIndianNews);

logo.addEventListener("click",loadIndianNews);

entertainmentBtn.addEventListener("click",() => loadCatagoryNews("entertainment"));

businessBtn.addEventListener("click",() => loadCatagoryNews("business"));

sportsBtn.addEventListener("click",() => loadCatagoryNews("sports"));

technologyBtn.addEventListener("click",() => loadCatagoryNews("technology"));

scienceBtn.addEventListener("click",() => loadCatagoryNews("science"));

searchbtn.addEventListener("click",searchNews);

let content = document.querySelector("#content");
function createCard(article) {
    let title = article.title;
    let desc = article.description;
    let time = article.publishedAt;
    let img = article.urlToImage;
    let link = article.url;
    let element = document.createElement("a");
    element.setAttribute("href",link);
    element.innerHTML = `
        <div class = "card">
            <img src = "${img}" id = "image"></img>
            <div id = "info">
            <div id="title">
                <h2>${title}</h2>
            </div>
            <div id="description">
                <h3>${desc}</h3>
            </div>
            <div id="timeOfPublish">
                <h4>${time}</h4>
            </div>
        </div>
    `
    return element;
}
function displayNews(data) {
    content.innerHTML = "";
    console.log(data);
    if(data.totalResults == 0) {
        topicBar.innerHTML = "<h1> No Articles Found :-( </h1>";
        return;
    }
    articles = data.articles;
    articles.forEach((article) => {
        let card = createCard(article);
        content.append(card);
    })
}