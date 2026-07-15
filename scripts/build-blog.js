#!/usr/bin/env node

/**
 * DevDocs Blog Builder
 * Converts Markdown files from blog-posts/ into static HTML pages
 * Generates URL slugs from FILENAMES to prevent title-based errors
 * Includes SEO, Open Graph, and JSON-LD Schema
 */

const fs = require('fs');
const path = require('path');
const matter = require('front-matter');
const { marked } = require('marked');
const slugify = require('slugify');

// Configuration
const BLOG_POSTS_DIR = path.join(__dirname, '../blog-posts');
const BLOG_OUTPUT_DIR = path.join(__dirname, '../blog');
const INCLUDES_DIR = path.join(__dirname, '../_includes');
const AUTHOR_NAME = 'Sayad Md Bayezid Hosan';
const SITE_URL = 'https://devdocs.example.com'; // Update with your actual domain

// Ensure directories exist
if (!fs.existsSync(BLOG_OUTPUT_DIR)) {
  fs.mkdirSync(BLOG_OUTPUT_DIR, { recursive: true });
}

// Configure marked for better HTML rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

/**
 * Read all markdown files from blog-posts directory
 */
function readBlogPosts() {
  if (!fs.existsSync(BLOG_POSTS_DIR)) {
    console.log('⚠️  blog-posts directory not found. Creating it...');
    fs.mkdirSync(BLOG_POSTS_DIR, { recursive: true });
    return [];
  }

  const files = fs.readdirSync(BLOG_POSTS_DIR).filter(file => file.endsWith('.md'));
  const posts = [];

  files.forEach(file => {
    const filePath = path.join(BLOG_POSTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { attributes, body } = matter(fileContent);

    // ==========================================
    // CRITICAL CHANGE: Generate slug strictly from FILENAME
    // ==========================================
    const fileNameWithoutExt = file.replace(/\.md$/, '');
    const slug = slugify(fileNameWithoutExt, {
      lower: true,
      strict: true,
    });

    posts.push({
      slug,
      title: attributes.title || 'Untitled',
      description: attributes.description || '',
      content: body,
      date: attributes.date || new Date().toISOString().split('T')[0],
      tags: attributes.tags || [],
      image: attributes.image || `${SITE_URL}/assets/images/blog-default.jpg`,
      author: attributes.author || AUTHOR_NAME,
      category: attributes.category || 'General',
    });
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function loadAuthorProfileBox() {
  try {
    const profilePath = path.join(INCLUDES_DIR, 'author-profile-box.html');
    if (fs.existsSync(profilePath)) return fs.readFileSync(profilePath, 'utf8');
  } catch (error) {}
  return '';
}

function loadAuthorFooterBox() {
  try {
    const footerPath = path.join(INCLUDES_DIR, 'author-blog-fotter-box.html');
    if (fs.existsSync(footerPath)) return fs.readFileSync(footerPath, 'utf8');
  } catch (error) {}
  return '';
}

function replaceManualTags(htmlContent, authorProfileBox, authorFooterBox) {
  let processedContent = htmlContent;
  if (processedContent.includes('<!--AUTHOR_PROFILE-->')) {
    processedContent = processedContent.replace('<!--AUTHOR_PROFILE-->', authorProfileBox);
  }
  if (processedContent.includes('<!--AUTHOR_FOOTER-->')) {
    processedContent = processedContent.replace('<!--AUTHOR_FOOTER-->', authorFooterBox);
  }
  return processedContent;
}

/**
 * Generate HTML for a single blog post (Clean & Unique Layout)
 */
function generatePostHTML(post) {
  let htmlContent = marked(post.content);
  const authorProfileBox = loadAuthorProfileBox();
  const authorFooterBox = loadAuthorFooterBox();
  
  const hasManualProfile = post.content.includes('<!--AUTHOR_PROFILE-->');
  const hasManualFooter = post.content.includes('<!--AUTHOR_FOOTER-->');
  
  htmlContent = replaceManualTags(htmlContent, authorProfileBox, authorFooterBox);
  
  const autoProfileBox = hasManualProfile ? '' : authorProfileBox;
  const autoFooterBox = hasManualFooter ? '' : authorFooterBox;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} - DevDocs Blog</title>
    <meta name="description" content="${post.description}">
    <meta name="author" content="${post.author}">
    
    <!-- Open Graph & SEO -->
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.description}">
    <meta property="og:url" content="${SITE_URL}/blog/${post.slug}/">
    <link rel="canonical" href="${SITE_URL}/blog/${post.slug}/">
    
    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "${post.title}",
        "datePublished": "${post.date}",
        "author": { "@type": "Person", "name": "${post.author}" }
    }
    </script>

    <!-- Clean CSS -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/style.css">
    <link rel="stylesheet" href="../../assets/css/blog.css">
    
    <!-- Core Scripts -->
    <script src="../../assets/js/app.js" defer></script>
    <script src="../../assets/js/blog.js" defer></script>
</head>
<body>
    <header id="main-header"></header>

    <main class="blog-post-container">
        <article class="blog-post-article">
            <header class="blog-post-header text-center">
                <div class="blog-post-meta">
                    <time datetime="${post.date}">${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                    <span class="meta-separator">•</span>
                    <span class="blog-post-category">${post.category}</span>
                </div>
                <h1 class="blog-post-title">${post.title}</h1>
            </header>

            ${autoProfileBox}

            <div class="blog-post-content mt-4">
                ${htmlContent}
            </div>

            <footer class="blog-post-footer mt-5 border-t pt-4">
                <div class="blog-post-tags flex gap-2 flex-wrap">
                    ${post.tags.map(tag => `<span class="blog-tag bg-gray-100 px-3 py-1 rounded-full text-sm">${tag}</span>`).join('')}
                </div>
            </footer>
        </article>

        ${autoFooterBox ? autoFooterBox : ''}

        <!-- Clean Related Posts Section -->
        <section class="blog-related-posts mt-10" data-post-slug="${post.slug}" data-post-tags="${post.tags.join(',')}">
            <h3 class="text-2xl font-bold mb-4">Read Next</h3>
            <div id="related-posts-grid" class="blog-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Injected via JS -->
            </div>
        </section>
    </main>

    <footer id="main-footer"></footer>
</body>
</html>`;

  return html;
}

/**
 * Generate the main Blog Archive page
 */
function generateArchiveHTML() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog - DevDocs</title>
    <meta name="description" content="Technical guides, release notes, and documentation updates.">
    
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/blog.css">
    
    <script src="../assets/js/app.js" defer></script>
    <script src="../assets/js/blog.js" defer></script>
</head>
<body>
    <header id="main-header"></header>

    <main class="container py-10">
        <section class="blog-hero mb-12 text-center">
            <h1 class="text-4xl font-bold mb-4">DevDocs Blog</h1>
            <p class="text-gray-600 mb-8">Technical tutorials, updates, and open-source insights.</p>
            
            <div class="blog-search-bar max-w-lg mx-auto">
                <input type="text" id="blog-search-input" placeholder="Search articles..." class="w-full px-4 py-2 border rounded-lg">
            </div>
        </section>

        <section class="blog-grid-container">
            <div id="blog-grid" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Blog cards injected by JS -->
                <div class="loading-spinner col-span-full text-center py-10">
                    <p>Loading posts...</p>
                </div>
            </div>
        </section>
    </main>

    <footer id="main-footer"></footer>
</body>
</html>`;

  return html;
}

function generateBlogJSON(posts) {
  return JSON.stringify(posts, null, 2);
}

function updateSitemap(posts) {
  const sitemapPath = path.join(__dirname, '../sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return;

  let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const today = new Date().toISOString().split('T')[0];

  const urlRegex = /<url>[\s\S]*?<loc>https:\/\/devdocs\.example\.com\/blog\/[\s\S]*?<\/url>/g;
  sitemapContent = sitemapContent.replace(urlRegex, '');
  sitemapContent = sitemapContent.replace(/\n\s*\n/g, '\n');

  let blogEntries = '';
  
  if (!sitemapContent.includes(`${SITE_URL}/blog/`)) {
    blogEntries += `  <url>\n    <loc>${SITE_URL}/blog/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
  }

  posts.forEach(post => {
    let postDate = post.date ? (typeof post.date === 'string' ? post.date.split('T')[0] : post.date.toISOString().split('T')[0]) : today;
    blogEntries += `  <url>\n    <loc>${SITE_URL}/blog/${post.slug}/</loc>\n    <lastmod>${postDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  if (sitemapContent.includes('</urlset>')) {
    sitemapContent = sitemapContent.replace('</urlset>', `${blogEntries}</urlset>`);
    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log(`✅ Updated: sitemap.xml with ${posts.length} blog posts`);
  }
}

/**
 * Main build function
 */
function buildBlog() {
  console.log('🚀 Starting DevDocs Blog Build...\n');

  const posts = readBlogPosts();
  console.log(`✅ Found ${posts.length} blog post(s)\n`);

  posts.forEach(post => {
    const postDir = path.join(BLOG_OUTPUT_DIR, post.slug);
    if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true });

    const postHTML = generatePostHTML(post);
    fs.writeFileSync(path.join(postDir, 'index.html'), postHTML);
    console.log(`✅ Generated: /blog/${post.slug}/index.html`);
  });

  fs.writeFileSync(path.join(BLOG_OUTPUT_DIR, 'index.html'), generateArchiveHTML());
  console.log(`✅ Generated: /blog/index.html`);

  fs.writeFileSync(path.join(BLOG_OUTPUT_DIR, 'blog.json'), generateBlogJSON(posts));
  console.log(`✅ Generated: /blog/blog.json`);

  updateSitemap(posts);
  console.log('\n🎉 Blog build completed successfully! Clean & Minimal layout applied.');
}

buildBlog();