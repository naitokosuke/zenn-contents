---
title: "Vue Vine を知る"
emoji: "🍇"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["vuejs"]
published: false
---

[Vue Advent Calendar 2025](https://qiita.com/advent-calendar/2025/vue) 14 日目の記事です。

https://qiita.com/advent-calendar/2025/vue

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

今回は [**Vue Vine**](https://vue-vine.dev/) を紹介します。

SFC で小さなコンポーネントを書くときに面倒だなと思ったことはありませんか？
親コンポーネントでしか使わないのにわざわざ別ファイルに切り出して props を定義して import して...。
ファイル間を行き来するのは地味にストレスです。

「同じファイルにサッとコンポーネントを追加できたらな〜」と思ったことがある方もいるのではないでしょうか。
Vue Vine は、1 ファイルに複数のコンポーネントを書けるようにする新しい選択肢です。

https://vue-vine.dev/

## Vue Vine とは？

> Another style to write Vue.

Vue Vine は Vue コンポーネントを書くための新しいスタイルを提供するツールです。
1 ファイルに複数のコンポーネントを関数として定義できます。

https://github.com/vue-vine/vue-vine

### 作者

Vue Vine は [ShenQingchuan(沈青川)](https://github.com/ShenQingchuan) さんが開発しています。
Vite や Rollup の中国語ドキュメントのメンテナンスにも携わっている方です。

![ShenQingchuan さんの GitHub プロフィール](/images/intro-vue-vine/shenqingchuan.png)

## コード例

Vue Vine では `vine` タグ付きテンプレートリテラルを使ってコンポーネントを定義します。

```ts
function MyComponent() {
  const count = ref(0)

  return vine`
    <div>
      <button @click="count++">{{ count }}</button>
    </div>
  `
}
```

関数の中身は `<script setup>` と同じように書けます。
`vine` タグ内がテンプレートです。

1 ファイルに複数のコンポーネントを書けるのが Vue Vine の特徴です。

```ts
// Button.vine.ts

function PrimaryButton() {
  return vine`
    <button class="primary"><slot /></button>
  `
}

function SecondaryButton() {
  return vine`
    <button class="secondary"><slot /></button>
  `
}
```

SFC だと `PrimaryButton.vue`、`SecondaryButton.vue` のように分ける必要がありますが、Vue Vine なら 1 ファイルにまとめられます。

## Getting Started

<!-- TODO: セットアップ手順 -->

https://vue-vine.dev/introduction/quick-start.html

## マクロ

<!-- TODO: Vue Vine のマクロを紹介 -->
<!-- vineProp, vineEmits, vineExpose, vineSlots, vineStyle, vineModel -->

## SFC との比較

<!-- TODO: SFC との違い -->
<!-- - ユースケース -->

## まとめ

<!-- TODO: 内容の要約 -->

## 最後に

最後まで読んでいただきありがとうございました！
