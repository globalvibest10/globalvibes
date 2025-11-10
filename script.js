// Step 1: Apni Sanity client file ko import karo
import { client } from './client.js';

// Yeh GROQ query Sanity ko batati hai ki humein kya data chahiye
// Hum yahan saare "newsArticle" type ke documents maang rahe hain
const query = `*[_type == "newsArticle"] | order(publishedAt desc){
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

// Step 2: Sanity se data fetch karo (mangwao)
client.fetch(query).then(articles => {
  
  // Step 3: Articles dikhane waale HTML container ko pakdo
  const articlesContainer = document.querySelector('.column-center-inner');
  
  // Pehle se maujood sample posts waale HTML ko bilkul saaf kar do
  articlesContainer.innerHTML = ''; 

  // Step 4: Har article ke liye ek-ek karke HTML banao aur page par daalo
  articles.forEach(article => {
    // Har article ke liye ek naya <article> element banao
    const articleElement = document.createElement('article');
    articleElement.classList.add('post');

    // Article ka poora HTML structure taiyyar karo
    const articleHTML = `
      <h3 class="post-title"><a href="#">${article.title}</a></h3>
      <img src="${article.mainImage.asset.url}" alt="${article.title}" style="width: 100%; height: auto; border-radius: 8px; margin-top: 15px;">
      <div class="post-footer">
        <span>By: ${article.authorName}</span> | 
        <span>Published on: ${new Date(article.publishedAt).toLocaleDateString()}</span>
      </div>
    `;

    // Taiyyar shuda HTML ko <article> element ke andar daal do
    articleElement.innerHTML = articleHTML;
    
    // Aakhir mein, is naye article element ko page par dikha do
    articlesContainer.appendChild(articleElement);
  });
});