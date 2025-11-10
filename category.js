import { client } from './client.js';

// Step 1: URL se category ka 'slug' (ishaara) nikalo
const urlParams = new URLSearchParams(window.location.search);
const categorySlug = urlParams.get('cat');

// Agar URL mein category nahi hai, to user ko homepage bhej do
if (!categorySlug) {
  window.location.href = '/index.html';
}

// Step 2: Sanity ke liye sahi query banao
const query = `*[_type == "newsArticle" && $categorySlug in categories[]->slug.current] | order(publishedAt desc){
  title,
  slug,
  mainImage{
    asset->{
      url
    }
  },
  "authorName": author->name,
  publishedAt
}`;

const params = { categorySlug: categorySlug };

const articlesContainer = document.querySelector('.column-center-inner');
// Page par content daalne se pehle, usse saaf karo
articlesContainer.innerHTML = ''; 

// Page ka title update karo
const categoryTitleHTML = `<h2 id="category-title" style="color: #fff; font-family: 'Oswald', sans-serif; border-bottom: 2px solid #00FFFF; padding-bottom: 10px; text-transform: capitalize;">
    Category: ${categorySlug}
</h2>`;
articlesContainer.innerHTML = categoryTitleHTML;

// Step 3: Sanity se data fetch karo aur dikhao
client.fetch(query, params).then(articles => {

  if (articles && articles.length > 0) {
    articles.forEach(article => {
      const articleElement = document.createElement('article');
      articleElement.classList.add('post');
      const articleHTML = `
        <h3 class="post-title"><a href="#">${article.title}</a></h3>
        <img src="${article.mainImage.asset.url}" alt="${article.title}" style="width: 100%; height: auto; border-radius: 8px; margin-top: 15px;">
        <div class="post-footer">
          <span>By: ${article.authorName}</span> | 
          <span>Published on: ${new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
      `;
      articleElement.innerHTML = articleHTML;
      articlesContainer.appendChild(articleElement);
    });
  } else {
    articlesContainer.innerHTML += '<p style="color: #fff; margin-top: 20px;">No articles found in this category.</p>';
  }
});