---
title: "v-for の区切り文字 in と of について調べてみた"
emoji: "🎄"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["vue3", "vue"]
publication_name: "comm_vue_nuxt"
published: true
---

[Vue Advent Calendar 2024](https://qiita.com/advent-calendar/2024/vue) 6 日目の記事です。

https://qiita.com/advent-calendar/2024/vue

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

前から気になっていた `v-for` ディレクティブの区切り文字 `in`, `of` について今日は調べていきます。

## `v-for`

> 配列に基づいて項目のリストをレンダリングするには、v-for ディレクティブを使用します。v-for ディレクティブでは、item in items という形式の特別な構文が必要になります。

https://ja.vuejs.org/guide/essentials/list

### 配列

```vue:App.vue
<script setup lang="ts">
import { ref } from "vue";

const names = ref(["Foo", "Bar", "Baz"]);
</script>

<template>
  <li v-for="(name, index) in names" :key="name">
    {{ index }} - {{ name }}
  </li>
</template>
```

### オブジェクト

```vue:App.vue
<script setup lang="ts">
import { ref } from "vue";

const book = ref({
  title: "Foo",
  author: "Bar",
  genre: "Baz"
});
</script>

<template>
  <li v-for="(value, key) in book" :key="value">
    {{ key }}: {{ value }}
  </li>
</template>
```

### `in` の代わりに `of` も使える

> 区切り文字として `in` の代わりに `of` を使用して、JavaScript のイテレーター構文に近付けることもできます

```vue:App.vue
<script setup lang="ts">
import { ref } from "vue";

const names = ref(["Foo", "Bar", "Baz"]);
</script>

<template>
  <li v-for="(name, index) of names" :key="name">
    {{ index }} - {{ name }}
  </li>
</template>

```

```vue:App.vue
<script setup lang="ts">
import { ref } from "vue";

const book = ref({
  title: "Foo",
  author: "Bar",
  genre: "Baz"
});
</script>

<template>
  <li v-for="(value, key) of book" :key="value">
    {{ key }}: {{ value }}
  </li>
</template>

```

### `v-for...in` vs `v-for...of`

> 区切り文字として `in` の代わりに `of` を使用して、JavaScript のイテレーター構文に近付けることもできます

> You can also use `of` as the delimiter instead of `in`, so that it is closer to JavaScript's syntax for iterators

とあるように違いはありません。

ソースコードでは以下のようにエイリアスが定義されております。

https://github.com/vuejs/core/blob/11f76741fb6a14c8ee6a4b68e2ef1641ffc15a23/packages/compiler-core/src/utils.ts#L566

これを用いて in または of の前後(ループ変数とイテラブル)を分離しています。
`v-for...in` と `v-for...of` では挙動が変わらないようです。

### ESLint ルール

https://eslint.vuejs.org/

[Vue.js 公式 ESLint プラグイン](https://eslint.vuejs.org/)では `v-for` の 区切り文字(in or of)を統一させるような ESLint ルールが提供されています。

https://eslint.vuejs.org/rules/v-for-delimiter-style.html#vue-v-for-delimiter-style

```js
{
  "vue/v-for-delimiter-style": ["error", "in" | "of"]
}
```

## いつから `v-for...in` と `v-for...of` ？

リリースノートを探したところ、最初は `in` のみで v1.0.17 にて `of` が区切り文字として使えるようになったようです。

https://github.com/vuejs/vue/releases/tag/v1.0.17

> `v-for` now also supports using `of` as the delimiter:
>
> ```vue
> <div v-for="item of items"></div>
> ```

https://github.com/vuejs/vue/commit/a3faec2c022d9b0180c66ae8cebad523642ba8c2

## 【余談】 JavaScript における `for...in` と `for...of`

> 区切り文字として `in` の代わりに `of` を使用して、JavaScript のイテレーター構文に近付けることもできます

とあり、Vue では `v-for...in` と `v-for...of` では挙動に違いはありませんが、 JavaScript の `for...in`, `for...of` は別物です。

### `for...in`

JavaScript に `for...in` 構文があることを知りませんでした。

```js:forInExample.js
const obj = { a: "Foo", b: "Bar", c: "Baz" };

for (const prop in obj) {
  console.log(`${prop}: ${obj[prop]}`);
}

// a: Foo
// b: Bar
// c: Baz
```

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...in

> `for...in` 文は、キーが文字列であるオブジェクトの列挙可能プロパティすべてに対して、継承された列挙可能プロパティも含めて反復処理を行います (`Symbol` がキーになったものは無視します)。

配列についても用いることができます。

```js:forInArr.js
const arr = ["Foo", "Bar", "Baz"];

for (const index in arr) {
	console.log(`${index}: ${arr[index]}`)
}

// 0: Foo
// 1: Bar
// 2: Baz
```

ただし、`for...in` では順序が保証されません。
配列の場合は `for...of` の利用が適しています。

### `for...of`

```js:forOfExample.js
const arr = ["Foo", "Bar", "Baz"];

for (const el of arr) {
	console.log(el)
}

// Foo
// Bar
// Baz
```

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...of

> `for...of` 文は、反復可能オブジェクトをソースとした一連の値を処理するループを実行します。反復可能オブジェクトには、 たとえば組み込みの `Array`, `String`, `TypedArray`, `Map`, `Set`, `NodeList`（およびその他の DOM コレクション）、同様に `arguments` オブジェクトや、ジェネレーター関数から生成されるジェネレーター、ユーザー定義の反復可能オブジェクトなどがあります。

### `for...in` vs `for...of`

| 特徴               | `for...in`                                       | `for...of`                                       |
| ------------------ | ------------------------------------------------ | ------------------------------------------------ |
| **用途**           | オブジェクトの「キー（プロパティ名）」を反復する | イテラブル（配列や文字列など）の「値」を反復する |
| **対象**           | オブジェクト（配列も対象だが非推奨）             | イテラブル（配列、文字列、`Map`、`Set` など）    |
| **出力内容**       | キー（インデックスやプロパティ名）               | 値（イテラブル内の要素）                         |
| **順序の保証**     | なし                                             | イテラブルの順序に従う                           |
| **主な用途**       | オブジェクトのプロパティ名を取得                 | 配列やイテラブルの値を取得                       |
| **導入された時期** | 初期の JavaScript から利用可能                   | ES6（ECMAScript 2015）で導入                     |

## まとめ

Vue の `v-for` において、`in` と `of` の違いはなく、好みに応じて使用できます。
一方で、JavaScript の `for...in` と `for...of` では用途が異なり、それぞれ適切な場面で使い分ける必要があります。

## 最後に

前から気になっていた `v-for...in` と `v-for...of` について調べました。
JavaScript に `for...in` 構文があることは知りませんでした。

ぼくは `v-for...of` の方がちょっとだけ好きです。

最後まで読んでいただきありがとうございました！
