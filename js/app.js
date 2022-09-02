const loadNewsCategories = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategories(data.data.news_category); 
}

const displayNewsCategories = (newsCategories) => {
    // console.log(newsCategories);
    newsCategories.sort(function (a, b) {
        if(a.category_name < b.category_name) return -1;
        if(a.category_name > b.category_name) return 1; return 0;
    })
    const categories = document.getElementById('categories'); 
    newsCategories.forEach(news => {
        // console.log(news);
        const categoryList = document.createElement('li');
        // categoryList.classList.add('me-5','pe-4')
        categoryList.innerHTML = `<a onclick="loadNews('${news.category_id}')" class="active" href="#">${news.category_name}</a>`;
        categories.appendChild(categoryList); 
    })
}

const loadNews = async(newsCategory) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${newsCategory}`; 
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCategory(data.data);
}

const displayNewsCategory = (newsPosts) => {
    // console.log(newsPosts); 
    const singleNewsCategory = document.getElementById('single-news-category');
    singleNewsCategory.textContent = '';
    newsPosts.forEach(posts => {
        console.log(posts)
        const postDiv = document.createElement('div');
        postDiv.classList.add('col')
        postDiv.innerHTML = `
            <div class="card mb-3">
                        <div class="row">
                            <div class="col-md-2 py-3 ps-4">
                                <img src="${posts.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                            </div>
                            <div class="col-md-10">
                                <div class="card-body">
                                    <h2 class="card-title">${posts.title}</h2>
                                    <p class="card-text">${posts.details}</p>
                                    <div class="d-flex justify-content-between align-items-center mt-5">
                                        <div class="author-detail d-flex align-items-center">
                                            <div class="image"><img class="post-img" src="${posts.author.img}"></div>
                                            <div class="text-content d-flex flex-column ms-2">
                                                <span>${posts.author.name}</span> 
                                                <span class="">${posts.author.published_date}</span>
                                            </div>
                                        </div>
                                        <p>${posts.total_view}</p>
                                        <button class="btn btn-primary">Details</button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
        `; 
        singleNewsCategory.appendChild(postDiv);
    })
}

loadNewsCategories();