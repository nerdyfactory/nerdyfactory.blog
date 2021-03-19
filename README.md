# Nerdyfactory blog

The blog posts are stored in `/src/_posts` as Markdown files with front matter support. Adding a new Markdown file in there will create a new blog post.

## Installation

1. Make sure you have [**node**](https://nodejs.org/) and [**yarn**](https://yarnpkg.com/)
2. install dependencies

```
$ yarn install
```

## Running locally

```
$ yarn dev
```

## Production build

```
$ yarn build
```

## Markdown file rules

Every markdown file (post) will have meta data regarding the post. This meta data is required in all files.
Meta data will be in the following form at the beginning of the file.

```
---

title: <title-of-blg>
excerpt: "<short description>"
coverImage: "<path-to-cover-image>"
date: "2020-03-16T05:35:07.322Z"
author:
    name: <author-name>
    picture: "<author-image-path>"
    role: "Authors role"
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas  at amet, vulputate viverra facilisis et fringilla duis convallis."
technologies: ["nodejs", "react"]
ogImage:
    url: "/assets/blog/preview/cover.jpg"

---


```

## Project Structure

- `public/`: Public folder
- `src/`: source codes
  - `src/_posts/`: Markdown files for all your posts
  - `src/components`: Shared components between pages
  - `src/lib`: Shared library files
  - `src/pages`: Pages of app (They also make the routes of the app)
  - `src/styles`: App styles
- `READ.md`: this file
- `package.json`: node dependencies and command scripts
- `next.config.js`: next configuration
- `tailwind.config.js`: Tailwind configuration for styling
- `postcss.config.js`: config for post css (Operations like purge css are configured here)
