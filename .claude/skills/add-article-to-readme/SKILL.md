# Add Article to README Skill

全記事を読み取り、README.md の記事一覧を生成・更新するスキルです。

## 使用方法

```bash
npm run update-readme
```

## 処理手順

1. `articles/*.md` の全記事のフロントマターを読み取る
2. 各記事から以下の情報を抽出する:
   - `title`: 記事タイトル
   - `publication_name`: パブリケーション名（任意）
   - `published`: 公開状態
3. `published: true` の記事のみを対象にする
4. README.md の記事一覧セクションを更新する

## URL の生成ルール

- `publication_name` がある場合: `https://zenn.dev/<publication_name>/articles/<slug>`
- `publication_name` がない場合: `https://zenn.dev/kosuke_naito/articles/<slug>`

## 出力形式

README.md にフラットな箇条書き形式で出力します。

```markdown
## 記事一覧

- [記事タイトル](URL)
- [記事タイトル](URL)
- [記事タイトル](URL)
```

## README.md の構造

```markdown
# Zenn Contents

[![Zenn](https://img.shields.io/badge/Zenn-3EA8FF?logo=zenn&logoColor=fff)](https://zenn.dev/kosuke_naito)

技術記事を管理するリポジトリです。

## 記事一覧

- [記事タイトル](URL)
- [記事タイトル](URL)
```
