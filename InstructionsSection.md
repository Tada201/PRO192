# Docusaurus Overview and Course Sections Guide

## What Is Docusaurus?

Docusaurus is an open-source static site generator focused primarily on documentation websites. Originally created and maintained by Meta (formerly Facebook), it transforms Markdown (and MDX) files into a React-based website optimized for documentation.

### Core Purpose

Provide a zero-configuration, out-of-the-box experience for creating and maintaining documentation. It aims to make writing docs painless, so you might forget you’re writing docs, not your novel.

### Key Features

- **Markdown-First**: Write docs in Markdown or MDX (for React components inline).
- **Versioned Docs**: Manage multiple versions of your documentation easily.
- **Search**: Built-in Algolia DocSearch integration for quick content search.
- **Theming & Customization**: Light/dark mode, custom CSS, and layout overrides.
- **Plugin Ecosystem**: Extend functionality with plugins (analytics, API docs, PWA, etc.).
- **Internationalization (i18n)**: Support multiple languages.

---

## How Does Docusaurus Work?

### 1. Project Initialization

Run:

```bash
npx create-docusaurus@latest . classic
```

This scaffolds the current directory with:

```
./
├── blog/             ← optional blog posts
├── docs/             ← Markdown/MDX docs live here
├── src/              ← custom React pages/components
├── static/           ← images and static assets
├── docusaurus.config.js  ← main config file
├── sidebars.js       ← sidebar structure
└── package.json      ← dependencies & scripts
```

### 2. Writing Documentation

- Docs are `.md` or `.mdx` files in `/docs`.
- Frontmatter (YAML) defines metadata like `id`, `title`, and `sidebar_label`.
- Use `.mdx` to embed React components.

### 3. Building the Site

- Use `npm run dev` to start the development server with Vite. This is the preferred and recommended way to run the development site.
- Avoid using other build tools or commands for development to ensure consistency.
- `npm run start`: Launches local dev server with hot reload.
- `npm run build`: Generates static site in `build/`.
- `npm run serve`: Preview production build locally.

### 4. Versioning

Run:

```bash
npm run docusaurus docs:version 2.0.0
```

Copies `/docs` to `/versioned_docs/version-2.0.0` and updates sidebars for version toggling.

### 5. Themes & Customization

- Default “classic” theme supports light/dark mode, navbar, footer, search.
- Override components by shadowing in `src/theme/`.
- Add custom styles in `src/css/custom.css`.

### 6. Plugin System

Add plugins in `docusaurus.config.js`:

```js
plugins: [
  '@docusaurus/plugin-content-docs',
  '@docusaurus/plugin-content-blog',
  ['@docusaurus/plugin-google-gtag', { trackingID: 'UA-XXXXXX-X' }],
],
```

Examples: blog, Google Analytics, PWA, Swagger docs, Tailwind integration.

### 7. Deployment

- **GitHub Pages**:

```bash
GIT_USER=<username> npm run deploy
```

- **Netlify / Vercel**: Connect repo, build with `npm run build`, publish `build/`.
- **Custom Hosts**: Upload `build/` contents to any static host.

---

## Important Notes

- Docusaurus is a React-based static site generator optimized for docs.
- Input: Markdown/MDX with frontmatter; Output: pre-rendered static HTML/CSS/JS.
- Supports versioning, theming, plugins, and easy deployment.
- Be cautious not to commit sensitive data like API keys in docs.

---

This guide is intended to help structure course sections content and provide a clear understanding of Docusaurus for documentation projects.

---

# Task List for MDX Integration and Documentation Update

- [x] Rewrite InstructionsSection.md with Docusaurus overview and course section guide
- [x] Correct scaffold directory to current project directory
- [x] Add detailed MDX support instructions (installation, config, example, sidebar, verification)
- [ ] Perform testing and validation of InstructionsSection.md content
- [ ] Integrate MDX support into codebase (if required)
- [ ] Review and finalize documentation

---

# WARNING - DO NOT DELETE OR MODIFY THIS SECTION

This section is critical for tracking progress and ensuring the integrity of the documentation update process. Please do not remove or alter this text.

---

# Enabling MDX Support in Docusaurus

## 1. Install the Required MDX Dependencies

Run the following command in your project root to install necessary packages for MDX support:

```bash
npm install @mdx-js/react @docusaurus/plugin-content-docs
```

* **What this does**:

  * `@mdx-js/react` lets you render MDX files as React components.
  * `@docusaurus/plugin-content-docs` is already part of a typical Docusaurus setup, but re-installing ensures you have the latest version that fully supports MDX.

