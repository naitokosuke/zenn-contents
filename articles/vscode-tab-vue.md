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

![タブが分かりにくい状態](/images/vscode-tab-vue/tab-chaos.png)

どのディレクトリのファイルなのか、一目では判別できません。

## 解決策：`workbench.editor.customLabels.patterns` を使う

`settings.json` に以下を追加します。

```json
{
  "workbench.editor.customLabels.enabled": true,
  "workbench.editor.customLabels.patterns": {
    // index.vue, index.ts, index.get.ts など
    "**/index.*": "${dirname}/${filename} .../${dirname(1)}",
    // [id].vue, [id].get.ts など（Dynamic Routes）
    "**/[id].*": "${dirname}/${filename} .../${dirname(1)}",
    // [slug].vue, [slug].get.ts など（Dynamic Routes）
    "**/[slug].*": "${dirname}/${filename} .../${dirname(1)}",
    // [[slug]].vue など（Optional Route）
    "**/[[slug]].*": "${dirname}/${filename} .../${dirname(1)}",
    // [...slug].vue, [...slug].get.ts など（Catch-all Route）
    "**/[...slug].*": "${dirname}/${filename} .../${dirname(1)}"
  }
}
```

> glob パターンで、対象のファイル名と拡張子を指定します。
>
> 工夫しているポイントとしては、`.../${dirname(1)}` の部分です。`${dirname(N)}` 表記で、N 階層上のディレクトリ名を取得できるのでそれを利用し、VS Code のもとの設定に寄せた表示ができるようにしています。
>
> また、`index.*` については特別なファイルのため、そのディレクトリ名を表示するようにしています。
>
> ― [【index.ts】その VSCode タブ名、わかりづらくない？【page.tsx】](https://zenn.dev/bmth/articles/vscode-tab-display-name-alias)

## 最後に

同名ファイルが多くて困っている方は、ぜひ試してみてください。

## 参考

https://zenn.dev/bmth/articles/vscode-tab-display-name-alias

https://code.visualstudio.com/updates/v1_88#_custom-labels-for-open-editors

https://nuxt.com/docs/guide/directory-structure/pages
