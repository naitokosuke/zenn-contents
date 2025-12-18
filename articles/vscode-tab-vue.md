---
title: "【index.vue】その VS Code タブ名、わかりづらくない？【[id].vue】"
emoji: "📁"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["vscode", "vue", "nuxt"]
published: false
---

[Vue Advent Calendar 2025](https://qiita.com/advent-calendar/2025/vue) 15 日目の記事です。

https://qiita.com/advent-calendar/2025/vue

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

この記事は『[【index.ts】その VSCode タブ名、わかりづらくない？【page.tsx】](https://zenn.dev/bmth/articles/vscode-tab-display-name-alias)』の Vue / Nuxt 版です。

https://zenn.dev/bmth/articles/vscode-tab-display-name-alias

元記事では Next.js App Router 向けの設定が紹介されていますが、Nuxt でも同様の問題があります。素晴らしい記事をありがとうございます！

## 問題：同名ファイルが多くてタブが分かりにくい

Nuxt のファイルベースルーティングでは、以下のようなディレクトリ構造になることが多いです。

```
pages/
├── users/
│   ├── index.vue
│   └── [id].vue
├── posts/
│   ├── index.vue
│   └── [id].vue
└── categories/
    └── [...slug].vue

server/api/
├── users/
│   ├── index.get.ts
│   └── [id].get.ts
└── posts/
    ├── index.get.ts
    └── [id].get.ts
```

これらのファイルを同時に開くと、タブには以下のように表示されます。

```
index.vue | index.vue | [id].vue | [id].vue | index.get.ts | index.get.ts
```

どのディレクトリのファイルなのか、一目では判別できません。

## 解決策：`workbench.editor.customLabels.patterns` を使う

VS Code 1.88 から追加された `workbench.editor.customLabels.patterns` を使うことで、タブの表示名をカスタマイズできます。

https://code.visualstudio.com/updates/v1_88#_custom-labels-for-open-editors

## 設定

`settings.json` に以下を追加します。

```json
{
  "workbench.editor.customLabels.enabled": true,
  "workbench.editor.customLabels.patterns": {
    // pages
    "**/index.vue": "${dirname}/index.vue .../${dirname(1)}",
    "**/[id].vue": "${dirname}/[id].vue .../${dirname(1)}",
    "**/[slug].vue": "${dirname}/[slug].vue .../${dirname(1)}",
    "**/[[slug]].vue": "${dirname}/[[slug]].vue .../${dirname(1)}",
    "**/[...slug].vue": "${dirname}/[...slug].vue .../${dirname(1)}",
    // server
    "**/index.{get,head,post,put,patch,delete,connect,options,trace}.ts": "${dirname}/${filename} .../${dirname(1)}",
    "**/[id].{get,head,post,put,patch,delete,connect,options,trace}.ts": "${dirname}/${filename} .../${dirname(1)}",
    "**/[slug].{get,head,post,put,patch,delete,connect,options,trace}.ts": "${dirname}/${filename} .../${dirname(1)}",
    "**/[...slug].{get,head,post,put,patch,delete,connect,options,trace}.ts": "${dirname}/${filename} .../${dirname(1)}"
  }
}
```

### pages

| パターン        | 説明                             |
| --------------- | -------------------------------- |
| `[id].vue`      | Dynamic Routes（単一パラメータ） |
| `[slug].vue`    | Dynamic Routes（単一パラメータ） |
| `[[slug]].vue`  | Dynamic Routes（optional）       |
| `[...slug].vue` | Catch-all Route                  |

https://nuxt.com/docs/guide/directory-structure/pages#dynamic-routes

### server/api

| パターン           | 説明                              |
| ------------------ | --------------------------------- |
| `index.get.ts`     | GET リクエストのハンドラー        |
| `index.post.ts`    | POST リクエストのハンドラー       |
| `[id].get.ts`      | 動的ルートの GET ハンドラー       |
| `[...slug].get.ts` | Catch-all ルートの GET ハンドラー |

https://nuxt.com/docs/guide/directory-structure/server#server-routes

## 設定の解説

- `${dirname}` : ファイルの親ディレクトリ名
- `${dirname(1)}` : 親の親ディレクトリ名

`pages/users/[id].vue` の場合、以下のようになります。

- `${dirname}` → `users`
- `${dirname(1)}` → `pages`

タブには `users/[id].vue .../pages` と表示され、どのディレクトリのファイルか一目でわかります。

## 最後に

VS Code のタブ表示名をカスタマイズする設定を Nuxt 向けに紹介しました。

同名ファイルが多くて困っている方は、ぜひ試してみてください。

最後まで読んでいただきありがとうございました！

## 参考

https://zenn.dev/bmth/articles/vscode-tab-display-name-alias

https://code.visualstudio.com/updates/v1_88#_custom-labels-for-open-editors

https://nuxt.com/docs/guide/directory-structure/pages
