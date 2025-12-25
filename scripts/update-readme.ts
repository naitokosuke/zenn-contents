import { cli, define } from "gunshi";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

interface Frontmatter {
  title?: string;
  published?: boolean;
  publication_name?: string;
  [key: string]: string | boolean | string[] | undefined;
}

interface Article {
  slug: string;
  title: string;
  url: string;
}

/** フロントマターをパースする */
function parseFrontmatter(content: string): Frontmatter | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter: Frontmatter = {};
  const lines = match[1].split("\n");

  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: string | boolean | string[] = line.slice(colonIndex + 1).trim();

    // 文字列のクォートを除去
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // 配列をパース
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/['"]/g, ""))
        .filter((v) => v);
    }

    // booleanをパース
    if (value === "true") value = true;
    if (value === "false") value = false;

    frontmatter[key] = value;
  }

  return frontmatter;
}

/** 記事のURLを生成する */
function generateUrl(slug: string, publicationName?: string): string {
  const base = publicationName || "kosuke_naito";
  return `https://zenn.dev/${base}/articles/${slug}`;
}

/** README.mdを生成する */
function generateReadme(articles: Article[]): string {
  let content = `# Zenn Contents

[![Zenn](https://img.shields.io/badge/Zenn-3EA8FF?logo=zenn&logoColor=fff)](https://zenn.dev/kosuke_naito)

技術記事を管理するリポジトリです。

## 記事一覧

`;

  for (const article of articles) {
    content += `- [${article.title}](${article.url})\n`;
  }

  return content;
}

const command = define({
  name: "update-readme",
  description: "Update README.md with article list from articles directory",
  run: () => {
    const articlesDir = join(process.cwd(), "articles");
    const files = readdirSync(articlesDir).filter((f) => f.endsWith(".md"));

    const articles: Article[] = [];

    for (const file of files) {
      const slug = file.replace(".md", "");
      const content = readFileSync(join(articlesDir, file), "utf-8");
      const frontmatter = parseFrontmatter(content);

      if (!frontmatter) {
        console.warn(`Warning: No frontmatter found in ${file}`);
        continue;
      }

      // 非公開記事はスキップ
      if (frontmatter.published !== true) {
        console.log(`Skipping unpublished: ${file}`);
        continue;
      }

      articles.push({
        slug,
        title: frontmatter.title || slug,
        url: generateUrl(slug, frontmatter.publication_name),
      });
    }

    console.log(`Found ${articles.length} published articles`);

    const readme = generateReadme(articles);
    writeFileSync(join(process.cwd(), "README.md"), readme);

    console.log("README.md updated successfully!");
  },
});

await cli(process.argv.slice(2), command, {
  name: "update-readme",
  version: "1.0.0",
});
