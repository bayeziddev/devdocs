# devdocs
A lightweight, zero-config static site generator for instantly building developer documentation and personal blogs.

# Devdocs: Zero-Config Developer Documentation & Blog Generator

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-yellow.svg)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

**DevForge** is a lightweight, zero-configuration Static Site Generator (SSG) built specifically for generating lightning-fast developer documentation and technical blogs. It takes your Markdown files and compiles them into a highly optimized, mobile-ready web platform.

By keeping the frontend dependencies to absolute zero—relying purely on Vanilla JavaScript and modern CSS—DevForge ensures maximum performance, perfect Lighthouse scores, and optimal Search Engine Optimization (SEO).

## 🚀 Key Features

* **Zero-Config Setup:** Start writing in Markdown immediately. No complex build tools or bundlers required.
* **Intelligent Dark/Light Mode:** Built-in theme toggling that respects the user's system preferences (`prefers-color-scheme`) and saves choices via Local Storage.
* **Mobile-First Architecture:** Includes a fully responsive sidebar drawer with overflow management for seamless reading on mobile devices.
* **Insanely Fast:** Zero frontend frameworks (No React, Vue, or jQuery). The UI state is handled by a single, highly optimized `docs.js` file.
* **SEO Optimized:** Generates clean, semantic HTML designed to rank highly on Google and developer search engines.

## 📦 Quick Start

### 1. Clone the Repository
```bash
git clone [https://github.com/bayzed123/devforge.git](https://github.com/bayzed123/devforge.git)
cd devforge

```
### 2. Add Your Content
Place your .md files into the /content directory.
 * Documentation goes into /content/docs/
 * Blog posts go into /content/blog/
### 3. Generate the Site
Run the build command to parse your Markdown and generate the static HTML files:
```bash
# Add your specific build command here (e.g., npm run build, python build.py, etc.)

```
### 4. Preview Locally
Open the generated index.html in your browser, or spin up a quick local server:
```bash
npx serve out/

```
## 🏗️ Architecture & Assets
The core frontend interactivity is handled natively to guarantee speed. The main JavaScript logic is located at assets/js/docs.js, which handles:
 1. **Theme Toggle Logic:** Seamless switching between dark and light modes without page reloads.
 2. **Mobile Sidebar Drawer:** Touch-friendly navigation menu tailored for reading technical docs on smaller screens.
## 🤝 Contributing
We welcome contributions from the global developer community! If you want to improve the SEO, add new Markdown parsing features, or refine the UI, please feel free to fork the repository.
 1. Fork the Project
 2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
 3. Commit your Changes (git commit -m 'Add some AmazingFeature')
 4. Push to the Branch (git push origin feature/AmazingFeature)
 5. Open a Pull Request
Please read our CONTRIBUTING.md for detailed guidelines.
## 📄 License
This project is distributed under the MIT License. See LICENSE for more information.
**Author:** Sayad Md Bayezid Hosan
```

### Next Steps for Implementation:
1. Replace `[Your-Repository-Name]` or `devforge` with the actual name you choose for the project.
2. Update the `# Add your specific build command here` section once you decide which backend language (Node.js, Python, Go, etc.) will actually compile the Markdown to HTML. 

Does the structure and tone align with your vision for the project?

```