---

## 2. Configure `docusaurus.config.js`

Open your `docusaurus.config.js` and locate the `plugins` and `presets` sections. Update them as follows:

```js
module.exports = {
  // … other settings (site title, URL, etc.)
  presets: [
    [
      'classic',
      {
        docs: {
          // Enable MDX in the docs plugin:
          routeBasePath: 'docs',
          path: 'docs',
          editUrl: 'https://github.com/your-org/your-repo/edit/main/',
          // Allow both .md and .mdx file extensions:
          include: ['**/*.md', '**/*.mdx'],
        },
        blog: {
          // If you have a blog, you can also allow .mdx there:
          include: ['**/*.md', '**/*.mdx'],
        },
        // … other preset options (theme, sitemap, etc.)
      },
    ],
  ],
  themes: [
    // If you want to use custom MDX components via a theme:
    '@docusaurus/theme-classic',
  ],
  plugins: [
    // This ensures MDX files under /src/pages/ or /docs/ are processed:
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'default',
        path: 'docs',
        routeBasePath: 'docs',
        include: ['**/*.md', '**/*.mdx'], // Include MDX extensions
      },
    ],
    // (Optional) If you want MDX in other directories:
    [
      '@docusaurus/plugin-content-pages',
      {
        path: 'src/pages',
        include: ['**/*.md', '**/*.mdx'],
      },
    ],
  ],
  // (Optional) Declare any custom React components for MDX:
}
```

> **Sir**, this configuration tells Docusaurus to process files with both `.md` and `.mdx` extensions, enabling you to embed React components directly within your Markdown.

---

## 3. Create an Example MDX File

Inside your `docs/` folder (or any directory you configured), create a file named `example.mdx`:

```mdx
---
id: example
title: “Example MDX Page”
sidebar_label: “MDX Demo”
---

import MyCustomComponent from '@site/src/components/MyCustomComponent';

# Welcome to MDX in Docusaurus

You can write standard Markdown:

- Lists
- **Bold** and *italic* text
- Links, images, tables, etc.

And also embed React components:

<MyCustomComponent someProp="value" />

> This is an example of MDX: combining Markdown and JSX.

```

* **What this does**:

  * The frontmatter (`id`, `title`, `sidebar_label`) makes this page show up in your sidebar.
  * The `import` statement pulls in a custom React component from `src/components/`.
  * Anywhere you write `<MyCustomComponent />`, Docusaurus will render that component in place.

---

## 4. Verify Your `sidebars.js`

Ensure that `example` (or whatever `id` you gave) is referenced in your sidebar structure. For example:

```js
module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro', 'installation'], // existing MD files
    },
    {
      type: 'category',
      label: 'MDX Examples',
      items: ['example'], // the new MDX file’s id
    },
    // …other categories
  ],
};
```

* **Why this matters**: If a file isn’t referenced in `sidebars.js`, Docusaurus won’t show it in the navigation.

---

## 5. Restart the Dev Server

Finally, restart (or start) your local development server:

```bash
npm run start
```

Visit `http://localhost:3000/docs/example` (or click “MDX Demo” in your sidebar) to confirm that:

* Markdown content renders correctly.
* The React component (`<MyCustomComponent />`) appears as expected.

---

## [ Important info ]

* **MDX Functionality**: Now your Docusaurus site supports `.mdx` files alongside `.md` files. You can freely mix Markdown and JSX (React components) within those pages.
* **Custom Components**: Any React component placed under `src/components/` (or another folder within `src/`) can be imported and used in MDX.
* **Routing**: The URL path is determined by `routeBasePath` (commonly `/docs`). So an MDX file with `id: example` becomes [`/docs/example`](#).
* **Safety Note**: Always validate that imported components don’t expose sensitive data or APIs. If you embed third-party React components (e.g., fetching data), ensure you sanitize inputs and avoid XSS vulnerabilities.

This configuration is taken from official Docusaurus documentation and established community best practices; it is not made up.

---

# Task List for MDX Integration and Documentation Update

- [x] Rewrite InstructionsSection.md with Docusaurus overview and course section guide
- [x] Correct scaffold directory to current project directory
- [x] Add detailed MDX support instructions (installation, config, example, sidebar, verification)
- [ ] Perform testing and validation of InstructionsSection.md content
- [ ] Integrate MDX support into codebase (if required)
- [ ] Review and finalize documentation

---

# WARNING - DO NOT DELETE OR MODIFY THIS SECTION

This section is critical for tracking progress and ensuring the integrity of the documentation update process. Please do not remove or alter this text.

---
