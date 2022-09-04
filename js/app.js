const loadNewsCategories = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayNewsCategories(data.data.news_category);
    } 
    catch (error) {
        console.log(error); 
    }
}

const displayNewsCategories = newsCategories => {
    newsCategories.sort(function (a, b) {
        if(a.category_name < b.category_name) return -1;
        if(a.category_name > b.category_name) return 1; return 0;
    })

    const categories = document.getElementById('categories'); 
    newsCategories.forEach(news => {
        const categoryList = document.createElement('li');
        categoryList.innerHTML = `<a onclick="loadNewsPosts('${news.category_id}')" class="active" href="#">${news.category_name}</a>`;
        categories.appendChild(categoryList); 
    })
}

const loadNewsPosts = async(newsCategory) => {
    toggleSpinner(true)
    const url = `https://openapi.programming-hero.com/api/news/category/${newsCategory}`; 
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayNewsPosts(data.data);
    }
    catch (error) {
        console.log(error)
    } 
}

const displayNewsPosts = newsPosts => { 
    newsPosts.sort(function (a, b) {
        if (b.total_view < a.total_view) return -1;
        if (b.total_view > a.total_view) return 1; return 0;
    })

    const length = newsPosts.length;
    const lengthField = document.getElementById('length-field');
    lengthField.value = `${length} News Found`;

    const singleNewsCategory = document.getElementById('single-news-post');
    singleNewsCategory.textContent = '';
    newsPosts.forEach(posts => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('col')
        postDiv.innerHTML = `
            <div class="card mb-3 border-0 pb-4">
        <div class="row">
            <div class="col-md-3 py-3 ps-4">
                <img src="${posts.thumbnail_url}" class="img-fluid rounded thumb-img" alt="...">
            </div>
            <div class="col-md-9">
                <div class="card-body">
                    <h4 class="card-title">${posts.title}</h4>
                    <p class="card-text card-style">${posts.details}</p>
                </div>
            </div>
        </div>
        <div class="row px-4 g-5 pt-2">
            <div class="col-md-7 author-detail d-flex align-items-center justify-content-between">
                    <div class="image"><img class="post-img" src="${posts.author.img}"></div>
                    <div class="text-content d-flex flex-column ms-2">
                        <span>${posts.author.name ? posts.author.name : "No Authors Found"}</span>
                        <span class="">${posts.author.published_date? posts.author.published_date : 'No Publish Date Found'}</span>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="icon"><ion-icon name="eye"></ion-icon> </span>
                        <p class="pt-2">${posts.total_view ? posts.total_view : 'No views found'}</p>
                    </div>
                </div>
                <div class="col-md-5 d-flex align-items-center justify-content-between">
                   <div>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star"></ion-icon>
                    <ion-icon name="star-half"></ion-icon>
                    <ion-icon name="star-outline"></ion-icon>
                   </div>
                    <button onclick="loadNewsDetails('${posts._id}')" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#newsDetailModal">Details</button>
                </div>
            </div>
         </div>
        `; 
        singleNewsCategory.appendChild(postDiv);
    })
    toggleSpinner(false);
}

const toggleSpinner = isLoading => {
    const loadSpinner = document.getElementById('spinner')
    if (isLoading) {
        loadSpinner.classList.remove('d-none')
    } else {
        loadSpinner.classList.add('d-none')
    }
}

const loadNewsDetails = async(id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data); 
    }
    catch (error) {
        console.log(error); 
    }
}

const displayNewsDetails = newsDetails => {
    const modalTitle = document.getElementById('newsDetailModalLabel')
    const details = document.getElementById('details')
    newsDetails.forEach(detail => { 
        modalTitle.innerText = detail.title;
        details.innerHTML = `
            <img class="w-100" src="${detail.image_url}">
            <p class="pt-3">Published: ${detail.author.published_date}</p>
            <p class="details">${detail.details}</p>
        `;
    })
}

loadNewsCategories();
