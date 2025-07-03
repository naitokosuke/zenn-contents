# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Zenn content repository for publishing technical articles. Zenn is a Japanese technical writing platform similar to dev.to or Medium.

## Common Commands

### Article Management
```bash
# Create a new article
npx zenn new:article --slug article-slug --title "Article Title" --type tech --emoji 📝

# Preview articles locally (opens at http://localhost:8000)
npx zenn preview
```

### Article Types
- `tech`: Technical articles
- `idea`: Idea/opinion pieces

## Repository Structure

- `articles/`: Contains all published articles in Markdown format
- `images/`: Article images organized by article slug (e.g., `images/article-slug/`)
- `books/`: For book content (currently unused)

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