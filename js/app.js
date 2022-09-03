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

    newsPosts.sort(function (a, b) {
        if (b.total_view < a.total_view) return -1;
        if (b.total_view > a.total_view) return 1; return 0;
    })

    const length = newsPosts.length
    // console.log(length)
    const lengthField = document.getElementById('length-field')
    lengthField.value = `${length} News Found`;


    console.log(newsPosts); 
    const singleNewsCategory = document.getElementById('single-news-category');
    singleNewsCategory.textContent = '';
    newsPosts.forEach(posts => {
        console.log(posts)
        const postDiv = document.createElement('div');
        postDiv.classList.add('col')
        postDiv.innerHTML = `
            <div class="card mb-3 border-0">
                        <div class="row">
                            <div class="col-md-3 py-3 ps-4">
                                <img src="${posts.thumbnail_url}" class="img-fluid rounded thumb-img" alt="...">
                            </div>
                            <div class="col-md-9">
                                <div class="card-body">
                                    <h4 class="card-title">${posts.title}</h4>
                                    <p class="card-text">${posts.details}</p>
                                    
                                    </div>
                                </div>
                            </div>
                            <div class="row px-4 pb-3">
                                        <div class="d-flex justify-content-between align-items-center mt-5">
                                        <div class="author-detail d-flex align-items-center">
                                            <div class="image"><img class="post-img" src="${posts.author.img}"></div>
                                            <div class="text-content d-flex flex-column ms-2">
                                                <span>${posts.author.name ? posts.author.name : "No Authors Found"}</span> 
                                                <span class="">${posts.author.published_date}</span>
                                            </div>
                                        </div>
                                        <p>${posts.total_view ? posts.total_view : 'No views found'}</p>
                                        <p>${posts.rating.number} ${posts.rating.badge}</p>
                                        <button onclick="loadNewsDetails('${posts._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Details</button>
                                    </div>
                        </div>
                    </div>
        `; 
        singleNewsCategory.appendChild(postDiv);
    })
}

const loadNewsDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data);  
}

const displayNewsDetails = newsDetails => {
    // console.log(newsDetails); 
    const modalTitle = document.getElementById('newsDetailModalLabel')
    const details = document.getElementById('details')
    newsDetails.forEach(detail => {
        // console.log(detail); 
        modalTitle.innerText = detail.title;
        details.innerHTML = `
            <img class="w-100" src="${detail.image_url}">
            <p>Published: ${detail.author.published_date}</p>
            <p class="details">${detail.details}</p>
        `;
    })
}

loadNewsCategories();