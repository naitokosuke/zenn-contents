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

元記事は React, Next.js ですが、Vue, Nuxt でもいかせる素晴らしい内容です。
Vue, Nuxt の方にも引っかかってほしいと思い、ミラー記事を書かせていただきます。
素晴らしい記事をありがとうございます！

## 問題：同名ファイルが多くてタブが分かりにくい

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

設定適用後はこのようになります。

![設定適用後のタブ](/images/vscode-tab-vue/tab-cosmos.png)

## 最後に

最後まで読んでいただきありがとうございました！
