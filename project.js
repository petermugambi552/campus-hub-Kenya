// Simple blog logic using localStorage
const STORAGE_KEY = 'simple_blog_posts';

function getPosts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  try {
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) {
    console.error("Error parsing posts from localStorage:", e);
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function addSamplePostsIfEmpty() {
  const posts = getPosts();
  if (posts.length === 0) {
    const demo = [
      {
        id: Date.now() - 200000,
        title: "Welcome to your Simple Blog!",
        author: "Admin",
        content: "This is your first post. You can create new posts using the form above. All posts are saved locally in your browser's storage.",
        timestamp: new Date(Date.now() - 200000).toISOString()
      },
      {
        id: Date.now() - 100000,
        title: "How it works",
        author: "Admin",
        content: "This blog uses HTML, CSS, and JavaScript. No backend server is required! Posts are stored in localStorage which means they will persist even if you close your browser, but they are only available on this specific browser and this computer. They are not synchronized anywhere.",
        timestamp: new Date(Date.now() - 100000).toISOString()
      }
    ];
    savePosts(demo);
    return demo;
  }
  return posts;
}

function renderPostsList() {
  const postsContainer = document.getElementById('posts');
  if (!postsContainer) return;

  const posts = getPosts().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by newest first
  postsContainer.innerHTML = ''; // Clear existing posts

  if (posts.length === 0) {
    postsContainer.innerHTML = '<p>No posts yet. Be the first to publish!</p>';
    return;
  }

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
      <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
      <div class="meta">
        by ${post.author || 'Anonymous'} on ${new Date(post.timestamp).toLocaleDateString()}
      </div>
      <p>${post.content.substring(0, 150)}...</p>
    `;
    postsContainer.appendChild(postElement);
  });
}

function renderPostDetail() {
  const postDetailContainer = document.getElementById('post-detail');
  if (!postDetailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    postDetailContainer.innerHTML = '<p>Post not found.</p>';
    return;
  }

  const posts = getPosts();
  const post = posts.find(p => String(p.id) === postId);

  if (post) {
    postDetailContainer.innerHTML = `
      <h2>${post.title}</h2>
      <div class="meta">
        by ${post.author || 'Anonymous'} on ${new Date(post.timestamp).toLocaleDateString()} at ${new Date(post.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <p>${post.content.replace(/\n/g, '<br>')}</p>
    `;
  } else {
    postDetailContainer.innerHTML = '<p>Post not found.</p>';
  }
}

function handlePostSubmit(event) {
  event.preventDefault(); // Prevent default form submission

  const titleInput = document.getElementById('title');
  const authorInput = document.getElementById('author');
  const contentInput = document.getElementById('content');

  const title = titleInput.value.trim();
  const author = authorInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert('Please enter both title and content for your post.');
    return;
  }
}