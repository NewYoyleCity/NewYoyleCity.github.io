const container = document.getElementById('newsContainer');

fetch('/news/news.json')
  .then(res => res.json())
  .then(newsList => {

    // Sort newest first
    newsList.sort((a, b) => new Date(b.date) - new Date(a.date));

    newsList.forEach(item => {
      const card = document.createElement('div');
      card.className = 'news-card';

      // Replace \n with <br> to force line breaks
      const htmlContent = marked.parse(item.content.replace(/\\n/g, '<br>'));

      card.innerHTML = `
        <img src="/news/${item.folder}/${item.cover}" alt="News cover">
        <div class="news-content">
          <h3>${item.title}</h3>
          <p>${new Date(item.date).toLocaleDateString()}</p>
          <div>${htmlContent}</div>
        </div>
      `;

      container.appendChild(card);
    });

  })
  .catch(err => console.error('Failed to load news.json:', err));
