function loadBlogPosts() {
  fetch("./blog_posts.txt")
    .then((response) => response.text())
    .then((data) => {
      const posts = data
        .split("--")
        .map((p) => p.trim())
        .filter((p) => p.length);
      const mainElement = document.querySelector("main");

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
        title.innerText = lines[0];
        article.appendChild(title);

        const date = document.createElement("span");
        date.className = "blog-date";
        date.innerText = lines[1];
        article.appendChild(date);

        const content = document.createElement("p");
        content.innerText = lines.slice(2).join(" ");
        article.appendChild(content);

        mainElement.appendChild(article);
      });
    })
    .catch((error) => console.error("Error:", error));
}

// Uncomment the line below if you want the script to run as soon as it loads
// window.addEventListener('DOMContentLoaded', loadBlogPosts);
