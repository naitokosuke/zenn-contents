---
title: "Vue.js 公式 VS Code 拡張機能の Premium Features のご紹介"
emoji: "💎"
type: "tech"
topics: ["vue", "vue3", "vscode"]
publication_name: "comm_vue_nuxt"
published: true
---

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

[Alexander Lichter さんの YouTube 動画](https://youtu.be/OjMkGenTerM)を見ている時に、見慣れない VS Code の表示に気づきました。
`<script>`や`<template>`タグが透明になっていたのです。

https://youtu.be/OjMkGenTerM

[Natsuki (@natch_engr)](https://twitter.com/natch_engr) さんに [Vue の公式 VS Code 拡張機能](<(https://marketplace.visualstudio.com/items?itemName=Vue.volar)>)の Premium Features の一つである Focus Mode によるものだと教えてもらいました。
ありがとうございました！！

:::message
こちらも [Alexander Lichter](https://twitter.com/TheAlexLichter) さんの YouTube 動画 "[More Features of Vue's VS Code Extension](https://youtu.be/RcPcO4_Ct_U)" で紹介されています。
:::

Focus Mode 以外にも、以下の機能が現在使用可能です。(2025/08/10)

- Template Interpolation Highlight
- Reactivity Visualization

それぞれどんな機能か見る前に、まずは Premium Features のアンロック方法を紹介します。

![Vue (Official) VS Code Extension Premium Features](/images/vue_vscode_premium/vue-vscode-premium-features.png)

## Premium Features のアンロック方法

1. VS Code 拡張機能「[Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)」を最新（v3.x）に更新
2. GitHub Sponsors で [Johnson さんをスポンサー](https://github.com/sponsors/johnsoncodehk) (最低 $3 から(!!!))
3. コマンドパレットで "Vue: Verify Sponsor Status" を実行して GitHub アカウントを認証

https://marketplace.visualstudio.com/items?itemName=Vue.volar

https://github.com/sponsors/johnsoncodehk

## Premium Features

### Focus Mode

`<script>, <template>` がぼやけて表示されて選択した領域に集中できます。

![Focus Mode](/images/vue_vscode_premium/focus-mode.gif)

### Template Interpolation Highlight

`{{ }}` が見やすくなります。

![Interpolation Highlight](/images/vue_vscode_premium/interpolation-highlight.png)

### Reactivity Visualization

リアクティブなデータの関係を視覚的に表示します。

![Reactivity Highlight](/images/vue_vscode_premium/reactivity-highlight.gif)

## 特に不要であれば OFF にできる

上記の Premium Features はいずれも ON/OFF を切り替えることができます。
not for me な機能は無効にできるので気軽に試すことができます。

```json:.vscode/setting.json
{
  "vue.editor.focusMode": false,
  "vue.editor.templateInterpolationDecorators":false,
  "vue.editor.reactivityVisualization": false
}
```

## まとめ

Vue.js 公式の VS Code 拡張機能の Premium Features について紹介しました。

- [Focus Mode](#focus-mode)
- [Template Interpolation Highlight](#template-interpolation-highlight)
- [Reactivity Visualization](#reactivity-visualization)

[Johnson Chu](https://github.com/johnsoncodehk) さんをスポンサーすることで利用することができます。

最低 $3 からなのでぜひ試していただきたいです。
Vue の未来のためにもなるはずです！

## 最後に

Focus Mode は個人的には結構好きです。
(今回は紹介していませんが、inlay hints は個人的には苦手です。)
Premium Features に限らず、ぜひ自分の開発スタイルに合うかいろいろ試してみてください。

最後まで読んでいただきありがとうございました！
