---
title: "【習作】Vue でラジオボタンを実装してみる"
emoji: "🕌"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: ["vue"]
publication_name: "comm_vue_nuxt"
published: false
---

[Vue Advent Calendar 2025](https://qiita.com/advent-calendar/2025/vue) 17 日目の記事です。

https://qiita.com/advent-calendar/2025/vue

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

急にラジオボタンコンポーネントを Vue で実装したくなったので実装してみます。
よろしくお願いします。

## まずラジオボタンのおさらい

ラジオボタンは複数の選択肢から 1 つだけ選ぶための入力要素です。
(チェックボックスは複数選択可能)

https://developer.mozilla.org/ja/docs/Web/HTML/Element/input/radio

> `<input>` 要素の `radio` 型は、一般にラジオグループ、すなわち関連するオプションの組み合わせを表すラジオボタンの集まりの中に置かれます。グループ内で一度に選択できるラジオボタンは 1 つだけです。

```html
<!-- https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/input/radio#%E8%A9%A6%E3%81%97%E3%81%A6%E3%81%BF%E3%81%BE%E3%81%97%E3%82%87%E3%81%86 -->
<fieldset>
  <legend>Select a maintenance drone:</legend>

  <div>
    <input type="radio" id="huey" name="drone" value="huey" checked />
    <label for="huey">Huey</label>
  </div>

  <div>
    <input type="radio" id="dewey" name="drone" value="dewey" />
    <label for="dewey">Dewey</label>
  </div>

  <div>
    <input type="radio" id="louie" name="drone" value="louie" />
    <label for="louie">Louie</label>
  </div>
</fieldset>
```

### ポイント

- 同じ `name` 属性を持つラジオボタンがグループ
- グループ内で選択できるのは 1 つだけ
- `id` と `for` を紐付ける
- `<fieldset>` と `<legend>` でグループ化

ラジオボタンがおさらいできたところで、Vue でコンポーネントとして実装していきます。

## 最後に

最後まで読んでいただきありがとうございました！
