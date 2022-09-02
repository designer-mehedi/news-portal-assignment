const loadNewsCategories = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategories(data.data.news_category); 
}

const displayNewsCategories = (newsCategories) => {
    console.log(newsCategories);
    newsCategories.sort(function (a, b) {
        if(a.category_name < b.category_name) return -1;
        if(a.category_name > b.category_name) return 1; return 0;
    })
    const categories = document.getElementById('categories'); 
    newsCategories.forEach(news => {
        console.log(news);
        const categoryList = document.createElement('li');
        categoryList.innerHTML = `<a onclick="loadNews()" class="active" href="#">${news.category_name}</a>`;
        categories.appendChild(categoryList); 
    })
}


loadNewsCategories();