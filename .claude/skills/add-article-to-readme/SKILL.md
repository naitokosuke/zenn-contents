# Add Article to README Skill

記事を作成した後、README.md の記事一覧に追加するスキルです。

## 使用方法

記事を作成した後、以下のようにスキルを呼び出します:

```
/add-article-to-readme <slug>
```

## 処理手順

1. `articles/<slug>.md` のフロントマターを読み取る
2. 以下の情報を抽出する:
   - `title`: 記事タイトル
   - `topics`: トピック一覧
   - `publication_name`: パブリケーション名（任意）
3. README.md の適切なカテゴリに記事を追加する

## カテゴリの判定ルール

topics に基づいて以下のカテゴリに分類します:

| カテゴリ | 判定条件（topics に含まれる場合） |
| --- | --- |
| Vue / Nuxt | `vue`, `vuejs`, `vue3`, `nuxt`, `nuxtjs` |
| UnoCSS | `unocss` |
| VoidZero / Vite | `voidzero`, `vite`, `oxc`, `rolldown` |
| カンファレンス | `vuefes` |
| Python | `python`, `ruff` |
| その他 | 上記に該当しない場合 |

## URL の生成ルール

- `publication_name` がある場合: `https://zenn.dev/<publication_name>/articles/<slug>`
- `publication_name` がない場合: `https://zenn.dev/kosuke_naito/articles/<slug>`

## 追加形式

README.md のテーブル形式に合わせて追加します:

```markdown
| [記事タイトル](URL) | Topic1, Topic2 |
```

## 注意事項

- 既に README.md に同じ slug の記事が存在する場合は追加しない
- カテゴリのテーブルの最後の行に追加する
- topics は先頭を大文字にしてカンマ区切りで表示する（例: `Vue, TypeScript`）
