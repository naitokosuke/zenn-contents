# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Zenn content repository for publishing technical articles. Zenn is a Japanese technical writing platform similar to dev.to or Medium.

## Common Commands

### Article Management

```bash
# Create a new article (recommended - also creates images directory)
npm run new <article-slug>

# Preview articles locally (opens at http://localhost:8000)
npm run dev

# Alternatively, use zenn-cli directly
npx zenn new:article --slug article-slug --title "Article Title" --type tech --emoji 📝
npx zenn preview
```

### Linting

```bash
# Lint all articles
npm run lint:all

# Format all articles
npm run fmt:all

# Lint/format specific files
npm run lint -- articles/specific-article.md
npm run fmt -- articles/specific-article.md
```

### Article Types

- `tech`: Technical articles
- `idea`: Idea/opinion pieces

## Repository Structure

- `articles/`: Contains all published articles in Markdown format
- `images/`: Article images organized by article slug (e.g., `images/article-slug/`)
- `books/`: For book content (currently unused)
- `scripts/`: Custom CLI scripts using gunshi

## Article Format

Articles use Zenn-specific frontmatter:

```yaml
---
title: "Article title"
emoji: "🎯"
type: "tech" # or "idea"
topics: ["vue", "javascript"] # up to 5 topics
published: true # or false for drafts
---
```

## Key Conventions

1. **File Naming**: Articles are named with their slug (e.g., `vue-fes-japan-2024.md`)
2. **Image References**: Use relative paths like `![alt text](/images/article-slug/image.png)`
3. **Language**: This repository contains both Japanese and English content
4. **Topics**: Common topics include vue, git, python, typescript, javascript

## Zenn Platform Notes

- Articles are automatically synced to zenn.dev when pushed to the main branch
- The `published: false` frontmatter keeps articles as drafts
- Zenn supports standard Markdown with some extensions (e.g., message blocks, link cards)

## CLI Development

When creating command-line interfaces, use the `use-gunshi-cli` skill.
