let currentPage = 1;
const postsPerPage = 5; // Number of posts per page

function updatePageIndicator() {
  const currentPageIndicator = document.getElementById("currentPageIndicator");
  if (currentPageIndicator) {
    currentPageIndicator.textContent = currentPage.toString();
  }
}

function loadBlogPosts() {
  fetch("./blog_posts.txt")
    .then((response) => {
      if (!response.ok) {
        throw new Error("File not found");
      }
      return response.text();
    })
    .then((data) => {
      const posts = data
        .split("--")
        .map((p) => p.trim())
        .filter((p) => p.length)
        .reverse();

      const startIndex = (currentPage - 1) * postsPerPage;
      const endIndex = startIndex + postsPerPage;
      const paginatedPosts = posts.slice(startIndex, endIndex);

      const mainElement = document.querySelector("main");
      mainElement.innerHTML = ""; // Clear existing posts

      if (paginatedPosts.length === 0) {
        const errorArticle = createErrorArticle();
        mainElement.appendChild(errorArticle);
        return;
      }

      paginatedPosts.forEach((post, index) => {
        if (index > 0) {
          const hr = document.createElement("hr");
          mainElement.appendChild(hr);
        }

        const lines = post.split("\n");
        if (lines.length < 3) return;

        const article = document.createElement("article");
        article.className = "blog-post";

        const title = document.createElement("h2");
        title.className = "blog-post-title";
        title.innerText = lines[0];
        article.appendChild(title);

        const date = document.createElement("p");
        date.className = "blog-post-date";
        date.innerText = lines[1];
        article.appendChild(date);

        const content = document.createElement("p");
        content.className = "blog-post-content";
        content.innerText = lines.slice(2).join("\n");
        article.appendChild(content);

        mainElement.appendChild(article);
      });
      updatePageIndicator();
    })
    .catch((error) => {
      const mainElement = document.querySelector("main");
      const errorArticle = createErrorArticle();
      mainElement.appendChild(errorArticle);
    });
}

function goToNextPage() {
  currentPage++;
  loadBlogPosts();
}

function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    loadBlogPosts();
  }
}

function createErrorArticle() {
  const article = document.createElement("article");
  article.className = "blog-error";

  const title = document.createElement("h2");
  title.className = "blog-error-title";
  title.textContent = "404 - No blog posts found";

  const content = document.createElement("p");
  content.className = "blog-error-content";
  content.textContent = "maybe next time :(";

  article.appendChild(title);
  article.appendChild(content);

  return article;
}

/* let currentPage = 0;
const postsPerPage = 5;

function loadBlogPosts() {
  fetch("./blog_posts.txt")
    .then((response) => {
      if (!response.ok) {
        throw new Error("File not found");
      }
      return response.text();
    })
    .then((data) => {
      const posts = data
        .split("--")
        .map((p) => p.trim())
        .filter((p) => p.length)
        .reverse();

      const mainElement = document.querySelector("main");

      if (posts.length === 0) {
        const errorArticle = createErrorArticle();
        mainElement.appendChild(errorArticle);
        return;
      }

      posts.forEach((post, index) => {
        if (index > 0) {
          const hr = document.createElement("hr");
          mainElement.appendChild(hr);
        }

        const lines = post.split("\n");
        if (lines.length < 3) return;

        const article = document.createElement("article");
        article.className = "blog-post";

        const title = document.createElement("h2");
        title.className = "blog-post-title";
        title.innerText = lines[0];
        article.appendChild(title);

        const date = document.createElement("p");
        date.className = "blog-post-date";
        date.innerText = lines[1];
        article.appendChild(date);

        const content = document.createElement("p");
        content.className = "blog-post-content";
        content.innerText = lines.slice(2).join(" ");
        article.appendChild(content);

        mainElement.appendChild(article);
      });
    })
    .catch((error) => {
      const mainElement = document.querySelector("main");
      const errorArticle = createErrorArticle();
      mainElement.appendChild(errorArticle);
    });
}

function createErrorArticle() {
  const article = document.createElement("article");
  article.className = "blog-error";

  const title = document.createElement("h2");
  title.className = "blog-error-title";
  title.textContent = "404 - No blog posts found";

  const content = document.createElement("p");
  content.className = "blog-error-content";
  content.textContent = "maybe next time :(";

  article.appendChild(title);
  article.appendChild(content);

  return article;
}
 */
