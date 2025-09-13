const apiKey = "efc0a535efaf4cef9e3fcaf610f3da35"; // <-- Replace with your NewsAPI key
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

// Fetch top headlines on load
window.addEventListener('DOMContentLoaded', () => {
    fetchNews();
});

// Search button event
searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchNews(query);
    } else {
        fetchNews();
    }
});

// Search on Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

function fetchNews(query = '') {
    newsContainer.innerHTML = '<p>Loading...</p>';
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=efc0a535efaf4cef9e3fcaf610f3da35`;
    if (query) {
        url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&apiKey=efc0a535efaf4cef9e3fcaf610f3da35`;
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.status === "ok" && data.articles.length > 0) {
                displayArticles(data.articles);
            } else {
                newsContainer.innerHTML = `<p>No news found.</p>`;
            }
        })
        .catch(error => {
            newsContainer.innerHTML = `<p>Error loading news. Try again later.</p>`;
            console.error(error);
        });
}

function displayArticles(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.className = 'article';

        const imgSrc = article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image';
        articleDiv.innerHTML = `
            <img src="${imgSrc}" alt="News Image">
            <div class="article-content">
                <h2>${article.title}</h2>
                <p>${article.description ? article.description.substring(0, 100) + '...' : 'No description available.'}</p>
                <a href="${article.url}" target="_blank" rel="noopener">Read more</a>
            </div>
        `;
        newsContainer.appendChild(articleDiv);
    });
}