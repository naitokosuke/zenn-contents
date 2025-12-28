---
title: "vue-jsx-vapor を知る"
emoji: "🚀"
type: "tech"
topics: ["vuejs", "jsx"]
published: false
---

[Vue Advent Calendar 2025](https://qiita.com/advent-calendar/2025/vue) 25 日目(シーズン 2)の記事です。

https://qiita.com/advent-calendar/2025/vue

## はじめに

ナイトウ([@naitokosuke](https://twitter.com/naitokosuke))と申します。

今回は [**vue-jsx-vapor**](https://github.com/vuejs/vue-jsx-vapor) を紹介します。

https://github.com/vuejs/vue-jsx-vapor

# まずはこれを見てほしい

```tsx
import { ref } from "vue";

export default () => {
  const count = ref(0);

  return <button onClick={() => count.value++}>{count.value}</button>;
};
```

https://repl.zmjs.dev/vue-jsx-vapor

これが vue-jsx-vapor のコードです。JSX ですよね。
React など JSX を用いるライブラリ・フレームワークの方はしっくりくると思われます。

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->

Vue ではこれまでも JSX を使用できましたが、 Vue で JSX を使われてきた方はもしかすると驚くかもしれません。

<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

## Vue Vapor Mode とは？

Vue Vapor Mode は Virtual DOM を使用しない新しいレンダリングモードです。

SFC で Vapor Mode を有効にするには、`<script setup vapor>` と記述します。

```vue
<script setup vapor>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

https://speakerdeck.com/hiranuma/alien-signals-noshi-jian-topahuomansuzui-shi-hua

https://rirfee.com/blog/2025/12/vapor-mode%e3%82%92%e3%81%a4%e3%81%be%e3%81%bf%e3%81%90%e3%81%84%e3%81%97%e3%81%a6vue-3-6%e3%81%ab%e5%82%99%e3%81%88%e3%82%88%e3%81%86/

## vue-jsx-vapor とは？

vue-jsx-vapor は Vue の JSX を Vapor Mode でコンパイルするためのツールです。

https://github.com/vuejs/vue-jsx-vapor

https://jsx-vapor.netlify.app

### 主な特徴

- Rust(Oxc)でコンパイラを実装(Babel 比で 20 倍の性能向上)
- 仮想 DOM と Vapor DOM の両方の生成をサポート
- 全ての Vue 組み込みディレクティブをサポート
- Vue のほとんどのマクロをサポート(JSX フレンドリー)
- Volar プラグインによる型安全性(VS Code 拡張機能 [TS Macro](https://marketplace.visualstudio.com/items?itemName=pineappletv.ts-macro)経由)
- ESLint プラグインによるディレクティブとマクロの自動フォーマット

2025 年 12 月 25 日にリリースされた v3.1 で仮想 DOM 生成機能が追加されました。
https://x.com/zhiyuanzmj/status/2004109574841029117

## Getting Started

https://jsx-vapor.netlify.app/introduction/getting-started.html

公式ドキュメントを見れば問題なく vue-jsx-vapor を始められます。
注意点としては以下です。

- Vue 3.6 以上
- VS Code 拡張機能 [TS Macro](https://marketplace.visualstudio.com/items?itemName=zhiyuanzmj.vscode-ts-macro)
- 型チェックは @ts-macro/tsc(`tsc` ではなく `tsmc`)

## 基本的な書き方

```tsx
import { ref } from "vue";

export default function Counter() {
  const count = ref(0);

  return <button onClick={() => count.value++}>{count.value}</button>;
}
```

関数コンポーネントとして定義し、Vue のリアクティブな値をそのまま使用できます。
以前の Vue JSX では、リアクティブな更新を正しく行うために `defineComponent()` でラップし、render 関数を返す必要がありました。

```tsx
import { defineComponent, ref } from "vue";

export default defineComponent(() => {
  const count = ref(0);

  return () => <button onClick={() => count.value++}>{count.value}</button>;
});
```

`defineComponent()` の使用だけでなく、JSX を返す関数を return する二重構造のような記法となっていました。
vue-jsx-vapor では JSX を直接 return するだけでよく、React の関数コンポーネントに近い書き心地で開発できます。

### `defineVaporComponent()`

Vapor についても `defineVaporComponent()` という API が存在します。(Vue 3.6 から)

https://jsx-vapor.netlify.app/introduction/migration.html

props destructure をするためには `defineVaporComponent()` を使う必要があります。

```tsx
import { defineVaporComponent } from "vue";

export default defineVaporComponent(({ name }: { name: string }) => {
  return <p>Hello, {name}!</p>;
});
```

### Vue のディレクティブのサポート

vue-jsx-vapor では全ての Vue 組み込みディレクティブをサポートしています。

https://jsx-vapor.netlify.app/features/directives.html

| Directive               | Vue | Volar |
| ----------------------- | --- | ----- |
| v-if, v-else-if, v-else | ✅  | ✅    |
| v-slot, v-slots         | ✅  | ✅    |
| v-for                   | ✅  | ✅    |
| v-model                 | ✅  | ✅    |
| v-html, v-text          | ✅  | /     |
| v-once                  | ✅  | /     |

(以下はディレクティブの一部です。)

```tsx
import { ref } from "vue";

export default function DirectiveExample() {
  const visible = ref(true);
  const items = ref(["Apple", "Banana", "Cherry"]);

  return (
    <div>
      <p v-if={visible.value}>This is visible.</p>

      <input v-model={visible.value} type="checkbox" />

      <ul>
        {items.value.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

## まとめ

vue-jsx-vapor を紹介しました。

Vue 3.6 で導入された Vapor Mode と Alien Signals により、Vue のパフォーマンスは約 4 倍向上しています。
vue-jsx-vapor を使えば、JSX で Vapor Mode の恩恵を受けられます。

まだベータ版ですが、パフォーマンスが重要なアプリケーションでは試してみる価値があるでしょう。

## 最後に

最後まで読んでいただきありがとうございました！
