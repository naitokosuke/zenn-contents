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

こういう JSX がほしい！と思った方は要 check です！

https://x.com/lcMenci/status/1990680368488591411

## まずはこれを見てほしい

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

## Vue Vapor Mode ？

Vue Vapor Mode は仮想 DOM を使用しない新しいレンダリングモードです。

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

## vue-jsx-vapor ？

vue-jsx-vapor は Vue の JSX を Vapor Mode 用コンパイラ & ビルドツールプラグインです。

https://github.com/vuejs/vue-jsx-vapor

https://jsx-vapor.netlify.app

### キーマン

vue-jsx-vapor は [zhiyuanzmj](https://github.com/zhiyuanzmj) さんが中心となって開発しています。
(お名前の読み方が分からないのでこのアイコンで覚えさせていただいています 😇)

![zhiyuanzmj さんの GitHub プロフィール](/images/intro-vue-jsx-vapor/zhiyuanzmj.png)

また、zhiyuanzmj さんは Oxc の Vue サポート強化にも取り組んでいます。
`eslint-plugin-vue` は独自のコンパイラを使用しているため Oxc との互換性に課題がありました。
zhiyuanzmj さんは `vue-oxc-parser` を開発し、Vue ファイルを Oxc の解析に統合する実装を進めています。

https://github.com/oxc-project/oxc/issues/15761

### 主な特徴

- Rust(Oxc)でコンパイラを実装(Babel 比で 20 倍の性能向上)
- 仮想 DOM と Vapor DOM の両方の生成をサポート
- 全ての Vue 組み込みディレクティブをサポート
- Vue のほとんどのマクロをサポート(JSX フレンドリー)
- Volar プラグインによる型安全性(VS Code 拡張機能 [TS Macro](https://marketplace.visualstudio.com/items?itemName=pineappletv.ts-macro))
- ESLint プラグインによるディレクティブとマクロの自動フォーマット

## Getting Started

https://jsx-vapor.netlify.app/introduction/getting-started.html

公式ドキュメントを見れば問題なく vue-jsx-vapor を始められます。
注意点としては以下です。

- Vue 3.6 以上
- VS Code 拡張機能 [TS Macro](https://marketplace.visualstudio.com/items?itemName=zhiyuanzmj.vscode-ts-macro)
- 型チェックは @ts-macro/tsc(`tsc` ではなく `tsmc`)

## 次世代の Vue JSX の書き方

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

### Interop(Vapor と仮想 DOM の相互運用)

SFC と同様に、vue-jsx-vapor でも Vapor と仮想 DOM を併用できます。

https://jsx-vapor.netlify.app/introduction/interop.html

2025 年 12 月 25 日にリリースされた v3.1 で仮想 DOM 生成機能が追加されました。
https://x.com/zhiyuanzmj/status/2004109574841029117

v3.1 より前の vue-jsx-vapor は Vapor DOM のみを生成していました。
そのため仮想 DOM 部分は `@vitejs/plugin-vue-jsx`(さらに内部で `@vue/babel-plugin-jsx` を使用)など別のプラグインに委譲する必要がありました。
v3.1 以降は vue-jsx-vapor 単体で Vapor と仮想 DOM の両方を生成できます。

`defineVaporComponent` 内の JSX は Vapor DOM として、それ以外の JSX は仮想 DOM としてコンパイルされます。

仮想 DOM 内で Vapor コンポーネントを使用したり、Vapor コンポーネントの中で仮想 DOM を使用できたりします。

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

[Vapor in 仮想 DOM playground](https://repl.zmjs.dev/vuejs/vapor-in-virtual-dom)

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

https://repl.zmjs.dev/vuejs/vapor-in-virtual-dom

```ts:index.ts
import { createApp, vaporInteropPlugin } from "vue";
import App from "./App.tsx";
createApp(App).use(vaporInteropPlugin).mount("#app");
```

```tsx:App.tsx
import {
  defineComponent,
  defineVaporComponent,
  computed,
  ref,
  shallowRef as useRef,
} from "vue";

const Comp = defineVaporComponent(({ count = 0 }) => {
  defineExpose({
    double: computed(() => count * 2),
  });
  return <span> x 2 = </span>;
});

export default defineComponent(() => {
  const count = ref(1);

  const compRef = useRef();
  return () => (
    <>
      <input v-model={count.value} />
      <Comp count={count.value} ref={compRef}></Comp>

      <span v-if={compRef.value}>{compRef.value.double}</span>
    </>
  );
});
```

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

[仮想 DOM in Vapor playground](https://repl.zmjs.dev/vuejs/virtual-dom-in-vapor)

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

https://repl.zmjs.dev/vuejs/virtual-dom-in-vapor

<!-- textlint-disable ja-technical-writing/ja-no-mixed-period -->

:::message
(2025 年 12 月 28 日時点)Interop しようとする際に `defineComponent()`, `defineVaporComponent()` を使わずに関数コンポーネントを使用するとエラーになりました。
公式 playground 上のコードのように `defineVaporComponent` と `defineComponent` を明示的に使用することをおすすめします。
:::

<!-- textlint-enable ja-technical-writing/ja-no-mixed-period -->

Vapor コンポーネントと仮想 DOM コンポーネントは相互に利用できます。
既存の仮想 DOM プロジェクトにパフォーマンスが重要な部分だけ Vapor を導入する、といった段階的な移行が可能です。

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

export default () => {
  const visible = ref(false);
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
};
```

### `defineStyle` マクロ

JSX でスタイルを扱うのは煩雑になりがちな印象ですが、vue-jsx-vapor の `defineStyle` は Vue SFC の `<style scoped>` に近い体験を提供します。

この機能が普段 SFC で `<style scoped>` を使用している僕にとってはとても魅力的に思えます。

https://jsx-vapor.netlify.app/features/macros.html

```tsx
function Button({ color = "blue" }) {
  defineStyle(`
    button {
      background: ${color};
      &:hover {
        opacity: 0.8;
      }
    }
  `);
  return <button>Click</button>;
}
```

デフォルトでは関数内で定義した場合は scoped、ファイルのトップレベルで定義した場合は global になります。

## `defineComponent()` から関数コンポーネントへの記法の変化

vue-jsx-vapor による JSX のコードをいくつか見てきました。

<!-- textlint-disable ja-technical-writing/ja-no-weak-phrase -->

これまでに Vue で JSX を使用されてきた方は少し混乱されたかもしれません。

<!-- textlint-enable ja-technical-writing/ja-no-weak-phrase -->

https://github.com/vuejs/vue-jsx-vapor/issues/18

この issue で従来の `defineComponent` から Vapor Mode の関数コンポーネントへの移行について議論されています。

### 従来の Vue JSX(仮想 DOM)

```tsx
import { defineComponent, ref } from "vue";

export default defineComponent(() => {
  const count = ref(0);
  // render 関数(JSX を返す関数)を返す
  return () => <button onClick={() => count.value++}>{count.value}</button>;
});
```

仮想 DOM では `defineComponent` 内で setup と render を区別するために、関数を返すという二重構造が必要でした。

### Vapor Mode の関数コンポーネント

```tsx
import { ref } from "vue";

export default () => {
  const count = ref(0);
  // JSX を直接返すことが可能に！
  return <button onClick={() => count.value++}>{count.value}</button>;
};
```

Vapor Mode では純粋な関数コンポーネントとして記述できます。`defineVaporComponent` は props の分割代入が必要な場合にのみ使用します。

### `defineVaporComponent` が必要なケース

```tsx
import { defineVaporComponent } from "vue";

// props を分割代入する場合は defineVaporComponent が必要
export default defineVaporComponent(({ name, count = 0 }) => {
  return (
    <p>
      Hello, {name}! Count: {count}
    </p>
  );
});
```

`defineVaporComponent` は分割代入された props に対して自動的にリアクティビティを維持する「マジック」を適用します。

## まとめ

vue-jsx-vapor を紹介しました。

Vue 3.6 で導入された Vapor Mode と Alien Signals により、Vue のパフォーマンスは約 4 倍向上しています。
vue-jsx-vapor を使えば、JSX で Vapor Mode の恩恵を受けられます。

まだベータ版ですが、パフォーマンスが重要なアプリケーションでは試してみる価値があるでしょう。

## 最後に

最後まで読んでいただきありがとうございました！
