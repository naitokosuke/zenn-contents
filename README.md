# Zenn CLI

- [📘 How to use](https://zenn.dev/zenn/articles/zenn-cli-guide)

## 記事の新規作成

```
npx zenn new:article --slug {記事のスラッグ} --title {記事のタイトル} --type {tech or tech} --emoji {絵文字}
```

- slug

  - 記事のユニーク ID で、`slug` は記事の URL に含まれる(https://zenn.dev/ユーザー名/articles/{slug})
  - `slug` は半角英小文字(a-z)、半角数字(0-9)、ハイフン(-)、アンダースコア(\_)の 12 ~ 50 字の組み合わせにする必要がある
  - 一度記事を公開すると変更できない(`slug` を変更すると別記事扱いとなる)
  - 多分指定しなくていい

- title

  - 記事のタイトル

- type

  - `tech` or `idea`

- emoji

  - アイキャッチとして使われる絵文字
  - Mac ショートカット `control + command + space`
